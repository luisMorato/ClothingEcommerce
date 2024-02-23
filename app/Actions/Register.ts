import { db } from "@/app/lib/db";
import bcrpyt from 'bcryptjs';

export const Register = async (
    name: string,
    email: string,
    password: string
) => {
    if(!name || !email || !password){
        return ({error: 'Something Went Wrong!', ok: false, status: 400});
    }

    const existingUser = await db.user.findUnique({
        where: { 
            email,
        },
    });

    if(existingUser) return ({error: 'Email Already Taken!', ok: false, status: 422});

    const hashedPassword = await bcrpyt.hash(password, 10);

    const create = await db.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
        }
    });

    if(create) return ({success: 'Email Sent!', ok: true, status: 201});

    return ({error: 'Something Went Wrong!', ok: false, status: 400});
}