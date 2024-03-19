import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/utils/GetUser";
import { 
    addProductToWishList, 
    getWishListData, 
    removeFromWishList 
} from "@/app/Actions/WishList";

export const POST = async (req: Request) => {
    const productId = await req.json();

    try {
        const data = await addProductToWishList(productId);

        if(data!.success){
            return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({error: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}

export const GET = async (req: Request) => {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const userId = queryParams.get("id") as string;

    try {
        const data = await getWishListData(userId);

        if(data.success){
            return NextResponse.json({data: data.wishListData, message: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({message: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({message: 'Server Error!'}, {status: 500});
    }
}

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