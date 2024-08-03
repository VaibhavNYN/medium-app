import { ChangeEvent } from "react";



interface LabelledInputType {
    label: string;
    placeholderText?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>)=> void;
    type? : string
}


export const InputField = ({label, placeholderText, onChange, type}: LabelledInputType )=>{
    return <div>
        <div className="text-sm pb-4">
            <div className="font-bold">
                {label}
            </div>
            <div className="mt-2">
                <input onChange={onChange} className=" border-slate-300 border rounded-lg p-2 pl-4 w-full
                focus:ring-blue-500 focus:border-blue-500" type={type ||"text"} placeholder={placeholderText} required/>
            </div>
        </div>
    </div>
}