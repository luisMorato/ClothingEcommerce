import { NextResponse } from "next/server";

import { NewPassword } from "@/app/Actions/NewPassword";

export const PUT = async (req: Request) => {
    const {NewPassowrd, token} = await req.json();
    const password = NewPassowrd;

    try {
        const data = await NewPassword(password, token);

        if(data){
            if(data.success){
                return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
            }
            return NextResponse.json({error: data.error, ok: data.ok}, {status: data.status});
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}