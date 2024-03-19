'use client';
import { useRouter } from "next/navigation";
import { 
    Suspense, 
    useCallback, 
    useEffect, 
    useMemo, 
    useState 
} from "react";
import toast from "react-hot-toast";

import { UseFetch } from "@/app/Hooks/UseFetch";
import { productToAddProps, productsProps } from "@/app/Types/route";

import CartCard from "@/app/Components/Layout/Cart/CartCard";

const Cart = ({ currentUserId }: {currentUserId: string}) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    const router = useRouter();

    const { fetching } = UseFetch();

    const [cartProducts, setCartProducts] = useState<Array<{
        id: string,
        productId: number,
        quantity: number,
        size: string
    }>>([]);
    const [products, setProducts]= useState<Array<productsProps>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cartResponse, productsResponse] = await Promise.all([
                    fetching(`${domain}/api/CartApi?id=${currentUserId}`, "GET", "application/json"),
                    fetching(`${domain}/api/FetchProducts`, "GET", "application/json"),
                ]);
    
                setCartProducts(cartResponse);
                setProducts(productsResponse);
            } catch (error) {
                console.log('error: ', error);
            }
        }
    
        fetchData();
    }, [currentUserId, cartProducts, domain, fetching]);

    const filteredData = products?.filter((product) => cartProducts?.some(({ productId }) => productId === product?.id));

    const subtotal = useMemo(() => (filteredData?.map((product) => product!.price * (cartProducts.find(({ productId }) => productId === product?.id))!.quantity)), [filteredData, cartProducts]);

    const subtractPOST = useCallback( async (productToAddOrSubtract: productToAddProps) => {
        await fetching(`${domain}/api/CartApi`, "PUT", "application/json", productToAddOrSubtract);
    }, [domain, fetching]);

    const RemoveProduct = useCallback( async (productId: number) => {
        await fetching(`${domain}/api/CartApi`, "DELETE", "application/json", productId);
    }, [domain, fetching]);

    return filteredData && (
        <div className={`absolute top-full -right-[22px] w-fit h-fit bg-[#FAFAFA] rounded-lg mt-2 border z-40 px-3
        md:right-0
        `}>
            <h1 className="text-2xl font-semibold my-2">Cart</h1>
            <Suspense 
                fallback={<p>...Loading</p>}
            >
                {filteredData.length !== 0 ?
                    filteredData &&
                    <div className="bg-white px-2 py-3 mb-2 rounded-lg shadow-sm">
                        <div 
                            className={`flex flex-col items-center gap-2
                            scrollbar-track-transparent
                            scrollbar-thumb-neutral-400
                            scrollbar-thin
                            ${filteredData.length > 3 ? "overflow-y-scroll" : "overflow-y-hidden"}
                            ${filteredData.length > 3 ? "h-[400px]" : "h-min"}
                            `}
                        >
                            {
                                filteredData
                                .map((product) => (
                                product &&
                                <CartCard 
                                    key={product.id}
                                    product={product}
                                    cartProducts={cartProducts}
                                    subtractPOST={subtractPOST}
                                    RemoveProduct={RemoveProduct}
                                />
                                ))
                            } 
                        </div>
                        <div className="flex flex-col items-end justify-center w-full border-t pt-2">
                            <h2 className="font-semibold">${subtotal?.reduce((price, currentPrice) => price + currentPrice).toFixed(2)}</h2>
                            <p className="text-xs text-neutral-400">Subtotal</p>
                        </div>
                        <div className="flex items-center justify-end gap-3 w-full mt-4">
                            <button
                                onClick={() => router.push(`/CheckOut`)}
                                className="bg-black text-white font-semibold tracking-[2px] px-3 py-2 rounded-md border border-black w-full hover:bg-transparent hover:text-black"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                :
                    <div className="flex w-full items-center justify-center px-6 py-4">
                        <h2 className="text-nowrap w-full pt-2 border-t border-t-neutral-400">Cart is Empty</h2>
                    </div>
                }
            </Suspense>
        </div>
    )
}

export default Cart;