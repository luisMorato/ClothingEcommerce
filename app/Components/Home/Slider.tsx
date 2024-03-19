'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";

import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { 
    FaChevronRight, 
    FaChevronLeft 
} from "react-icons/fa";

import data from "@/public/Data/FakeApi.json";
const { Slides } = data;

const Slider = () => {
    const router = useRouter();

    const [visibleSlide, setVisibleSlide] = useState<number>(1);
    const slideInterval = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        clearInterval(slideInterval.current as NodeJS.Timeout);
        setVisibleSlide((value) => value === Slides.length ? 1 : value + 1 );
    };

    const prevSlide = () => {
        clearInterval(slideInterval.current as NodeJS.Timeout);
        setVisibleSlide((value) => value === 1 ? Slides.length : value - 1 );
    };

    useEffect(() => {
        slideInterval.current = setInterval(() => {
            setVisibleSlide((value) => value === Slides.length ? 1 : value + 1);
        }, 5000);

        return () => clearInterval(slideInterval.current as NodeJS.Timeout);
    }, []);

    return(
        <div 
            className="w-full relative overflow-hidden h-[400px]
            md:h-[500px]
        ">
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <FaChevronLeft className="text-5xl font-light text-white" />
            </button>
                {Slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full absolute top-0 left-0 duration-500 translate" style={{ transform: `translateX(${(slide.id - visibleSlide) * 100}%)` }}>
                        <section className="w-full h-full relative">
                            <h1 className={slide.slideTitle ? "text-white text-center text-5xl absolute left-1/2 -translate-x-1/2 w-full top-[10%] z-10 md:top-[10%] md:text-6xl" : "hidden"}>{slide.slideTitle}</h1>
                            <h2 
                            className={slide.slideText ? "text-white text-center text-3xl absolute w-[40%] z-10 hidden md:left-1/2 md:-translate-x-1/2 md:top-[45%] lg:block" : "hidden"}>{slide.slideText}</h2>
                        </section>
                        <Image className="hidden lg:block" src={slide.imgSrc[0]} alt={`slider-img-${slide.id}`} fill quality={100} sizes="100%" priority />
                        <Image className="lg:hidden" src={slide.imgSrc[1]} alt={`slider-img-${slide.id}`} fill quality={100} sizes="100%" priority />
                        <div className="flex justify-center absolute bottom-10 gap-4 z-10 w-full
                        md:gap-14">
                            <button
                                onClick={() => router.push(slide.btn1Link as string)}
                                className={slide.btn1Text ? "border border-x-white rounded-[44px] text-black py-2 px-5 text-nowrap hover:bg-black hover:text-white hover:border-black md:px-12" : "hidden"}
                            >
                                {slide.btn1Text}
                            </button>
                            <button 
                                onClick={() => router.push(slide.btn2Link as string)}
                                className={slide.btn2Text ? "border border-x-white rounded-[44px] text-black py-2 px-5 text-nowrap hover:bg-black hover:text-white hover:border-black md:px-12" : "hidden"}
                            >
                                {slide.btn2Text}
                            </button>
                        </div>
                    </div>
                ))}

            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <FaChevronRight className="text-5xl font-light text-white" />
            </button>
        </div>
    )
}

export default Slider;