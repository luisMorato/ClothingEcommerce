import { FaCheck } from 'react-icons/fa';

type sizingProps = {
    selectedSizes: (size: string) => void
}

const Sizing = ({ selectedSizes }: sizingProps) => {
    return(
        <div className="mb-6">
            <h2 className='text-2xl mb-3'>Sizing</h2>
            <div className="flex gap-6 px-3 md:gap-7">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                    bg-white
                                "
                                id="XXS"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px]  pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium md:text-sm" htmlFor="XXS">XXS</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="S"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="S">S</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="L"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="L">L</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="XXL"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="XXL">XXL</label>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="XS"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="XS">XS</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="M"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="M">M</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className='relative'>
                            <input
                                className="
                                    peer
                                    appearance-none
                                    w-3 h-3
                                    border
                                    border-neutral-400
                                    cursor-pointer
                                "
                                id="XL"
                                type="checkbox"
                                onClick={(e) => selectedSizes(e.currentTarget.id)}
                            />
                            <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                        </div>
                        <label className="text-xs font-medium" htmlFor="XL">XL</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sizing;