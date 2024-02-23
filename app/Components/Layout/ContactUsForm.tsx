'use client';

import { useTransition } from "react";
import { FaPaperPlane } from 'react-icons/fa';

import DefaultInput from "@/app/Components/Layout/Inputs/DefaultInput";

const ContactUsForm = () => {
    const [isPending, startTransition] = useTransition();
    
    return(
        <div>
            <form className="w-[90%] sm:w-[84%]">
                <DefaultInput
                    id="ReceiveNewsSignUpEmail"
                    name="ReceiveNewsSignUpEmail"
                    type="email"
                    label="SIGN UP TO RECEIVE NEWS."
                    placeholder="Your Better Email"
                    disabled={isPending}
                    icon={FaPaperPlane}
                    iconPositioning="right"
                    onchange={() => {}}
                    onClick={() => {}}
                    onkeyup={() => {}}
                />
            </form>
        </div>
    )
}

export default ContactUsForm;