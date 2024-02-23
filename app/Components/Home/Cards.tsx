import Image from "next/image";

const Cards = () => {
    return(
        <div id="beauty" className="flex flex-col gap-3 w-[80%] mx-auto mt-14
            md:px-3
            md:w-full
            xl:gap-6
            xl:px-0
            xl:w-[68%]
            2xl:w-[56%]
        ">
            <div 
                className="flex flex-col gap-3 
                md:flex-row
                xl:gap-6"
            >
                <div 
                    className="relative w-full h-[300px]
                    min-[500px]:mx-auto
                    min-[500px]:w-[80%]
                    sm:w-[70%]
                    md:w-[40%]"
                >
                    <Image className="rounded-[24px]" src="/Images/guy-walking-with-jacket.jpg" alt="guy walking with jacket" fill quality={90} sizes="100%"/>
                </div>
                <div 
                    className="relative hidden h-[300px] 
                    md:block 
                    md:w-[60%]"
                >
                    <Image className="rounded-[24px]" src="/Images/young-girl-posing-street-sunny-day.jpg" alt="girl smiling" fill quality={90} sizes="100%"/>
                </div>
            </div>
            <div 
                className="flex flex-col gap-3 
                md:flex-row
                xl:gap-6"
            >
                <div 
                    className="relative hidden h-[300px] 
                    md:block 
                    md:w-[65%]"
                >
                    <Image className="rounded-[24px]" src="/Images/cheeky-guy-leather-biker-jacket.jpg" alt="guy smiling" fill quality={90} sizes="100%" />
                </div>
                <div 
                    className="relative w-full h-[300px] 
                    min-[500px]:mx-auto
                    min-[500px]:w-[80%]
                    sm:w-[70%]
                    md:w-[35%]"
                >
                    <Image className="rounded-[24px]" src="/Images/lady-red-jacket-skirt-with-smile-posing-pink.jpg" alt="girl smiling" fill quality={90} sizes="100%" />
                </div>
            </div>
        </div>
    )
}

export default Cards;