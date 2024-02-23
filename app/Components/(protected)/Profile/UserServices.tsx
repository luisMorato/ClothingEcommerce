import Link from "next/link";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiHeadsetDuotone } from "react-icons/pi";
import { TbShieldHalf } from "react-icons/tb";
import { LuEye } from "react-icons/lu";

const UserServices = () => {
    return(
        <div className="flex flex-col items-center justify-center gap-5 mt-4">
            <div className="flex gap-5">
                <Link href='' className="shadow-md rounded-2xl max-w-[50%] p-2 pr-0">
                    <div>
                        <FaRegMoneyBillAlt className="text-2xl" />
                        <div>
                            <h3 className="text-sm font-medium">Payments & payouts</h3>
                            <p className="text-xs mt-2">Review payments, payouts, coupons, and gift cards.</p>
                        </div>
                    </div>
                </Link>
                <Link href='' className="shadow-md rounded-2xl max-w-[50%] p-2 pr-0">
                    <div>
                        <LuEye className="text-2xl" />
                        <div>
                            <h3 className="text-sm font-medium">Privacy & sharing</h3>
                            <p className="text-xs mt-2">Manage your personal data, connected services.</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex gap-5">
                <Link href='' className="shadow-md rounded-2xl max-w-[50%] p-2 pr-0">
                    <div>
                        <PiHeadsetDuotone className="text-2xl" />
                        <div>
                            <h3 className="text-sm font-medium">Support</h3>
                            <p className="text-xs mt-2">Explore support, assistance, and troubleshooting options.</p>
                        </div>
                    </div>
                </Link>
                <Link href='' className="shadow-md rounded-2xl max-w-[50%] p-2 pr-0">
                    <div>
                        <TbShieldHalf className="text-2xl" />
                        <div>
                            <h3 className="text-sm font-medium">Login & security</h3>
                            <p className="text-xs mt-2">Update your password and secure your account.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserServices;