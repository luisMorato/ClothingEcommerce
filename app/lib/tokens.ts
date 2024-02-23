'use server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/app/lib/db';

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exitingToken = await getResetPasswordTokenByEmail(email);

    if(exitingToken){
        await db.passwordResetToken.delete({
            where: {
                id: exitingToken.id
            }
        });
    }

    const resetPasswordToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    if(resetPasswordToken){
        return resetPasswordToken;
    }
}

export const getResetPasswordTokenByEmail = async (email: string) => {
    try {
        const resetPasswordToken = await db.passwordResetToken.findFirst({
            where: {
                email: email,
            }
        });

        if(resetPasswordToken){
            return resetPasswordToken;
        }
    } catch (error) {
        return null;
    }
}

export const getResetPasswordTokenByToken = async (token: string) => {
    try {
        const resetPasswordToken = await db.passwordResetToken.findUnique({
            where: {
                token: token,
            }
        });

        if(resetPasswordToken){
            return resetPasswordToken;
        }
    } catch (error) {
        return null;
    }
} 




