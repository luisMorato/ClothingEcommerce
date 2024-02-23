import { Register } from "@/app/Actions/Register";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { registerNameInput, registerEmailInput, registerPasswordInput } = await req.json();

    try {
        const data = await Register(registerNameInput, registerEmailInput, registerPasswordInput);

       if(data.success) return NextResponse.json({success: data.success, ok:data.ok}, {status: data.status});
       else return NextResponse.json({error: data.error, ok:data.ok}, {status: data.status});
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({error: 'Server Error', ok: false}, {status: 500});
    }
}