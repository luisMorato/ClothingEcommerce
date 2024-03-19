'use client';
import React, { 
    useCallback, 
    useEffect, 
    useState
} from "react";
import { IoMdClose } from 'react-icons/io';
import Button from "@/app/Components/Layout/Button";

type modalProps = {
    isOpen?: boolean,
    onClose: undefined | (() => void),
    onSubmit: () => void,
    title?: string,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionlabel: string,
    disabled?: boolean,
}

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionlabel,
    disabled,
}: modalProps) => {
    const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if(disabled) return;

        setShowModal(false);

        setTimeout(() => {
            onClose!();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);
    
    return (
        <div className={isOpen ? "opacity-100 duration-300 fixed z-50 overflow-y-hidden inset-0 bg-neutral-800/70" : "opacity-0 hidden"}>
            <div className="relative w-full h-full flex items-center justify-center">
                {/* CONTENT */}
                <div className={
                    `absolute bg-white translate opacity duration-300 rounded-lg px-3 w-full
                    md:w-1/2
                    lg:w-1/4
                    ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`
                    }>
                    {/* HEADER */}
                    <div className="flex justify-between items-center border-b py-3">
                        {onClose !== undefined && <button onClick={handleClose} className="hover:text-neutral-400">
                            <IoMdClose />
                        </button>}
                        <div className="w-full">
                            <p className="text-center font-bold">{title}</p>
                        </div>
                    </div>
                    {/* BODY */}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className=" px-3 mb-10">
                                {body}
                            </div>
                            <div className="mb-3 px-3">
                                <Button
                                    id={(`${actionlabel}Btn`).replace(' ', '')}
                                    type="submit"
                                    roundedMd
                                    disabled={disabled}
                                    // onClick={handleSubmit}
                                >
                                    {actionlabel}
                                </Button>
                            </div>
                        </form>
                    <div className="mb-3 px-3">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;