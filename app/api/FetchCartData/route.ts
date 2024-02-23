import { NextResponse } from "next/server";

import { GetCartData } from "@/app/Actions/CartData";

export const GET = async (req: Request) => {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const userId = queryParams.get("id") as string;

    try {
        const data = await GetCartData(userId);

        if(data.success){
            return NextResponse.json({cartData: data.cartData, message: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({message: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({message: 'Server Error!'}, {status: 500});
    }
}