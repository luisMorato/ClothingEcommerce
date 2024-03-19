'use client';
import { 
    usePathname, 
    useRouter 
} from "next/navigation";
import React, 
{ 
    useCallback, 
    useContext 
}from "react";
import { FaSearch } from 'react-icons/fa';

import { User } from "@prisma/client";
import { SearchContext } from "@/app/Context/ContextSearch";

import Logo from "@/app/Components/Layout/Logo";
import DefaultInput from "@/app/Components/Layout/Inputs/DefaultInput";
import UserButtons from "@/app/Components/Layout/UserButtons";

const Navbar = ({ currentUser }: {currentUser: User | null}) => {
    const currentPathname = usePathname();
    const router = useRouter();

    const { setSearch } = useContext(SearchContext);

    const checkCurrentPathname = useCallback(() => {
        if(currentPathname !== '/Products'){
            router.push('/Search');
        }else{
            return;
        }
    }, [currentPathname, router]);

    const checkKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && currentPathname !== '/Products'){
            router.push('/Search');
        }else{
            return;
        }
    }

    return (
        <div className="w-[84%] flex justify-between items-center">
            <Logo />
            {currentPathname !== "/CheckOut" &&
                (<div 
                className="hidden 
                md:block
                md:w-[40%]
                lg:w-[30%]
                "
            >
                <DefaultInput
                    id="searchProducts"
                    name="searchProducts"
                    placeholder="Search Products"
                    disabled={false}
                    icon={FaSearch}
                    iconPositioning="left"
                    onchange={setSearch}
                    onClick={checkCurrentPathname}
                    onkeyup={checkKeyPressed}
                />
            </div>)}
            <UserButtons 
                currentUser={currentUser}
            />
        </div>
    )
}

export default Navbar;