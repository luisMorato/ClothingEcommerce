'use client';
import { 
    useEffect, 
    useMemo, 
    useState 
} from 'react';

import { UseFetch } from '@/app/Hooks/UseFetch';
import { productsProps } from "@/app/Types/route";

import ProductImages from '@/app/Components/Products/ProductImages';
import ProductDesc from '@/app/Components/Products/ProductDesc';
import MoreInfo from '@/app/Components/Products/MoreInfo';

const ProductPage = ({ params }: any) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const { fetching } = UseFetch();

    const [products, setProducts] = useState<Array<productsProps>>();

    useEffect(() => {
        const getData = async () => {
            const Productsresponse = await fetching(`${domain}/api/FetchProducts`, "GET", "application/json");
            setProducts(Productsresponse);
        }
        getData();
    }, [domain, fetching]);

    const currentProduct: productsProps | undefined = useMemo(() => (products?.find(( product ) => product?.id === Number(params.ProductsId))), [params.ProductsId, products]);

    return currentProduct && (
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
                        product={currentProduct}
                    />
                </div>
                <div>
                    <ProductDesc
                        product={currentProduct}
                    />
                </div>
            </div>
            <MoreInfo />
        </div>
    )
}

export default ProductPage;