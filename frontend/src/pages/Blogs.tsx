import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () =>{
    const {loading, blogs} = useBlogs();

    if (loading){
        return <div>
            <Appbar />
            <div className=" flex justify-center w-full">
                <div className="w-full max-w-2xl">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar/> 
        <div className="flex justify-center">
            <div >
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.username || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}