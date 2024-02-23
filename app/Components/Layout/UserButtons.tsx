'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaUserCircle  } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import { signOut } from "next-auth/react";
import useLoginModal from "@/app/Hooks/UseLoginModal";
import useRegisterModal from "@/app/Hooks/UseRegisterModal";

import { User } from "@prisma/client";

import Button from "@/app/Components/Layout/Button";
import Cart from "@/app/Components/Layout/Cart/Cart";
import MenuSmallDevice from "./MenuSmallDevice";

const UserButtons = ({ currentUser }: {currentUser: User | null}) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
    const [openCart, setOpenCart] = useState<boolean>(false);

    return (
        <div className="relative flex gap-3">
            {
                currentUser ?
                    <>
                        <div id="userBtns" className="flex gap-2">
                            <button 
                                onClick={() => setOpenCart((value) => !value)}
                                className="flex items-center justify-center rounded-full px-2 hover:bg-neutral-200">
                                <FaCartShopping className="text-neutral-400"/>
                            </button>
                            <button
                            onClick={() => {setOpenUserMenu((value) => !value)}}
                            className="flex items-center justify-center gap-2 border rounded-[24px] py-1 px-[10px] hover:shadow-md"
                            >
                                <div className=" flex items-center border-r pr-2 border-r-neutral-400"
                                >
                                    <FaBars className="text-neutral-400 text-lg"/>
                                </div>
                                <div className="w-full h-full rounded-full">
                                    {currentUser.image ? 
                                        <div className="relative w-[20px] h-[20px] rounded-full">
                                            <Image src={currentUser.image} alt={`${currentUser.name}-Icon`} fill quality={80} sizes="100px"/>
                                        </div>
                                            :
                                        <FaUserCircle className="text-neutral-400 text-2xl"/>
                                    }
                                </div>
                            </button>
                        </div>
                        {openCart && 
                            <Cart 
                                currentUserId={currentUser.id}
                            />
                        }
                        {openUserMenu &&
                            <div className="absolute top-full right-0 mt-2 bg-white text-sm font-semibold rounded-md border">
                                <ul>
                                    <li className="py-2 px-4 text-nowrap hover:bg-neutral-200"><Link href={`/WishList?id=${currentUser.id as string}`}>My Favorites</Link></li>
                                    <li className="py-2 px-4 text-nowrap hover:bg-neutral-200"><Link href='/Profile'>Account</Link></li>
                                </ul>
                                <hr />
                                <div className="pt-3 hover:bg-neutral-200 px-4 pb-2">
                                    <button onClick={() => signOut()}>Sign Out</button>
                                </div>
                            </div>
                        }
                    </>
                :
                    <>
                        <button
                            className="hidden border border-neutral-400/70 rounded-[24px] py-1 px-[10px]
                            md:block
                            "
                            onClick={loginModal.onOpen}
                        >
                            Log In
                        </button>
                        <div 
                            className="hidden
                            md:block"
                        >
                            <Button
                                id="CreateAccountBtn"
                                onClick={registerModal.onOpen}
                            >
                                <p className="text-nowrap">Create an Account</p>
                            </Button>
                        </div>
                        <MenuSmallDevice />
                    </>
            }
        </div>
    )
}

export default UserButtons;