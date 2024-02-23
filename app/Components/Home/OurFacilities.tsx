const OurFacilities = () => {
    return(
        <div className="flex flex-col bg-grayVariant text-neutral-600 py-10">
            <div className="self-center">
                <h2 
                    className="text-4xl text-center mb-3 
                    lg:mb-5"
                >
                    LOGO
                </h2>
                <p className="text-center mb-6">Get to Know All Our Facilities</p>
            </div>
            <div 
                className="flex flex-col gap-y-8 justify-evenly w-full mx-auto
                md:flex-row
                lg:w-[84%]"
            >
                <section 
                    className="flex flex-col items-center justify-center 
                    lg:-translate-x-12
                    xl:translate-x-0"
                >
                    <h2 
                        className="text-3xl text-center mb-6 relative after:absolute after:h-[1px] after:w-full after:bg-neutral-400 after:top-full after:left-0 after:mt-1
                        md:text-2xl
                        lg:text-3xl"
                    >Easy Payment</h2>
                    <p className="text-center text-wrap w-3/4">We Encompass a lot of Payment Methods</p>
                </section>
                <section 
                    className="flex flex-col items-center justify-center 
                    md:-translate-x-12"
                >
                    <h2 
                        className="text-3xl text-center mb-6 relative after:absolute after:h-[1px] after:w-full after:bg-neutral-400 after:top-full after:left-0 after:mt-1
                        md:text-2xl
                        lg:text-3xl"
                    >Buy by Whatsapp</h2>
                    <p className="text-center text-wrap w-3/4">Buy with us from the Confort of Your House</p>
                </section>
                <section 
                    className="flex flex-col items-center justify-center 
                    md:-translate-x-12"
                >
                    <h2 
                        className="text-3xl text-center mb-6 relative after:absolute after:h-[1px] after:w-full after:bg-neutral-400 after:top-full after:left-0 after:mt-1
                        md:text-2xl
                        lg:text-3xl"
                    >Free Returns</h2>
                    <p className="text-center text-wrap w-3/4">Free Returns Within 30 Days</p>
                </section>
            </div>
        </div>
    )
}

export default OurFacilities;