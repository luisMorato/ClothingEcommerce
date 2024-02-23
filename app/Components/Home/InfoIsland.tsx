import Image from 'next/image';
import { FaShippingFast, FaDollarSign  } from 'react-icons/fa';

const InfoIsland = () => {
    return(
        <div 
            className="flex flex-col items-center justify-evenly my-14 border border-neutral-400 rounded-[56px] w-fit mx-auto py-4 
            md:flex-row
            md:px-4"
        >
            <div 
            className="flex items-center justify-center gap-2 border-b border-b-neutral-400 pb-3 w-3/4
            md:pb-0 
            md:border-b-0 
            md:border-r-[1px] 
            md:border-r-neutral-400
            md:w-fit"
            >
                <FaShippingFast className='text-neutral-400 text-2xl' />
                <p 
                    className='text-wrap font-light text-neutral-500 text-center w-3/4 
                    md:w-1/2'
                >Free Shipping Above $199,99</p>
            </div>
            <div 
                className="flex items-center justify-center gap-2 border-b border-b-neutral-400 py-3 w-3/4 
                md:py-0 
                md:border-b-0 
                md:border-r-[1px] 
                md:border-r-neutral-400 
                md:w-fit"
            >
                <div className='border rounded-full p-1'>
                    <FaDollarSign className='text-neutral-400 text-xl'/>
                </div>
                <p 
                    className='text-wrap font-light text-neutral-500 text-center w-3/4
                    md:w-1/2 '
                >15% OFF on 1º Purchase</p>
            </div>
            <div 
                className="flex items-center justify-between gap-1 pt-3
                md:justify-center
                md:pt-0 
                md:w-1/3"
            >
                <div className='w-[24px] h-[24px] relative'>
                    <Image src='/Images/Icons/CouponIcon.png' alt='Coupon Icon' fill sizes='24px' />
                </div>
                <p 
                    className='text-wrap font-light text-neutral-500 text-center w-3/4
                    md:w-1/2'
                >$30 OFF Coupon</p>
            </div>
        </div>
    )
}

export default InfoIsland;