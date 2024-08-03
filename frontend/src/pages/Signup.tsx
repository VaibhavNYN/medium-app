import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () =>{
    return <div className="grid grid-cols-12">
        <div className=" col-span-12 md:col-span-6">
            <Auth type={"Sign up"} />
        </div>
        <div className="invisible md:visible col-span-6">
            <Quote />
        </div>
    </div>
}