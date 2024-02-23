'use client';
import { useState } from "react";
import { FaBars } from "react-icons/fa";

import useLoginModal from "@/app/Hooks/UseLoginModal";
import useRegisterModal from "@/app/Hooks/UseRegisterModal";

const MenuSmallDevice = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="block md:hidden">
            <button
            onClick={() => setIsOpen((prevValue) => !prevValue)}
            >
                <FaBars className="text-2xl text-neutral-400"/>
            </button>
            {isOpen &&
                <div
                className="absolute top-full right-0 w-fit px-4  mt-2 bg-white text-sm font-semibold rounded-md border">
                    <ul>
                        <li
                            className="py-2 text-nowrap hover:bg-neutral-200"
                            onClick={loginModal.onOpen}
                        >
                            Log In
                        </li>
                        <li
                            className="py-2 text-nowrap hover:bg-neutral-200"
                            onClick={registerModal.onOpen}
                        >
                            Create an Account
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default MenuSmallDevice;