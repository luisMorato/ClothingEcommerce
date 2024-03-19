'use client';
import { SetStateAction } from "react"
import { FaX } from "react-icons/fa6"

type priceProps = {
    clearFilters: () => void
    priceInterval: number,
    setPriceInterval: React.Dispatch<SetStateAction<number>>
}

const Price = ({ 
    clearFilters, 
    priceInterval, 
    setPriceInterval 
}: priceProps) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <h2 className='text-2xl'>Price</h2>
                <FaX className="text-xs cursor-pointer hover:text-neutral-400" title="Clear Filters" onClick={clearFilters} />
            </div>
            <div className='flex flex-col px-3'>
                <label className='mb-4' htmlFor='priceInterval'>Price Interval</label>
                <div className='flex flex-col'>
                    <input
                        id='priceInterval'
                        className='appearance-none h-[3px] bg-rose-500 rounded-lg outline-none
                        [&::-webkit-slider-thumb]:w-3
                        [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_#D9D9D9]
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:rounded-full
                        '
                        type="range"
                        min="10.00"
                        max="500.00"
                        value={priceInterval.toFixed(2)}
                        onChange={(e) => {setPriceInterval(parseInt(e.target.value))}}
                    />
                    <div className='flex justify-between text-xs mt-2 md:text-sm'>
                        <p>$10,00</p>
                        <p>${priceInterval.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Price;
