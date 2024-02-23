import { NextResponse } from "next/server";

import { SubtractProduct } from "@/app/Actions/CartData";

export const PUT = async (req: Request) => {
    const { productId, quantity } = await req.json();

    try {
        const data = await SubtractProduct(productId, quantity);

        if(data && data.success){
            return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({error: data?.error, ok: data?.ok}, {status: data?.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}