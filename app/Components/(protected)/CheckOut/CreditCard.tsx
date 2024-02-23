'use client';
import { useState } from "react";
import { FaCcMastercard, FaCcVisa, FaCreditCard  } from "react-icons/fa";
import DefaultInput from "@/app/Components/Layout/Inputs/DefaultInput";

const CreditCard = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <div className="relative flex items-center justify-between px-3 py-1 w-full border">
            <div className="flex items-center gap-3">
                <input
                    id="creditCard"
                    name="payment"
                    type="radio"
                    checked={isOpen}
                    onClick={() => {setIsOpen((prevValue) => !prevValue)}}
                    onChange={() => {}}
                />
                <label htmlFor="creditCard">Credit Card</label>
            </div>
            <div className="flex items-center gap-1">
                <FaCcMastercard className='text-3xl' />
                <FaCcVisa className='text-3xl' />
            </div>
            {isOpen &&
                <>
                    <div className='absolute z-30 left-1/2 -translate-x-1/2 top-full mt-2 bg-white border-t border-l border-black h-[10px] w-[10px] rotate-45'></div>
                    <div className='absolute z-20 bg-white top-full left-0 mt-3 py-5 px-4 w-full h-[240px] border border-black
                    sm:h-[180px]
                    md:w-3/4
                    md:left-1/2
                    md:-translate-x-1/2
                    lg:w-full
                    lg:left-0
                    lg:translate-x-0'>
                        <div className="flex flex-col mb-5">
                            <label className="text-sm text-neutral-400" htmlFor="cardNumber">Card Number *</label>
                            <DefaultInput
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                roundedNone
                                placeholder="•••• •••• •••• ••••"
                                icon={FaCreditCard}
                            />
                        </div>
                        <div className="flex flex-col justify-between gap-3 w-full
                        sm:flex-row">
                            <div className="flex flex-col">
                                <label className="text-sm text-neutral-400" htmlFor="expiration">Expiration (MM/YY) *</label>
                                <DefaultInput
                                    id="expiration"
                                    name="expiration"
                                    type="text"
                                    roundedNone
                                    placeholder="MM/YY"
                                    placeholderSm
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm text-neutral-400" htmlFor="CSC">Card Security Code *</label>
                                <DefaultInput
                                    id="CSC"
                                    name="CSC"
                                    type="text"
                                    roundedNone
                                    placeholder="•••"
                                    placeholderSm
                                />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default CreditCard;