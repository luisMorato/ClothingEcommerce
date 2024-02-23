'use client';
import { User } from "@prisma/client";

import Navbar from "@/app/Components/Layout/Navbar";

const Header = ({ currentUser }: {currentUser: User | null}) => {
    return (
        <div id="header" className="w-full flex justify-center py-3 sticky top-0 z-50 border-[1px] bg-white">
            <Navbar
                currentUser={currentUser}
            />
        </div>
    )
}

export default Header;