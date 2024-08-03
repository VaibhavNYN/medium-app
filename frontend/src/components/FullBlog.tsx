import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog : Blog}) =>{
    return <div>
        <Appbar/>
        <div className=" flex justify-center">
            <div className=" grid grid-cols-12 px-10 pt-200 max-w-screen-2xl pt-12">
                <div className=" col-start-3 col-span-5">
                    <div className=" text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className=" text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className=" text-slate-900 pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-3">
                    <div className=" text-slate-500 font-semibold">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-2"> 
                            <Avatar name={blog.author.username} size="small"/>
                        </div>
                        <div className=" font-bold text-2xl">
                            {blog.author.username}
                        </div>
                    </div>
                    <div className=" text-slate-700 font-light pl-8">
                        This is the catch phrase for the author to grab the attention of the users who are reading his work.
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}