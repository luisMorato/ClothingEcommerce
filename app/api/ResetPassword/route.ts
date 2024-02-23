import { NextResponse } from "next/server";

import { sendResetPasswordEmail } from "@/app/lib/mail";
import { generateResetPasswordToken } from "@/app/lib/tokens";
import { getUserByEmail } from "@/app/utils/GetUser";
import { db } from "@/app/lib/db";

export const POST = async (req: Request) => {
    const loginEmailInput = await req.json();
    
    try {
        if(!loginEmailInput){
            return NextResponse.json({error: 'Email is Required!', ok: false}, {status: 400});
        }
    
        const existingUser = await getUserByEmail(loginEmailInput);
    
        if(!existingUser){
            return NextResponse.json({error: 'Email Not Found!', ok: false}, {status: 422});
        }

        const userProvider = await db.account.findFirst({
            where: {
                userId: existingUser.id
            }
        });

        if(userProvider && (userProvider.provider === 'github' || userProvider.provider === 'google')){
            return NextResponse.json({error: 'GitHub or Google Users Cannot Change Their Passwords', ok: false}, {status: 422 });
        }
    
        const passwordResetToken = await generateResetPasswordToken(loginEmailInput);
    
        if(passwordResetToken){
            await sendResetPasswordEmail(passwordResetToken.email, passwordResetToken.token);
        
            return NextResponse.json({ success: 'Reset Email Sent!', status: 200, ok: true });
        }
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({ error: 'Server Error', status: 500, ok: false });
    }
}