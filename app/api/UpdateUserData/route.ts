import { NextResponse } from "next/server";

import { updateUserData } from "@/app/Actions/User";

export const PUT = async (req: Request) => {
    const body = await req.json();

    try {
        const data = await updateUserData(body);

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