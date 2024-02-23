'use client';
import Link from "next/link";
import { 
    Suspense,
    useEffect,
    useState
} from "react";
import { CiHeart } from "react-icons/ci";

import { FetchProducts, FetchWishList } from "@/app/utils/FetchingFunctions";
import { productsProps } from "@/app/Types/route";

import WishListCard from "@/app/Components/(protected)/WishList/WishListCard";
import Loading from "@/app/loading";
import Button from "@/app/Components/Layout/Button";
import { useSearchParams } from "next/navigation";

const WishList = () => {
    const [products, setProducts] = useState<productsProps[] | undefined>([]);
    const [wishListProductsIds, setWishListProcutsIds] = useState<Array<number> | undefined>([]);

    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, WishListResponse] = await Promise.all([
                    FetchProducts(),
                    FetchWishList(userId as string)
                ]);

                setProducts(productsResponse);
                setWishListProcutsIds(WishListResponse);
                // window.alert(JSON.stringify(WishListResponse));
            } catch (error) {
                console.log('error: ', error);
            }
        }

        fetchData();
    }, [wishListProductsIds]);

    const wishListProducts: productsProps[] | undefined = wishListProductsIds && products && products.filter((product) => wishListProductsIds.some((id) => product!.id === id));
   
    return wishListProducts && (
        <div className="flex flex-col items-center py-12">
            <div className="flex flex-col items-center justify-center mb-14">
                <CiHeart className="text-9xl text-neutral-400" />
                <h2 className="text-5xl font-semibold text-neutral-600">My WishList</h2>
            </div>
            {wishListProducts.length !== 0 ?
                <div 
                    className="w-full overflow-x-scroll
                    scrollbar-track-transparent
                    scrollbar-thumb-neutral-400
                    scrollbar-thin
                    "
                >
                    <table
                        className="flex flex-col w-fit mx-auto"
                    >
                        <thead className="self-center px-5 w-full">
                            <tr 
                                className="flex items-center justify-between -translate-x-3
                                xl:translate-x-0"
                            >
                                <th 
                                    className="text-transparent w-1/5"
                                >image</th>
                                <th 
                                    className="font-semibold text-sm text-nowrap w-1/5
                                    md:text-lg
                                    2xl:-translate-x-2"
                                >Product Name</th>
                                <th
                                    className="font-semibold text-sm text-nowrap w-1/5
                                    md:text-lg"
                                >Unit Price</th>
                                <th
                                    className="font-semibold text-sm text-nowrap w-1/5 -translate-x-5
                                    md:text-lg
                                    xl:translate-x-0
                                    2xl:translate-x-2"
                                >Stock Status</th>
                                <th 
                                    className="text-transparent w-1/5">buttons</th>
                            </tr>
                        </thead>
                        <tbody
                            className="self-center max-h-[80vh] px-5 overflow-y-scroll w-fit
                                scrollbar-track-transparent
                                scrollbar-thumb-neutral-400
                                scrollbar-thin
                            "
                        >
                            <Suspense
                                fallback={<Loading />}
                            >
                                {wishListProducts.map((product) => (
                                    product &&
                                    <WishListCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </Suspense>
                        </tbody>
                    </table>
                </div>
                :
                <div className="flex flex-col items-center justify-center gap-4 border rounded-lg p-5">
                    <h2 className="text-xl font-semibold">Your WishList is Empty Now</h2>
                    <p>Want to Add Some Products?</p>
                    <div className="flex w-full">
                        <Link href='/Products' className="w-full">
                            <Button
                                id="wishListBtn"
                                outline
                                roundedMd
                            >
                                Start Now
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default WishList;