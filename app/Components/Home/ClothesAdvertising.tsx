import Image from "next/image"

const ClothesAdvertising = () => {
    return(
        <div id="basics" className="bg-[#CAD2D6] w-full h-[300px] relative my-16">
            <section 
                className="absolute max-[520px]:left-1/2 max-[520px]:-translate-x-1/2 top-12 right-5 z-10 
                md:left-1/2 
                md:-translate-x-1/2"
            >
                <h2
                    className="text-white text-center text-4xl font-bold tracking-[8px] mb-3
                    md:text-5xl"
                >BASICS</h2>
                <p className="text-white text-center text-2xl font-light">starting at</p>
                <span className="flex justify-center">
                    <h2 className="text-white text-3xl tracking-[2px] font-semibold">$</h2>
                    <h2 className="text-white text-center text-5xl tracking-[2px] font-bold">39</h2>
                    <h2 className="text-white text-3xl tracking-[2px] font-semibold">,99</h2>
                </span>
            </section>
            <Image className="max-[520px]:hidden block md:hidden" src="/Images/relaxed-young-woman-leaning-grey-wall-with-her-raised-hands.jpg" alt="Advertising" fill quality={70} />
            <Image className="hidden md:block" src="/Images/Advertising.png" alt="Advertising" fill quality={70} />
            <button
                className="absolute max-[520px]:left-1/2 max-[520px]:-translate-x-1/2 bottom-8 right-8 text-nowrap border border-white text-white py-1 px-12 w-fit hover:bg-black hover:text-white hover:border-black
                md:left-1/2 
                md:-translate-x-1/2"
            >Buy Now</button>
        </div>
    )
}

export default ClothesAdvertising;