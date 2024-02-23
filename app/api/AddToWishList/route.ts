import { NextResponse } from "next/server";

import { addProductToWishList } from "@/app/Actions/WishList";

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