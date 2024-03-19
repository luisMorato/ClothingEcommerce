import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/utils/GetUser";
import { 
    AddCartProduct, 
    GetCartData, 
    RemoveCartProduct, 
    SubtractProduct 
} from "@/app/Actions/CartData";

export const POST = async (req: Request) => {
    const { productId, quantity, size } = await req.json();

    try {
        const data = await AddCartProduct(productId, quantity, size);

        if(data.success){
            return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({error: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false, status: 500});
    }
}

export const GET = async (req: Request) => {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const userId = queryParams.get("id") as string;

    try {
        const data = await GetCartData(userId);

        if(data.success){
            return NextResponse.json({data: data.cartData, message: data.success, ok: data.ok}, {status: data.status});
        }else{
            return NextResponse.json({message: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({message: 'Server Error!'}, {status: 500});
    }
}

export const PUT = async (req: Request) => {
    const { productId, quantity } = await req.json();

    try {
        const data = await SubtractProduct(productId as number, quantity);

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

export const DELETE = async (req: Request) => {
    const productId = await req.json();
    console.log(productId);

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({message: 'No Users Logged!'}, {status: 422});
    }

    try {
        const data = await RemoveCartProduct(currentUser.id as string, productId as number);

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
