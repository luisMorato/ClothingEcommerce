'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    useEffect, 
    useState 
} from "react";
import { 
    FaHeart, 
    FaShoppingCart,
    FaChevronRight,
    FaChevronLeft
} from 'react-icons/fa';
import toast from "react-hot-toast";

import { 
    productsProps, 
    productToAddProps 
} from '@/app/Types/route';
import { AddProduct } from "@/app/utils/AddToCart";
import { getCurrentUser } from "@/app/utils/GetUser";

import Button from "@/app/Components/Layout/Button";

type productsCardProps = {
    product: productsProps, 
    wishListProductsIds?: Array<number> | undefined,
    addToWishList?: (productIdLiked: number) => void
    removeFromWishList?: (productIdLiked: number) => void
}

const ProductsCard = ({
        product,
        wishListProductsIds,
        addToWishList,
        removeFromWishList
    }: productsCardProps
) => {
    const currentPathname = usePathname();

    const [imageIndex, setImageIndex] = useState(0);

    const [liked, setLiked] = useState<{like: boolean, productID: number}>({
        like: false,
        productID: product!.id
    });

    useEffect(() => {
        setLiked((prevLiked) => ({
            ...prevLiked, 
            like: wishListProductsIds && wishListProductsIds.length !== 0 ? wishListProductsIds.includes(product!.id) : false
        }));
    }, [product, wishListProductsIds]);

    const [productToAdd] = useState<productToAddProps>({
        productId: product?.id as number,
        quantity: 1,
        size: product?.sizes[0] as string,
    });

    const toggleLike = async () => {
        const user = await getCurrentUser();
        if(!user){
            toast.error("No User Logged!");
            return;
        }
        setLiked({...liked, like: !liked.like});
        if(liked.like) removeFromWishList && removeFromWishList(liked.productID);
        else addToWishList && addToWishList(liked.productID);
    }

    return product && (
            <div className="relative bg-white rounded-[24px] w-min overflow-hidden pb-4 mb-8 h-[450px]">
                {currentPathname !== "/Search" &&
                    <FaHeart
                        onClick={toggleLike}
                        className={`absolute right-[18px] top-[14px] z-10 text-[19px] cursor-pointer
                            ${liked.like ?  "text-rose-500" : "text-neutral-400"}`
                        }
                    />
                }
                <div className="relative flex flex-col items-center justify-between h-full group">
                    <Link href={`/Products/${product.id}`}>
                        <div className="relative w-[290px] h-[300px] hover:scale-105 duration-200">
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