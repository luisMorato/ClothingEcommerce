import { BiSolidDiscount } from "react-icons/bi";

import { productsProps } from "@/app/Types/route";

import OrderedProductsCard from "@/app/Components/(protected)/CheckOut/OrderedProductsCard";
import Payment from "@/app/Components/(protected)/CheckOut/Payment";
import Button from "@/app/Components/Layout/Button";

type OrderDetailsProps = {
    filteredData: productsProps[],
    cartProducts: {
        id: string,
        productId: number,
        quantity: number,
        size: string
    }[],
    subtotal: number[]
}

const OrderDetails = ({ filteredData, cartProducts, subtotal }: OrderDetailsProps) => {
    const taxes = 0;
    
    return (
        <div>
            <div
                className={`flex flex-col gap-2 w-[90%] mx-auto
                    scrollbar-track-transparent
                    scrollbar-thumb-neutral-400
                    scrollbar-thin
                    ${filteredData.length > 3 ? "overflow-y-scroll" : "overflow-y-hidden"}
                    ${filteredData.length > 3 ? "h-[188px]" : "h-min"}
                ` }
            >
                <p className="text-left text-neutral-600 font-medium w-full">Products</p>
                {filteredData.map((product) => {
                    const size = cartProducts.find(({ productId }) => productId === product?.id)?.size;
                    const quantity = cartProducts.find(({ productId }) => productId === product?.id)?.quantity
                    return (<OrderedProductsCard
                        key={product?.id}
                        product={product}
                        size={size}
                        quantity={quantity}
                    />)
                })
                }
            </div>
            <div className="flex justify-between mt-4 py-3 w-[90%] mx-auto border-t text-neutral-400">
                <p>Subtotal</p>
                <p>${subtotal?.reduce((price, currentPrice) => price + currentPrice).toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-3 w-[90%] mx-auto border-t text-neutral-400">
                <p>Taxes</p>
                <p>$0.00</p>
            </div>
            <div className="flex justify-between pt-4 w-[90%] mx-auto border-t font-medium">
                <p>Total</p>
                <p>${(subtotal!.reduce((price, currentPrice) => price + currentPrice) + taxes).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-5 mt-8 w-[90%] mx-auto">
                <div className="flex items-center justify-center border gap-3 border-neutral-400 py-2">
                    <BiSolidDiscount className="text-xl text-rose-500" />
                    <p className="text-neutral-400">Have a Coupon?</p>
                </div>
                <div className="flex flex-col gap-y-5 justify-between w-full
                sm:flex-row
                sm:gap-y-0
                xl:flex-col
                xl:gap-y-5
                2xl:flex-row
                2xl:gap-y-0">
                    <input
                        id="coupon"
                        name="coupon"
                        type="text"
                        placeholder="Coupon Code"
                        maxLength={6}
                        className="border border-neutral-400 pl-3 focus:outline-none h-[40px]"
                    />
                    <Button
                        id="couponBtn"
                        outline
                        roundedMd
                    >
                        Apply Coupon
                    </Button>
                </div>
            </div>
            <Payment />
        </div>
    )
}

export default OrderDetails;