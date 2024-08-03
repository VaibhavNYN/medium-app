import { Link,  useNavigate } from "react-router-dom"
import { BlackButton } from "./Buttons"
import { InputField } from "./InputField"
import { useState } from "react"
import { SignupInput } from "@vaibhavny13/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "Sign up" | "Sign in"})=>{
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "Sign in"? 'signin': 'signup'}`,
                postInputs
            )
            const jwt = response.data;
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        }catch(e){

        }
    }

    return <div className=" flex justify-center h-screen">
        <div className="flex flex-col justify-center px-8">
            <div className="py-6 px-10">
                <div className="text-3xl font-bold text-center">
                    {type === "Sign in" ? "Sign in to Existing account" : "Create an account"}
                </div>
                <div className="text-sm text-slate-400 text-center py-1">
                    {type === 'Sign in'? "Don't have an account? " : "Already have an account? "} 
                    <Link className="text-blue-400 underline" 
                        to={type === "Sign in"? "/signup" : "/signin"}>
                        {type === "Sign in" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </div>
            {type === "Sign up"? 
                <InputField label="Username" placeholderText="Enter your username" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        username: e.target.value
                    }))
                }}/> : <div/>
            }
            
            <InputField label="Email" placeholderText="m@example.com" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    email: e.target.value
                }))
            }}/>
            <InputField label="Password" type={"password"} onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    password: e.target.value
                }))
            }}/>
            <BlackButton onClick={sendRequest} label={type} />
        </div>
    </div>
}