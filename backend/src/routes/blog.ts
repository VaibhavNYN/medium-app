import { Hono } from "hono"
import { userAuth } from "../middlewares"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@vaibhavny13/medium-common"

type Variables = {
  authId : string
}


const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	},
  Variables: Variables
}>()



//Initialize a POST

blogRouter.post('/',userAuth, async (c)=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const authId = c.get("authId")
  const body = await c.req.json()
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(403)
    return c.json({error: "invalid Inputs"})
  }

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authId
    }
  })

  return c.json({
    id: newPost.id
  })
})


//UPDATE A POST 

blogRouter.put('/', userAuth,  async (c)=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  
  const authId= c.get('authId')
  const bodyToUpdate = await c.req.json()
  const { success } = updateBlogInput.safeParse(bodyToUpdate);
  if (!success) {
    c.status(403)
    return c.json({error: "invalid Inputs"})
  }

  const currentBody = await prisma.post.findUnique({
    where: {
      id: bodyToUpdate.id
    }
  })

  await prisma.post.update({
    where: {
      id: bodyToUpdate.id,
      authorId: authId
    },
    data: {
      title: bodyToUpdate.title || currentBody?.title,
      content: bodyToUpdate.content || currentBody?.content,
      published: bodyToUpdate.published || false
    }
  })

  return c.text("Blog Updated")
})


//GET POST WITH SPECIFIC POST ID

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const id = c.req.param('id')
  const postWithId = await prisma.post.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          username: true
        }
      }
    }
  })
  
  return c.json(postWithId)
})

//GET ALL POSTS
blogRouter.get('/bulk/', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  
  const allPosts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          username: true
        } 
      }
    }
  })
  

  return c.json(allPosts)
})


// GET ALL THE POST BY A USER




export default blogRouter