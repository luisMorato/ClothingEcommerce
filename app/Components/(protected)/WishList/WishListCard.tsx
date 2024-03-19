'use client';
import Image from "next/image";
import { useState } from "react";
import { FaRegTrashAlt, FaShoppingCart } from "react-icons/fa";

import { productToAddProps, productsProps } from "@/app/Types/route";
import { AddProduct } from "@/app/utils/AddToCart";

import Button from "@/app/Components/Layout/Button";
import Link from "next/link";

type WishListCardProps = {
    product: productsProps,
    removeFromWishList: (productId: number) => void,
}

const WishListCard = ({ 
    product,
    removeFromWishList
}: WishListCardProps) => {
    const [productToAdd] = useState<productToAddProps>({
        productId: product?.id as number,
        quantity: 1,
        size: product?.sizes[0] as string,
    });

    return product && (
            <tr className="flex items-center justify-evenly gap-14 border-t
            xl:gap-5">
                <td className="py-5 w-1/5 max-w-1/5">
                    <Link href={`/Products/${product.id}`}>
                        <div 
                            className="relative w-[100px] h-[130px] rounded-3xl overflow-hidden
                            md:w-[152px]
                            md:h-[190px]"
                        >
                            <Image src={product.image[0] as string} alt={`product-${product.title}`} fill quality={100} sizes="152px" priority/>
                        </div>
                    </Link>
                </td>
                <td 
                    className="text-neutral-400 text-sm text-center text-wrap w-1/5 max-w-1/5
                    md:text-lg"
                >
                    <p>{product.title}</p>
                </td>
                <td className="w-1/5 max-w-1/5">
                    <p 
                        className="text-right text-sm font-bold
                        md:text-center
                        md:text-lg"
                    >${(product.price).toFixed(2)}</p>
                </td>
                <td className="w-1/5 max-w-1/5">
                    <p 
                        className="text-center text-sm text-nowrap flex gap-3 items-center justify-center
                        md:text-lg"
                    ><span className="bg-green-500 h-2 w-2 rounded-full"></span>In Stock</p>
                </td>
                <td className="w-1/5 max-w-1/5">
                    <div className="flex flex-col items-center justify-center">
                        <p 
                            className="text-xs text-neutral-400 text-nowrap mb-2
                            md:text-sm"
                        >Added on: 9, January 2024</p>
                        <div 
                            className="flex justify-between gap-3
                            items-center"
                        >
                            <Button
                                id="addToCartBtn"
                                icon={FaShoppingCart}
                                onClick={() => AddProduct(productToAdd)}
                            >
                                <p 
                                    className="text-nowrap text-sm
                                    md:text-base"
                                >Add to Cart</p>
                            </Button>
                            <FaRegTrashAlt 
                                className="text-lg text-neutral-400 cursor-pointer hover:text-red-600
                                md:text-2xl"
                                onClick={() => removeFromWishList(product.id)}
                            />
                        </div>
                    </div>
                </td>
            </tr>
    )
}

export default WishListCard;