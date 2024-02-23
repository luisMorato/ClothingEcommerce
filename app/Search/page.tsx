'use client';
import { Suspense, useContext, useEffect, useState } from "react";
import { SearchContext } from "@/app/Context/ContextSearch";

import { FetchProducts, FetchWishList } from "@/app/utils/FetchingFunctions";
import { productsProps } from "@/app/Types/route";

import ProductsCard from "@/app/Components/Products/ProductsCard";
import Loading from "@/app/loading";

const Search = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const { search } = useContext(SearchContext);

    const [products, setProducts] = useState<productsProps[] | undefined>([]);
    const [wishListProductsIds, setWishListProcutsIds] = useState<Array<number> | []>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, WishListResponse] = await Promise.all([
                    FetchProducts(),
                    FetchWishList()
                ]);

                setProducts(productsResponse);

                setWishListProcutsIds(WishListResponse);
            } catch (error) {
                console.log('error: ', error);
            }
        }

        fetchData();
    }, [domain]);

    return search ? (
        <div className="bg-grayVariant flex flex-col items-center justify-center gap-4 h-1/2 w-full pt-8">
            <h2 className="w-full text-left text-2xl pl-5">Searching For: <span className="font-semibold">{search}</span></h2>
            <div className='flex flex-wrap w-full items-center justify-center gap-8'>
                <Suspense
                    fallback={
                        <Loading />
                    }
                >
                    {products && 
                        products.filter((product) => product && product.title.toLowerCase().includes(search.toLowerCase())).length !== 0 
                        ?
                        products
                        .filter((product) => product && product.title.toLowerCase().includes(search.toLowerCase()))
                        .map((product) => (
                            product && 
                            <ProductsCard
                                key={product.id}
                                product={product}
                                wishListProductsIds={wishListProductsIds}
                            />
                        )) 
                        : 
                        <div className="bg-grayVariant flex flex-col items-center justify-start gap-4 h-[60vh] w-full pt-8">
                            <div className='flex flex-wrap w-full items-center justify-center gap-8 h-full'>
                                <h3 className="text-xl">None Products Found</h3>
                            </div>
                        </div>
                    }
                </Suspense>
            </div>
        </div>
    ) 
    : 
    (
        <div className="bg-grayVariant flex flex-col items-center justify-start gap-4 h-[60vh] w-full pt-8">
            <h2 className="w-full text-left text-2xl pl-5">Searching For: <span className="font-semibold">{search}</span></h2>
            <div className='flex flex-wrap w-full items-center justify-center gap-8 h-full'>
                <h3 className="text-xl">None Products Found</h3>
            </div>
        </div>
    )
}

export default Search;