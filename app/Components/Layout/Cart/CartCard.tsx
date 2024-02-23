'use client';
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

import { productToAddProps, productsProps } from "@/app/Types/route";
import { AddProduct } from "@/app/utils/AddToCart";

type CartCardProps = {
    product: productsProps,
    cartProducts: {
        id: string,
        productId: number,
        quantity: number,
        size: string
    }[],
}

const CartCard = ({ product, cartProducts }: CartCardProps) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const size = cartProducts.find(({ productId }) => productId === product!.id)?.size;

    const [productToAddOrSubtract, setProductToAddOrSubtract] = useState<productToAddProps>({
        productId: product?.id as number,
        quantity: 1,
        size: size as string,
    });

    const subtractPOST = async () => {
        const url = `${domain}/api/SubtractCartProduct`;
        try {
            const response = await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(productToAddOrSubtract)
                }
            );
            const resJson = await response.json();
            if(resJson.success) toast.success(resJson.success);
            else toast.error(resJson.error);
        } catch (error) {
            console.log('error: ', error);
            toast.error('Error processing the request. Please, try again');
        }
    }

    const RemoveProduct = async (productId: number) => {
        const url = `${domain}/api/RemoveCartProduct`;
        try {
            const response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(productId),
                }
            );
            const resJson = await response.json();
        } catch (error) {
            console.log('error: ', error);
            toast.error('Error processing the request. Please, try again');
        }
    }

    return product && (
        <div className="mr-3 border-b">
            <div className="flex gap-3 mb-2">
                <div 
                    className="relative w-[150px] h-[120px] rounded-lg cursor-pointer overflow-hidden
                    md:w-[180px]
                    md:h-[150px]"
                >
                    <Link href={`/Products/${product.id}`}>
                        <Image src={product?.image[0] as string} alt={product.title as string} fill quality={100} sizes="180px"/>
                    </Link>
                </div>
                <div className="flex flex-col w-full">
                    <h2 
                        className="font-semibold text-sm
                        md:text-base"
                    >{product.title}</h2>
                    <p className="text-sm"><b>${(product.price)?.toFixed(2)}</b></p>
                    <br />
                    <div 
                        className="flex items-center justify-between gap-2
                        md:gap-5"
                    >
                        <div>
                            <p className="text-sm">Color: {product.color[0]}</p>
                            <p className="text-sm">size: {size || product.sizes[0]}</p>
                        </div>
                        <div className="flex items-center justify-between gap-3 px-1 border border-neutral-300">
                            <FaMinus
                                onClick={subtractPOST}
                                className="text-xs font-light cursor-pointer hover:text-neutral-400"
                            />
                            <p>{cartProducts.find(({ productId }) => productId === product.id)?.quantity}</p>
                            <FaPlus
                                onClick={() => AddProduct(productToAddOrSubtract)}
                                className="text-xs font-light cursor-pointer hover:text-neutral-400"
                            />
                        </div>
                    </div>
                </div>
                <FaX 
                    onClick={() => RemoveProduct(product.id)}
                    className="cursor-pointer hover:text-neutral-400"
                />
            </div>
        </div> 
    )
}

export default CartCard;