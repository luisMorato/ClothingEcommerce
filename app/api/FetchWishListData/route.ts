import { NextResponse } from "next/server";

import { getWishListData } from "@/app/Actions/WishList";
import { getCurrentUser } from "@/app/utils/GetUser";

export const GET = async (req: Request) => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({message: 'No Users Logged!'}, {status: 422});
    }

    try {
        const data = await getWishListData(currentUser.id as string);

        if(data.success){
            return NextResponse.json({wishListData: data.wishListData, message: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({message: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({message: 'Server Error!'}, {status: 500});
    }
}