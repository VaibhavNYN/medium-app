import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () =>{
    return <div className="grid grid-cols-12">
        <div className=" col-span-12 md:col-span-6">
            <Auth type={"Sign in"} />
        </div>
        <div className="invisible md:visible col-span-6">
            <Quote />
        </div>
    </div>
}