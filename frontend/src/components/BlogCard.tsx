import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName: string;
    title : string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    authorName,
    title,
    content, 
    publishedDate,
    id
}: BlogCardProps) =>{

    return <Link to={`../blog/${id}`}><div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-4xl cursor-pointer">
        <div className="flex">
            <Avatar name={authorName} size="small" />
            <div className="flex justify-center flex-col pl-2 font-light text-sm">
                {authorName}
            </div>
            <div className=" flex flex-col justify-center pl-2">
                {/* &#9679; */}
                <Circle/>
            </div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
                {publishedDate}    
            </div>
            
        </div>
        <div className="text-xl font-bold">
            {title}
        </div>
        <div className="text-md font-thin text-slate-600">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin">
            {`${Math.ceil(content.length/100)} minutes read`}
        </div>
    </div>
    </Link>
}

export function Avatar ({name, size="small"}: {name: string, size?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={` ${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300 font-extralight`}>
            {name[0]}
        </span>
    </div>
}
 function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-600">

    </div>
 }