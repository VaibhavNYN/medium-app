import { useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () =>{
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");

    return <div>
        <Appbar/>
        <div className="grid grid-cols-12">
            <div className="col-start-4 col-span-6 pt-8">
                <div>
                    <textarea onChange={(e) =>{
                        setTitle(e.target.value)
                    }} id="message" rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                    border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Title" /> 
                </div>
                <div className="pt-4">
                    <textarea onChange={(e) =>{
                        setContent(e.target.value)
                    }} id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                    border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="contents.." />
                </div>
                <div className=" pt-4">
                    <button onClick={async ()=>{
                        axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            content
                        },{
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                    }} type="button" className="text-white bg-green-500 hover:bg-green-600
                    focus:outline-none focus:ring-4 focus:ring-green-300 
                    font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
        
    </div>
}