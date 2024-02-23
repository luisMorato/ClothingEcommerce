import { NextResponse } from "next/server";

import { removeFromWishList } from "@/app/Actions/WishList";
import { getCurrentUser } from "@/app/utils/GetUser";

export const DELETE = async (req: Request) => {
    const productId = await req.json();
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({message: 'No Users Logged!'}, {status: 422});
    }

    try {
        const data = await removeFromWishList(currentUser.id as string, productId);
        
        if(!data?.productsId.includes(productId)){
            return NextResponse.json({success: 'Removed from WishList Successfully', ok: true}, {status: 200});
        }else{
            return NextResponse.json({error: 'Failed to Remove Product', ok: false}, {status: 400});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}