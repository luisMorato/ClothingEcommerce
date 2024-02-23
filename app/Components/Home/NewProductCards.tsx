'use client';
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';

import { AddProduct } from "@/app/utils/AddToCart";
import { productToAddProps } from "@/app/Types/route";

import Button from "@/app/Components/Layout/Button";

type NewProductsCardProps = {
    id: number
    imgSrc: string,
    title: string,
    size: string
}

const NewProductsCard = ({ id, imgSrc, title, size }: NewProductsCardProps) => {
    const [productToAdd, setProductToAdd] = useState<productToAddProps>({
        productId: id,
        quantity: 1,
        size: size,
    });

    return(
        <div className="relative w-[300px] h-[400px] border border-neutral-300">
            <Link href={`/Products/${id}`}>
                <div className="relative w-full h-full">
                    <Image src={imgSrc} alt={title} fill quality={100} sizes="300px"/>
                </div>
            </Link>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 brightness-75 hover:brightness-100 hover:cursor-pointer">
                <Button
                    id={`Produtc-${id}-Button`}
                    icon={FaShoppingCart}
                    onClick={() => AddProduct(productToAdd)}
                >
                    Add To Cart
                </Button>
            </div>
        </div>
    )
}

export default NewProductsCard;