'use client';
import { useEffect, useState } from 'react';

import { FetchProducts } from '@/app/utils/FetchingFunctions';
import { productsProps } from "@/app/Types/route";

import ProductImages from '@/app/Components/Products/ProductImages';
import ProductDesc from '@/app/Components/Products/ProductDesc';
import MoreInfo from '@/app/Components/Products/MoreInfo';

const ProductPage = ({ params }: any) => {
    const [products, setProducts] = useState<Array<productsProps>>();

    useEffect(() => {
        const fetch = async () => {
            const Productsresponse = await FetchProducts();
            setProducts(Productsresponse);
        }
        fetch();
    }, []);

    const product: productsProps = products?.find(( product ) => product?.id === Number(params.ProductsId));

    return product && (
        <div className='flex flex-col mt-5 mb-12
        lg:mt-[72px]'>
            <div 
                className='flex flex-col items-center gap-8 w-full px-3
                lg:flex-row
                lg:items-start
                lg:gap-14
                lg:w-[80%]
                lg:mx-auto
                lg:px-0
                xl:w-[90%]
                2xl:w-[80%]'
            >
                <div>
                    <ProductImages
                        product={product}
                    />
                </div>
                <div>
                    <ProductDesc
                        product={product}
                    />
                </div>
            </div>
            <MoreInfo />
        </div>
    )
}

export default ProductPage;