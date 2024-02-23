import Link from 'next/link';
import {  FaBarcode, FaApplePay } from 'react-icons/fa';
import { BsXDiamondFill } from "react-icons/bs";

import Button from '@/app/Components/Layout/Button';
import CreditCard from '@/app/Components/(protected)/CheckOut/CreditCard';

const Payment = () => {

    return (
        <div className="py-3 mt-5 border-t border-black mx-auto w-[90%]">
            <h2 className="text-2xl">Payment</h2>
            <div className="flex flex-col justify-evenly gap-3 my-3">
                <CreditCard />
                <div className="relative flex items-center justify-between px-3 py-1 w-full border">
                    <div className="flex items-center gap-3">
                        <input
                            id="ApplePay"
                            name="payment"
                            type="radio"
                        />
                        <label htmlFor="ApplePay">Apple Pay</label>
                    </div>
                    <FaApplePay className='text-3xl' />
                </div>
                <div className="relative flex items-center justify-between px-3 py-1 w-full border">
                    <div className="flex items-center gap-3">
                        <input
                            id="pixPay"
                            name="payment"
                            type="radio"
                        />
                        <label htmlFor="pixPay">PIX</label>
                    </div>
                    <BsXDiamondFill className='text-lg' />
                </div>
                <div className="relative flex items-center justify-between px-3 py-1 w-full border">
                    <div className="flex items-center gap-3">
                        <input
                            id="billTicket"
                            name="payment"
                            type="radio"
                        />
                        <label htmlFor="billTicket">Ticket</label>
                    </div>
                    <FaBarcode className='text-lg' />
                </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
                <input
                    id="TermAndConditions"
                    name="TermAndConditions"
                    type="checkbox"
                    className="peer"
                />
                <label 
                className="text-sm text-neutral-400 peer-checked:text-black
                2xl:text-nowrap" htmlFor="TermAndConditions">I have read and agree to the <Link href='/TermAndConditions' className='hover:underline'>terms and Conditions</Link></label>
            </div>
            <Button
                id="placeOrder"
                type="button"
                roundedMd
            >
                Place Order
            </Button>
        </div>
    )
}

export default Payment;