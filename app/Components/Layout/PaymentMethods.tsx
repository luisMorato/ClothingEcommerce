import { FaCcMastercard, FaCcVisa, FaBarcode, FaApplePay } from 'react-icons/fa';
import { BsXDiamondFill } from "react-icons/bs";

const PaymentMethods = () => {
    return(
        <div>
            <h2 className='text-neutral-600'>Payment Methods</h2>
            <div className='flex gap-6 mt-3 w-fit'>
                <span>
                    <FaCcMastercard className='text-3xl' />                    
                </span>
                <span>
                    <FaCcVisa className='text-3xl' />
                </span>
                <span>
                    <FaBarcode className='text-3xl' />
                </span>
                <span>
                    <BsXDiamondFill className='text-3xl' />
                </span>
                <span>
                    <FaApplePay className='text-3xl' />
                </span>
            </div>
        </div>
    )
}

export default PaymentMethods;