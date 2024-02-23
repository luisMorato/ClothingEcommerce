'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FetchCartProducts, FetchProducts } from "@/app/utils/FetchingFunctions";

import BillingDetailsForm from "@/app/Components/(protected)/CheckOut/BillingDetailsForm";
import { productsProps } from "@/app/Types/route";
import OrderDetails from "@/app/Components/(protected)/CheckOut/OrderDetails";

const CheckOut = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

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
                    FetchCartProducts(userId as string),
                    FetchProducts()
                ]);
    
                setCartProducts(cartResponse);
                setProducts(productsResponse);
            } catch (error) {
                console.log('error: ', error);
            }
        }
    
        fetchData();
    }, [userId, cartProducts]);

    const filteredData = cartProducts && products && products.filter((product) => cartProducts.some(({ productId }) => productId === product?.id));

    const subtotal = filteredData?.map((product) => product!.price * (cartProducts.find(({ productId }) => productId === product?.id))!.quantity);

    return filteredData && (
        <div className="bg-grayVariant flex w-full h-fit">
            <div className="flex flex-col items-center justify-center gap-3 mx-auto
            sm:p-2
            lg:flex-row
            lg:w-[90%]
            xl:w-3/4">
                <div className="bg-white w-fit h-full pl-5 pr-8 rounded-2xl">
                    <h2 className="text-neutral-600 text-3xl font-medium my-4 inline-block">CheckOut</h2>
                    <div className="pl-5 pb-5 w-[88%]">
                        <p className="text-neutral-600 font-medium mb-3 inline-block">Payer Information:</p>
                        <BillingDetailsForm />
                    </div>
                </div>
                <div className="bg-white h-full pl-5 rounded-2xl w-full
                lg:w-1/2
                xl:w-[36%]">
                    <h2 className="text-neutral-600 text-3xl font-medium my-4">Your Order</h2>
                    <OrderDetails 
                        filteredData={filteredData}
                        cartProducts={cartProducts}
                        subtotal={subtotal as number[]}
                    />
                </div>
            </div>
        </div>
    )
}

export default CheckOut;