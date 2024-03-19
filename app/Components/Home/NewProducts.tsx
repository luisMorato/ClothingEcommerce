'use client';
import { useEffect, useMemo, useState } from 'react';

import { UseFetch } from '@/app/Hooks/UseFetch';
import { productsProps } from '@/app/Types/route';

import NewProductsCard from '@/app/Components/Home/NewProductCards';

const NewProdcuts = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const { fetching } = UseFetch();

    const [newProducts, setNewProducts] = useState<Array<productsProps> | undefined>([]);

    useEffect(() => {
        const getProducts = async () => {
            const productsResponse = await fetching(`${domain}/api/FetchProducts`, "GET", "application/json");
            setNewProducts(productsResponse);
        }
        getProducts();
    }, [domain, fetching]);

    const filteredProducts = useMemo(() => (newProducts?.filter((product) => product!.id >= 1 && product!.id <= 4)), [newProducts]);

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