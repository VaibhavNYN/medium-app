import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify, jwt } from 'hono/jwt'
import { signinInput, signupInput } from "@vaibhavny13/medium-common"


async function sha256(str : string) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  }

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	}
}>()

//SIGN UP ROUTE

userRouter.post('/signup', async (c) =>  {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    
    const { success } = signupInput.safeParse(body);
    
    if (!success) {
      c.status(403)
      return c.json({error: "invalid Inputs"})
    }
  
    const hashed_pass = await sha256(body.password);
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashed_pass
      }
    })

    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json(jwt)
    
  })
  
  
  //SIGN IN ROUTE
  
  userRouter.post('/signin', async (c)=> {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(403)
      return c.json({error: "invalid Inputs"})
    }
  
    const hashed_pass = await sha256(body.password);
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        }
      })
  
      if (!user){
        c.status(403)
        return c.json("User does not exist")
      }
  
      if (user.password == hashed_pass){
    
        const jwt = await sign({"id": user.id}, c.env.JWT_SECRET)
        return c.json(jwt)
      }else{
        c.status(403)
        return c.json("Password incorrect")
      }
  
    } catch (error) {
      return c.status(403)
    }
  })



export default userRouter