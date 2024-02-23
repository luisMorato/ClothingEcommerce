import { NextResponse } from "next/server";

import { RemoveCartProduct } from "@/app/Actions/CartData";
import { getCurrentUser } from "@/app/utils/GetUser";

export const DELETE = async (req: Request) => {
    const productId = await req.json();

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({message: 'No Users Logged!'}, {status: 422});
    }

    try {
        const data = await RemoveCartProduct(currentUser.id as string, productId);

        if(data?.success){
            return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({error: data?.error, ok: data?.ok}, {status: data?.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}