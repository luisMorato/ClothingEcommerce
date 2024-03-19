import Image from "next/image";

import { productsProps } from "@/app/Types/route";

type OrderedProductsCardProps = {
    product: productsProps,
    size: string | undefined,
    quantity: number | undefined
}

const OrderedProductsCard = ({ 
    product, 
    size, 
    quantity 
}: OrderedProductsCardProps) => {
    return product && (
        <div className="mr-3 border-b">
            <div className="flex gap-3 mb-2">
                <div 
                    className="relative w-[150px] h-[120px] rounded-lg overflow-hidden
                    md:w-[180px]
                    md:h-[150px]"
                >
                    <Image src={product.image[0]} alt={product.title} fill quality={100} sizes="180px"/>
                </div>
                <div className="flex flex-col w-full">
                    <h2 
                        className="font-semibold text-sm
                        md:text-base"
                    >{product.title}</h2>
                    <p className="text-sm"><b>${(product.price).toFixed(2)}</b></p>
                    <br />
                    <div 
                        className="flex items-center justify-between gap-2
                        md:gap-5"
                    >
                        <div>
                            <p className="text-sm">Color: {product.color[0]}</p>
                            <p className="text-sm">size: {size}</p>
                            <p className="text-sm">Quantity: {quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default OrderedProductsCard;