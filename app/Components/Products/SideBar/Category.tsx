'use client';
import { useMemo } from "react";

import { productsProps } from "@/app/Types/route";
import { Capitalize } from "@/app/utils/UsefulFunctions";

type categoryProps = {
    selectedCategory: (category: string) => void,
    products: productsProps[] | undefined,
    currentCategory: string
}

const Category = ({ selectedCategory, products }: categoryProps) => {
    const availableCategories: Array<string> = useMemo(() => {
        const setCategories: Set<string> = new Set();
        if (products) {
            setCategories.add('All');
            products.forEach((product) => {
                if (product && product.category && Array.isArray(product.category)) {
                    product.category.forEach((category) => {
                        setCategories.add(category.toLowerCase());
                    });
                }
            });
        }

        return Array.from(setCategories);
    }, [products]);

    return availableCategories && (
        <div className="mb-6">
            <h2 className='text-2xl mb-3'>Category</h2>
            <div className="flex flex-col px-3">
                {availableCategories.map((category) => (
                    <div key={category} className="flex items-center gap-2 mb-2">
                        <input
                            className="
                                appearance-none 
                                w-3 h-3 
                                border 
                                border-neutral-400 
                                rounded-full 
                                cursor-pointer 
                                checked:after:block
                                overflow-hidden
                                relative
                                
                                after:content-['']
                                after:absolute
                                after:w-1
                                after:h-1
                                after:rounded-full
                                after:top-1/2
                                after:-translate-y-1/2
                                after:left-1/2
                                after:-translate-x-1/2
                                after:bg-black
                                after:hidden
                            "
                            defaultChecked={category === 'All'}
                            id={category}
                            type="radio"
                            name='categoryInput'
                            onChange={(e) => selectedCategory(e.target.id)}
                        />
                        <label className="text-xs font-medium md:text-sm" htmlFor={category}>{Capitalize(category)}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category;