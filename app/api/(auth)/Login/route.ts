import { NextResponse } from "next/server";

import { Login } from '@/app/Actions/Login';

export const POST = async (req: Request) => {
    const { loginEmailInput, loginPasswordInput } = await req.json();

    try {
        const data = await Login(loginEmailInput, loginPasswordInput);

        if(data?.error) return NextResponse.json({error: data.error, ok: data.ok}, {status: data.status});
        return NextResponse.json({success: data.success, ok: data.ok}, {status: data.status});
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({error: 'Server Error'}, {status: 500});
    }
}