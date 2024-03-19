'use client';
import Image from "next/image";
import { useState } from "react";
import { GrZoomIn } from "react-icons/gr";
import { 
    ImArrowDown, 
    ImArrowUp 
} from "react-icons/im";
import { 
    FaChevronLeft, 
    FaChevronRight 
} from "react-icons/fa";

import { productsProps } from "@/app/Types/route";

const ProductImages = ({ product }: { product: productsProps }) => {
    const [principalImage, setPrincipalImage] = useState<string>(product?.image[0] as string);
    const [showMoreImages, setShowMoreImages] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState(0);

    const [zoomIn, setZoomIn] = useState({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        display: "none"
    });

    const zoomImage = (e: React.MouseEvent<HTMLImageElement>) => {
        const { offsetX, offsetY, target } = e.nativeEvent;

        const width = (target as HTMLImageElement).offsetWidth;
        const height = (target as HTMLImageElement).offsetHeight;

        const zoomX = (offsetX / width) * 100;
        const zoomY = (offsetY / height) * 100;

        setZoomIn({...zoomIn, 
            x: zoomX,
            y: zoomY,
            top: offsetY - 100,
            left: offsetX - 100,
            display: "block"
        });
    }

    const handleMouseLeave = () => {
        setZoomIn({...zoomIn, 
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            display: "none"
        });
    }

    return product && principalImage && (
        <div 
            className="w-full flex relative
            md:gap-5"
        >
            <div className="relative max-h-[794px] overflow-y-hidden">
                <div
                    className="hidden gap-4 h-full
                    md:flex 
                    md:flex-col"
                >
                    {
                        product.image.map((productImage, index) => (
                            <div
                                key={index}
                                style={showMoreImages === true ? {transform: `translateY(-110%)`} : {transform: `translateY(0)`}}
                                className={`relative w-[140px] min-h-[184px] cursor-pointer translate duration-200
                                ${principalImage === productImage ? "border border-rose-500" : ""}
                                `}
                                onClick={() => setPrincipalImage(productImage)}
                            >
                                <Image src={productImage} alt={`product-${product.title}-${index}`} fill quality={100} sizes="140px" priority/>
                            </div>
                        ))
                    }
                    <button
                        onClick={() => setShowMoreImages(() => !showMoreImages)}
                        className={product.image.length > 4 ? "absolute bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 p-[6px] rounded-full flex items-center justify-center hover:scale-125 z-20" : "hidden"}
                    >
                        {showMoreImages ? 
                            <ImArrowUp className="text-white text-base w-full h-full"/>
                            :
                            <ImArrowDown className="text-white text-base w-full h-full"/>
                        }
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div 
                    className="relative w-[350px] h-[550px]
                    md:w-[482px] 
                    md:h-[794px]"
                >
                    <Image
                        onMouseMove={(e) => {zoomImage(e)}}
                        onMouseLeave={handleMouseLeave}
                        className="hidden md:block"
                        src={principalImage} alt='principalImage' fill quality={80} priority sizes="482px"
                    />
                    <Image
                        onMouseMove={(e) => {zoomImage(e)}}
                        onMouseLeave={handleMouseLeave}
                        className="md:hidden"
                        src={product.image[imageIndex] as string} alt='principalImage' fill quality={80} priority sizes="350px"
                    />
                    <div 
                        className="absolute flex justify-between px-3 w-full top-1/2 -translate-y-1/2 z-30 text-lg
                        md:hidden"
                    >
                        <button
                            className="flex items-center justify-center p-1 rounded-full bg-white/95"
                            onClick={() => setImageIndex((prevIndex) => prevIndex - 1 < 0 ? product.image.length -1 : prevIndex - 1)}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="flex items-center justify-center p-1 rounded-full bg-white/95"
                            onClick={() => setImageIndex((prevIndex) => prevIndex + 1 >= product.image.length ? 0 : prevIndex + 1)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                    <div
                        className="absolute z-20 bg-no-repeat w-[300px] h-[300px] rounded-full bg-center pointer-events-none"
                        style={{
                            backgroundSize: "600%", 
                            backgroundImage: `url(${principalImage})`,
                            backgroundPosition: `${zoomIn.x}% ${zoomIn.y}%`,
                            top: `${zoomIn.top}px`,
                            left: `${zoomIn.left}px`,
                            display: `${zoomIn.display}`
                        }}
                    ></div>
                </div>
                <p className="text-neutral-400 flex items-center gap-2 w-fit mx-auto">
                    <span><GrZoomIn className="rotate-90"/></span>Hover to Zoom In
                </p>
            </div>
        </div>
    )
}

export default ProductImages;