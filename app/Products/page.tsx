'use client';
import { useSearchParams } from 'next/navigation';
import {
    useContext, 
    useEffect, 
    useState 
} from 'react';

import { SearchContext } from '@/app/Context/ContextSearch';
import { productsProps } from '@/app/Types/route';
import { FetchProducts, FetchWishList } from '@/app/utils/FetchingFunctions';

import SideBar from '@/app/Components/Products/SideBar/SideBar';
import OrderBySelectInput from '@/app/Components/Products/OrderBySelectInput';
import ProductsCard from '@/app/Components/Products/ProductsCard';
import PaginationControl from '@/app/Components/Products/PaginationControl';
import SkeletonLoading from '@/app/Products/SkelentonLoading';
import { getCurrentUser } from '../utils/GetUser';

const Products = () => {
    const { search } = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(true);
    
    const [wishListProductsIds, setWishListProcutsIds] = useState<Array<number> | undefined>([]);

    const [orderBy, setOrderBy] = useState('');

    const [products, setProducts] = useState<productsProps[] | undefined>([]);
    const [filteredProducts, setFilteredProducts] = useState<productsProps[] | undefined>([]);

    const searchParams = useSearchParams();
    
    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '12';
    const start = (Number(page) - 1) * (Number(perPage));
    const end = start + (Number(perPage));

    const urlGender = searchParams.get('gender') ?? '';
    const urlCategory = searchParams.get('category') ?? '';

    //Fetching
    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getCurrentUser();

            try {
                const [productsResponse, WishListResponse] = await Promise.all([
                    FetchProducts(),
                    FetchWishList(currentUser?.id as string)
                ]);

                setProducts(productsResponse);
                
                let filtered = products;
    
                if(products && filtered){
                    if (urlCategory) {
                        filtered = filtered.filter(product => product!.category.toString().toLowerCase().replace(/ /g, '').includes(urlCategory.toLowerCase().replace(/ /g, '')));
                        setFilteredProducts(filtered);
                        setIsLoading(false);
                        return;
                    }
            
                    if(urlGender){
                        filtered = filtered.filter(product => product!.gender === urlGender);
                        setFilteredProducts(filtered);
                        setIsLoading(false);
                        return;
                    }
                }

                setFilteredProducts(productsResponse);

                setWishListProcutsIds(WishListResponse);
                setIsLoading(false);
            } catch (error) {
                console.log('error: ', error);
            }
        }

        fetchData();
    }, [urlCategory, urlGender]);

    const productsSliced = filteredProducts && filteredProducts.slice(start, end);

    //Sort
    useEffect(() => {
        const sortProducts = () => {
            let sorted = filteredProducts;
            
            if(sorted){
                if(orderBy){
                    switch(orderBy){
                        case "mostWanted":{
                            return [...sorted].sort((productA, productB) => {
                                return productB!.rating.rate - productA!.rating.rate;
                            });
                        }
                        case "bestSeller": {
                            return [...sorted].sort((productA, productB) => {
                                return productB!.rating.count - productA!.rating.count;
                            });
                        }
                        case "moreRecent": {
                            return [...sorted].sort((productA, productB) => {
                                if(productA?.hot === productB?.hot){
                                    return 0;
                                }
                                if(productA?.hot){
                                    return -1;
                                }

                                return 1;
                            });
                        }
                        case "biggestPrice": {
                            return [...sorted].sort((productA, productB) => {
                                return productB!.price - productA!.price;
                            });
                        }
                        case "lowestPrice": {
                            return [...sorted].sort((productA, productB) => {
                                return productA!.price - productB!.price;
                            });
                        }
                    }
                }
            }
        }

        const SortedPorducts = sortProducts();
        setFilteredProducts(SortedPorducts);
    }, [orderBy]);


    return filteredProducts && productsSliced && (
        <div className='flex'>
            <SideBar
                setFilteredProducts={setFilteredProducts}
                products={products}
                urlGender={urlGender}
                urlCategory={urlCategory}
            />
            <div className="bg-grayVariant w-full">
                <div className='w-[88%] mx-auto py-6'>
                    <div className="flex justify-between mb-10">
                        <h2 className="text-3xl">Products</h2>
                        <OrderBySelectInput 
                            setOrderBy={setOrderBy}
                        />
                    </div>
                    {!isLoading ? 
                        (
                            filteredProducts.length !== 0 ?
                            <div 
                                className='w-full flex flex-col items-center
                                md:grid
                                md:grid-cols-2
                                xl:grid-cols-3
                                xl:gap-x-6
                                2xl:gap-x-0
                                2xl:grid-cols-4'
                            >
                                {productsSliced
                                .filter((product) => product && product.title.toLowerCase().includes(search.toLowerCase()))
                                .map((product) => (
                                    product &&
                                    <ProductsCard
                                        key={product.id}
                                        product={product}
                                        wishListProductsIds={wishListProductsIds}
                                    />
                                ))}
                            </div>
                            : 
                            <div className='flex items-center justify-center h-[80vh] w-full'>
                                <h2 className='text-2xl font-medium'>None Products Found</h2>
                            </div>
                        )
                        :
                        (
                            <div 
                                className='w-full flex flex-col items-center
                                md:grid
                                md:grid-cols-2
                                xl:grid-cols-3
                                2xl:grid-cols-4'
                            >
                                <SkeletonLoading />
                            </div>
                        )
                    }
                </div>
                <PaginationControl 
                    productsQuantity={filteredProducts.length}/>
            </div>
        </div>
    )
}

export default Products;