'use client';
import Image from "next/image";
import Link from "next/link";
import { 
    useEffect, 
    useState 
} from "react";
import toast from "react-hot-toast";
import { 
    FaHeart, 
    FaShoppingCart,
    FaChevronRight,
    FaChevronLeft
} from 'react-icons/fa';

import Button from "@/app/Components/Layout/Button";

import { 
    productsProps, 
    productToAddProps 
} from '@/app/Types/route';
import { AddProduct } from "@/app/utils/AddToCart";

type productsCardProps = {
    product: productsProps, 
    wishListProductsIds: Array<number>
}

const ProductsCard = ({
        product,
        wishListProductsIds
    }: productsCardProps
) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const [imageIndex, setImageIndex] = useState(0);

    const [liked, setLiked] = useState<{like: boolean, productID: number}>({
        like: false,
        productID: product!.id
    });

    useEffect(() => {
        setLiked({...liked, like: wishListProductsIds && wishListProductsIds.length !== 0 && product ? wishListProductsIds.includes(product.id) : false});
    }, [liked.like, product, wishListProductsIds]);

    const addToWishList = async () => {
        const url = `${domain}/api/AddToWishList`;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(liked.productID),
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

    const removeFromWishList = async () => {
        const url = `${domain}/api/RemoveFromWishList`;
        try {
            const response = await fetch(url, 
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(liked.productID)
                }
            );
            const resJson = await response.json();
            if(resJson.success) toast.success(resJson.success);
            else toast.error(resJson.error);
        } catch (error) {
            console.log('error', error);
            toast.error('Error processing the request. Please, try again');
        }
    }

    const [productToAdd, setProductToAdd] = useState<productToAddProps>({
        productId: product?.id as number,
        quantity: 1,
        size: product?.sizes[0] as string,
    });

    return product && (
            <div className="relative bg-white rounded-[24px] w-min overflow-hidden pb-4 mb-8 h-[450px]">
                <FaHeart 
                    onClick={async () => {
                        setLiked({...liked, like: !liked.like});
                        if(liked.like) await removeFromWishList();
                        else await addToWishList();
                    }}
                    className={`absolute right-[18px] top-[14px] z-10 text-[19px] cursor-pointer
                        ${liked.like ?  "text-rose-500" : "text-neutral-400"}`
                    }
                />
                <div className="relative flex flex-col items-center justify-between h-full group">
                    <Link href={`/Products/${product.id}`}>
                        <div className="relative w-[276px] h-[300px] hover:scale-105 duration-200">
                            <Image src={product.image[imageIndex] as string} alt={`Product-${product.title}`} fill sizes="276px" quality={100} priority/>
                        </div>
                    </Link>
                    <div className="my-3">
                        <p className={`text-center text-neutral-400 w-[72%] mx-auto`}>{product.title}</p>
                        <p className="font-bold text-center mt-2">$ {(product.price).toFixed(2)}</p>
                    </div>
                    <div className="w-[60%]">
                        <Button
                            id="addToCartBtn"
                            icon={FaShoppingCart}
                            onClick={() => AddProduct(productToAdd)}
                        >
                            Add to Cart
                        </Button>
                    </div> 
                    <div className="absolute hidden group-hover:flex justify-between px-3 w-full top-[35%] z-30">
                        <button
                            className="flex items-center justify-center p-1 rounded-full hover:bg-white/95"
                            onClick={() => setImageIndex((prevIndex) => prevIndex - 1 < 0 ? product.image.length -1 : prevIndex - 1)}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="flex items-center justify-center p-1 rounded-full hover:bg-white/95"
                            onClick={() => setImageIndex((prevIndex) => prevIndex + 1 >= product.image.length ? 0 : prevIndex + 1)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default ProductsCard;