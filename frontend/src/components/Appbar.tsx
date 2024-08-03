import { Link } from "react-router-dom"
import {Avatar} from "./BlogCard"
export const Appbar = () =>{
    return <div className="border-b flex justify-between px-20 py-2">
        <Link className="flex flex-col justify-center" to={`/blogs `}>
            Medium
        </Link>
        <div className=" flex">
            <Link to={`/publish`}>
            <button type="button" className="text-white bg-blue-500 hover:bg-blue-600
            focus:outline-none focus:ring-4 focus:ring-blue-300 
            font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                Create Blog
            </button>
            </Link>
            <div>
                <Avatar
                name="Harkirat"
                size="big" />
            </div>
        </div>
        
    </div>
}