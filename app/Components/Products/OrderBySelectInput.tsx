'use client';
import { SetStateAction, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type orderByInputProps = {
    setOrderBy: React.Dispatch<SetStateAction<string>>,
}

const OrderBySelectInput = ({ setOrderBy }: orderByInputProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return(
        <div 
            className="relative w-1/2
            lg:w-[25%]
            "
        >
            <div className="bg-transparent border border-neutral-400 py-2 px-4 focus:outline-none text-neutral-400 rounded-[56px] text-sm w-full">
                <div className="flex justify-between">
                    <p className={open === false ? 'pointer-events-none' : 'text-transparent'}>Order By</p>
                    <button onClick={() => setOpen((value) => value = !value)}>
                        {
                            open ? <FaChevronUp className='text-lg cursor-pointer hover:text-black peer' />
                            :
                            <FaChevronDown className='text-lg cursor-pointer hover:text-black peer' />
                        }
                    </button>
                </div>
                <div className={open ? 'bg-grayVariant border top-[62%] left-0 pt-3 border-neutral-400 border-t-0 px-4 h-fit duration-300 transition z-20 absolute w-full rounded-br-[24px] rounded-bl-[24px]' : 'h-0 transition duration-300'}>
                <ul className={open ? 'text-neutral-400' : 'hidden'}>
                    <li
                        onClick={() => setOrderBy('mostWanted')}
                        className='hover:text-black cursor-pointer pb-2 mb-1 border-b border-b-neutral-300'
                    >
                        Most Wanted
                    </li>
                    <li
                        onClick={() => setOrderBy('bestSeller')}
                        className='hover:text-black cursor-pointer pb-2 mb-1 border-b border-b-neutral-300'
                    >
                        Best Seller
                    </li>
                    <li
                        onClick={() => setOrderBy('moreRecent')} 
                        className='hover:text-black cursor-pointer pb-2 mb-1 border-b border-b-neutral-300'
                    >
                            More Recent
                    </li>
                    <li
                        onClick={() => setOrderBy('biggestPrice')} 
                        className='hover:text-black cursor-pointer pb-2 mb-1 border-b border-b-neutral-300'
                    >
                            Biggest Price
                    </li>
                    <li
                        onClick={() => setOrderBy('lowestPrice')}
                        className='hover:text-black cursor-pointer pb-2'
                    >
                            Lowest Price
                    </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default OrderBySelectInput;