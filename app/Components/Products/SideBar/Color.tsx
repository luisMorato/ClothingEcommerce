'use client'
import { productsProps } from "@/app/Types/route";
import { SetStateAction, useMemo } from "react";
import { FaX } from "react-icons/fa6";

type colorProps = {
    setColor: React.Dispatch<SetStateAction<string>>
    products: productsProps[] | undefined
}

const Color = ({ setColor, products}: colorProps) => {
    const colors: {colorName: string, colorCode: string, hasColor: boolean}[] = useMemo(() => [
        {
            colorName:'black',
            colorCode: '#000',
            hasColor: products!.some((product) => product!.color.includes('black'))
        },
        {
            colorName:'blue',
            colorCode: 'rgb(59 130 246)',
            hasColor: products!.some((product) => product!.color.includes('blue'))
        },
        {
            colorName:'red',
            colorCode: 'rgb(220 38 38)',
            hasColor: products!.some((product) => product!.color.includes('red'))
        },
        {
            colorName:'brown',
            colorCode: 'rgb(180 83 9)',
            hasColor: products!.some((product) => product!.color.includes('brown'))
        },
        {
            colorName:'green',
            colorCode: 'rgb(4 120 87)',
            hasColor: products!.some((product) => product!.color.includes('green'))
        },
        {
            colorName:'white',
            colorCode: '#FFF',
            hasColor: products!.some((product) => product!.color.includes('white'))
        },
        {
            colorName:'purple',
            colorCode: 'rgb(168 85 247)',
            hasColor: products!.some((product) => product!.color.includes('purple'))
        },
        {
            colorName:'yellow',
            colorCode: 'rgb(234 179 8)',
            hasColor: products!.some((product) => product!.color.includes('yellow'))
        },
        {
            colorName:'pink',
            colorCode: 'rgb(244 114 182)',
            hasColor: products!.some((product) => product!.color.includes('pink'))
        },
        {
            colorName:'gray',
            colorCode: 'rgb(163 163 163)',
            hasColor: products!.some((product) => product!.color.includes('gray'))
        }
    ] as const, [products]);

    return colors && (
        <div className="mb-6">
            <h2 className='text-2xl mb-3'>Color</h2>
            <div className="flex flex-wrap gap-5 w-[68%] px-3">
                <div className="relative flex items-center justify-center cursor-pointer">
                    <FaX className="absolute pointer-events-none text-xs text-neutral-400 z-20" />
                    <input
                        className={`appearance-none w-4 h-4 border border-neutral-400 cursor-pointer rounded-full checked:border-black`}
                        defaultChecked
                        id="clearColor"
                        name="colorSelector"
                        type="radio"
                        onChange={() => setColor('')}
                    />
                </div>
                {colors.map((color) => (
                    <input 
                        key={color.colorName} 
                        className={`appearance-none w-4 h-4 border border-neutral-400 cursor-pointer rounded-full checked:border-black disabled:cursor-not-allowed`} 
                        style={{backgroundColor: color.colorCode}}
                        id={`${color.colorName}`} 
                        name="colorSelector"
                        type="radio"
                        disabled={color.hasColor === false}
                        onChange={(e) => setColor(e.target.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Color;