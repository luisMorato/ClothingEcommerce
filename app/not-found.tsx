'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";

const NotFound = () => {
    const router = useRouter();
    
    return(
        <div className="relative w-full h-[80vh] bg-[#E9E9E9]
        sm:h-screen
        md:h-[60vh]
        lg:h-screen">
           <Image
                className="hidden md:block"
                src='/Images/girl-disapointed.jpg'
                alt='girl disapointed'
                fill
                quality={80}
                priority
                sizes=""
           />
           <Image
                className="hidden sm:block md:hidden"
                src='/Images/man-looking-for-something.jpg'
                alt='Man disapointed'
                fill
                quality={80}
                priority
                sizes=""
           />
           <div 
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/2
                sm:top-[2%]
                sm:translate-y-0
                md:translate-x-0
                md:right-0
                md:top-[30%]
                lg:right-[10%]
                xl:right-[8%]"
            >
                <div 
                    className="flex gap-1 mb-8 text-7xl
                    md:text-8xl
                    lg:text-9xl"
                >
                    <h1 className="-rotate-[55deg] translate-y-10 inline-block">4</h1>
                    <h1 className="tracking-[4px] inline-block">04</h1>
                </div>
                <h2 
                    className="mb-4 inline-block text-4xl
                    md:text-6xl"
                >Ops,</h2>
                <p 
                    className="mb-4 
                    md:text-wrap 
                    md:text-lg
                    lg:text-xl
                    lg:w-[88%] "
                >It seems that you are trying to access a page that not exists or is under maintance.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-transparent border border-black px-5 py-1 hover:bg-black hover:text-white"
                >
                    Back to Home
                </button>
           </div>
        </div>
    )
}

export default NotFound;