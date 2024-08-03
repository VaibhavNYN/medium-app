import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const userAuth = createMiddleware(async (c, next)=>{
    const jwt = c.req.header('Authorization') || null
    if (!jwt){
        c.status(403)
        return c.json({error: "User Unauthorized"})
    }
    if (jwt?.startsWith("Bearer")){
        const token = jwt.split(" ")[1]
        try {
            const decoded = await verify(token, c.env.JWT_SECRET)
            c.set("authId", decoded.id )
            await next();
        } catch (error) {
            c.status(403)
            return c.json("Invalid Authorization")
        }
    }else{
        c.status(403)
        return c.json({error: "User Unauthorized"})
    }
})

