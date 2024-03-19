'use client';
import { useRouter } from 'next/navigation';
import React, { 
    useEffect, 
    useState, 
    SetStateAction 
} from 'react';
import { 
    FaChevronRight, 
    FaChevronLeft, 
    FaShippingFast 
} from 'react-icons/fa';
import { 
    BsToggle2Off, 
    BsToggle2On  
} from "react-icons/bs";

import { productsProps } from '@/app/Types/route';

import Price from '@/app/Components/Products/SideBar/Price';
import Category from '@/app/Components/Products/SideBar/Category';
import Sizing from '@/app/Components/Products/SideBar/Sizing';
import Color from '@/app/Components/Products/SideBar/Color';
import Gender from '@/app/Components/Products/SideBar/Gender';

type sideBarProps = {
    setFilteredProducts: React.Dispatch<SetStateAction<productsProps[] | undefined>>,
    products: productsProps[] | undefined,
    urlGender: string,
    urlCategory: string
}

const SideBar = ({ 
    setFilteredProducts,
    products, 
    urlGender, 
    urlCategory,
}: sideBarProps) => {
    const router = useRouter();

    const [freeShiping, setFreeShiping] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [priceInterval, setPriceInterval] = useState<number>(10);
    const [sizes, setSizes] = useState<Array<string>>([]);
    const [color, setColor] = useState<string>('');
    const [gender, setGender] = useState<string>('');

    const [isOpen, setIsOpen] = useState(false);

    //Clear Filters
    const clearFilters = () => {
        setFreeShiping(false);
        setPriceInterval(10);
        setCategory('All');
        setSizes([]);
        setColor('');
        setGender('');
        router.replace('/Products');
    }

    //Category Select
    const selectedCategory = (selectedCategory: string) => {
        if(selectedCategory === category){
            return;
        }
        setCategory(selectedCategory);
    }

    //Sizes Select
    const selectedSizes = (size: string) => {
        const foundSize = sizes.find((sizeObject) => sizeObject === size);
        if(foundSize){
            const reSelectedSizes = sizes.filter((sizeItem) => sizeItem !== size);
            setSizes(reSelectedSizes);
            return;
        }
        setSizes((prevSizes) => [
                ...prevSizes,
                size
        ]);
    }

    //Filter
    useEffect(() => {
        if(urlGender !== ''){
            setGender(urlGender);
        }
        if(urlCategory !== ''){
            setCategory(urlCategory);
        }
    }, [urlGender, urlCategory]);

    useEffect(() => {
        const filterProducts = () => {
            let filteredProducts = products;

            if(products && filteredProducts) {
                if(freeShiping){
                    filteredProducts = filteredProducts.filter((product) => product.freeShipping === true);
                }
                
                if(category && category !== 'All') {
                    filteredProducts = filteredProducts.filter((product) => product?.category?.some((productcategory) => productcategory.toString().toLowerCase().replace(/ /g, '').includes(category.toLowerCase().replace(/ /g, ''))));
                }
        
                if(priceInterval > 10){
                    filteredProducts = filteredProducts.filter((product) => product!.price <= priceInterval);
                }
        
                if(sizes.length > 0) {
                    const sizeArray: Array<string> = sizes.map((size) => size);
                    filteredProducts = filteredProducts.filter((product) =>
                        sizeArray.some((size) => product!.sizes.includes(size))
                    );
                }
        
                if(color) {
                    filteredProducts = filteredProducts.filter((product) =>
                        product!.color.includes(color)
                    );
                }
        
                if(gender) {
                    filteredProducts = filteredProducts.filter((product) => product!.gender === gender);
                }

                return filteredProducts;
            }
        };
    
        const filteredData = filterProducts();
        setFilteredProducts(filteredData);
    
    }, [freeShiping, category, priceInterval, sizes, color, gender, products, setFilteredProducts]);

    return (
        <aside
            className={`flex flex-col h-screen px-4 z-20 fixed left-0 bg-white w-[300px] translate duration-200
            ${isOpen ? "translate-x-0" : "-translate-x-[95%]"}
            md:w-[320px]
            lg:h-full
            lg:translate-x-0
            lg:z-0
            lg:relative
            2xl:w-[350px]`}
        >
                <button
                    onClick={() => {setIsOpen((prevValue) => !prevValue)}}
                    className="absolute flex items-center justify-center -right-3 top-1 p-1 z-50 bg-white border border-neutral-400 rounded-full
                    lg:hidden"
                >
                    {isOpen ?
                        <FaChevronLeft className='text-black' />
                        :
                        <FaChevronRight className='text-black' />
                    }
                </button>
                <h2 className='text-2xl my-3'>Filters</h2>
                <div 
                    className='overflow-y-scroll h-[90%] pb-8
                    lg:pb-0
                    lg:overflow-y-auto
                    lg:h-full'
                >
                    <div className='border-b-[1px] border-neutral-400 pb-5 mb-4'>
                        <div className="flex items-center justify-between gap-6 border border-neutral-400 rounded-[56px] px-4 py-1">
                            <div className='flex items-center gap-2'>
                                <FaShippingFast className='text-xl text-neutral-400' />
                                <p className='text-nowrap'>Free Shipping</p>
                            </div>
                            {freeShiping ?
                                <button type='button' onClick={() => {setFreeShiping(false)}}>
                                    <BsToggle2On
                                        className='text-2xl text-neutral-400 cursor-pointer'
                                    />
                                </button>
                            :
                                <button type='button' onClick={() => {setFreeShiping(true)}}>
                                    <BsToggle2Off
                                        className='text-2xl text-neutral-400 cursor-pointer'
                                    />
                                </button>
                            }
                        </div>
                    </div>
                    <Price
                        clearFilters={clearFilters}
                        priceInterval={priceInterval}
                        setPriceInterval={setPriceInterval}
                    />
                    <Category
                        selectedCategory={selectedCategory}
                        products={products}
                        currentCategory={category}
                    />
                    <Sizing
                        selectedSizes={selectedSizes}
                    />
                    <Color
                        setColor={setColor}
                        products={products}
                    />
                    <Gender
                        setGender={setGender}
                        gender={gender}
                    />
                </div>
            </aside>
    )
}

export default SideBar;