'use client';
import Link from "next/link";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { 
    FaMinus, 
    FaPlus, 
    FaShoppingCart 
} from "react-icons/fa";

import { 
    productToAddProps, 
    productsProps 
} from "@/app/Types/route";
import { AddProduct } from "@/app/utils/AddToCart";

import Button from "@/app/Components/Layout/Button";

const ProductDesc = ({ product }: { product: productsProps }) => {
    const number = Math.floor(Math.random() * 6);
    const ratingArray = [1,2,3,4,5];
    const [isSelected, setIsSelected] = useState<string>(product?.sizes[0] as string);
    const [productToAdd, setProductToAdd] = useState<productToAddProps>({
        productId: product?.id as number,
        quantity: 1,
        size: isSelected,
    });

    return product && (
        <div className="w-full">
            <h1 className="text-[28px]">{product.title}</h1>
            <div className="flex gap-2">
                <div className="flex text-lg">
                    {ratingArray.map((item, index) => (
                        <IoMdStar 
                            key={`star-${index}`}
                            className={product.rating.rate >= item ? "text-yellow-400 cursor-pointer" : "text-neutral-400"}
                        />
                    ))}
                </div>
                <div className="text-neutral-400 text-sm">
                    <p>{product.rating.rate}  &#40;{product.rating.count} Reviews &#41; | <Link href='' className="text-nowrap hover:underline hover:text-black">Rate this Product</Link></p>
                </div>
            </div>
            <div className="my-8">
                <h2 className="text-2xl font-bold">${(product.price).toFixed(2)}</h2>
                <p className="text-sm text-neutral-400">In up to {number >= 2 ? number : number + 2}x ${((product.price) / (number >= 2 ? number : number + 2)).toFixed(2)} interest free</p>
            </div>
            <div>
                <h2 className="font-bold text-lg mb-3">Sizing</h2>
                <div className="flex gap-5 w-fit">
                    {product.sizes.map((size) => (
                        <div 
                        key={size}
                        id={size}
                        onClick={(e) => {
                            setIsSelected(e.currentTarget.id);
                            setProductToAdd({
                                ...productToAdd,
                                size: e.currentTarget.id,
                            });
                        }}
                        className={`group flex items-center justify-center cursor-pointer border w-[36px] h-[36px] hover:border-black
                        ${isSelected === size ? "border-black" : "border-neutral-400/70"}
                        `}
                        >
                            <h2 className={` group-hover:text-black
                            ${isSelected === size ? "text-black" : "text-neutral-400"}
                            `}>{size}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-7 w-fit mt-10">
                <div className="flex items-center justify-evenly gap-6 px-1 border border-neutral-400/70">
                        <button onClick={() => setProductToAdd((prevProduct) => ({...prevProduct, quantity: Math.max(prevProduct.quantity - 1, 1)}))}>
                            <FaMinus className="text-xs cursor-pointer hover:text-neutral-400" />
                        </button>
                        <p>{productToAdd.quantity}</p>
                        <button onClick={() => setProductToAdd((prevProduct) => ({...prevProduct, quantity: prevProduct.quantity+1}))}>
                            <FaPlus className="text-xs cursor-pointer hover:text-neutral-400" />
                        </button>
                </div>
                <div>
                    <Button
                        id="addToCartBtn"
                        icon={FaShoppingCart}
                        onClick={() => AddProduct(productToAdd)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
            <div 
                className="
                scrollbar-track-transparent
                scrollbar-thumb-neutral-400
                scrollbar-thin
                lg:overflow-y-scroll 
                lg:max-h-[400px]
                lg:mr-2 
                lg:pb-3
                xl:overflow-y-visible
                xl:h-max
                xl:mr-0
                xl:pb-0"
            >
                <h2 className="font-bold text-lg mb-3 mt-16">Description</h2>
                <p>
                    {product.description}
                </p>
                <p className="font-bold text-base mb-1 mt-3">Piece Details:</p>
                <ul className="pl-5 mb-5">
                    {product.PieceDetails && product.PieceDetails.map((detail, index) => (
                        <li key={index} className="list-disc">{detail}</li>
                    ))}
                </ul>
                <p><span className="font-bold">Country:</span> {product.country}</p>
                <p><span className="font-bold">Manufacturer:</span> {product.Manufacturer}</p>
                <p><span className="font-bold">Market:</span> National</p>
            </div>
        </div>
    )
}

export default ProductDesc;