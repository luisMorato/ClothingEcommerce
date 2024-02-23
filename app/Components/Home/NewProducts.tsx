'use client';
import { useEffect, useState } from 'react';

import { FetchProducts } from '@/app/utils/FetchingFunctions';
import { productsProps } from '@/app/Types/route';

import NewProductsCard from '@/app/Components/Home/NewProductCards';

const NewProdcuts = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const [newProducts, setNewProducts] = useState<Array<productsProps>>([]);

    useEffect(() => {
        const getProducts = async () => {
            const productsResponse = await FetchProducts();
            setNewProducts(productsResponse);
        } 
        getProducts();
    }, [domain]);

    const filteredProducts = newProducts.filter((product) => product!.id >= 1 && product!.id <= 4);

    return filteredProducts && (
        <div id='newProducts'>
            <h1 className='text-3xl font-bold text-center mb-10'>News</h1>
            <div className='flex flex-col w-fit gap-11 mx-auto
            md:grid
            md:grid-cols-2
            lg:grid-cols-3
            xl:flex
            xl:flex-row 
            xl:flex-nowrap
            '>
                {filteredProducts.map((product) => (
                    product &&
                    <NewProductsCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        size={product.sizes[0] as string}
                        imgSrc={product.image[0] as string}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewProdcuts;