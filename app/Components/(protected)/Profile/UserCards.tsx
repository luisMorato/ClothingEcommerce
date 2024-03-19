'use client';
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

import { Capitalize } from "@/app/utils/UsefulFunctions";
import useUploadImageModal from "@/app/Hooks/UseUploadImageModal";

import Button from "@/app/Components/Layout/Button";
import UploadImageModal from "@/app/Components/(protected)/Profile/UploadImageModal";

type UserCardsProps = {
    currentUserName: string | null,
    currentUserImage: string | null
}

const UserCards = ({ 
    currentUserName, 
    currentUserImage 
}: UserCardsProps) => {
    const UploadImageModalconfig = useUploadImageModal();
    
    return currentUserName && (
    <div className="flex flex-col">
        <div 
            className="flex flex-col items-center justify-center max-w-[300px] shadow-lg rounded-3xl py-3 
            md:max-w-[400px]
            lg:max-w-[350px]
            2xl:max-w-[300px]"
        >
            <div
                onClick={UploadImageModalconfig.onOpen}
                className="relative flex items-center justify-center w-[100px] h-[100px] bg-rose-500 rounded-full cursor-pointer"
            >
                {!currentUserImage ? 
                    <h2 className="text-white text-4xl font-bold">{currentUserName[0].toLocaleUpperCase() as string}</h2>
                    :
                    <Image src={currentUserImage as string} alt='User Profile Image' fill quality={100} sizes="100px"/>
                }
                <UploadImageModal />
            </div>
            <div>
                <h2 className="text-3xl font-bold mt-4">{currentUserName}</h2>
                <p className="text-neutral-400 text-center text-sm font-semibold">Guest</p>
            </div>
        </div>
        <div 
            className="flex flex-col items-center max-w-[300px] mt-14 border border-neutral-300 rounded-3xl py-6 
            md:max-w-[400px]
            lg:max-w-[350px]
            xl:max-w-[300px]
            2xl:max-w-[300px]"
        >
            <div className={`${currentUserName.length > 5 ? "px-6" : "px-3"}`}>
                <h2 
                    className={`text-xl text-neutral-600 font-medium mb-5
                    md:text-center
                    ${currentUserName.length > 5 ? "text-center" : ""}
                    `}
                >{Capitalize(currentUserName)}’s confirmed Information</h2>
                <p 
                    className="flex items-center w-full gap-2 text-xl text-left font-light mb-5
                    md:ml-8
                    lg:ml-0"
                >
                    <FaCheck className="text-neutral-600" /> Email Address
                </p>
                <hr />
            </div>
            <div className="pl-8">
                <div className="text-neutral-600 mt-12">
                    <h2 className="text-xl font-medium mb-5">Verify your identity</h2>
                    <p className="w-[88%] text-sm">Before you buy on Logo, you’ll need to complete this step. </p>
                </div>
                <div className="flex justify-start w-full mt-5">
                    <Button
                        id="getVerified"
                        outline
                        roundedMd
                    >
                        Get Verified
                    </Button>
                </div>
            </div>
        </div>
    </div>)
}

export default UserCards;