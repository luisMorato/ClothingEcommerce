import bcrypt from 'bcryptjs';

import { getResetPasswordTokenByToken } from "@/app/lib/tokens";
import { getUserByEmail } from "@/app/utils/GetUser";
import { db } from '@/app/lib/db';

export const NewPassword = async (password: string, token: string | null) => {
    if(!token){
        return ({error: 'Missing Token!', ok: false, status: 400});
    }
0
    if(!password){
        return ({ error: 'Password is required!', ok: false, status: 422 });
    }

    const existingToken = await getResetPasswordTokenByToken(token);

    if(!existingToken){
        return ({ error: 'Invalid Token!', ok: false, status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return ({ error: 'Token has Expired!', ok: false, status: 400 });
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return ({ error: 'Email not Found!', ok: false, status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if(hashedPassword){
        const update = await db.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                hashedPassword: hashedPassword,
            }
        });

        const deleteToken = await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })

        if(update && deleteToken) return ({ success: 'Password Updated Successfully', ok: true, status: 200 });
        return ({ success: 'Something Went Wrong', ok: false, status: 400 })
    }
}