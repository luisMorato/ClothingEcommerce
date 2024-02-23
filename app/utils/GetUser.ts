'use server';
import { db } from "@/app/lib/db";
import { auth } from "@/auth";

export const getUserByEmail = async (email: string) => {
    const existingUser = await db.user.findFirst({
        where: { email }
    });

    if(existingUser) return existingUser;
    
    return null;
}

export const getUserById = async (userId: string) => {
    const existingUser = await db.user.findUnique({
        where: { 
            id: userId
        }
    });

    if(existingUser) return existingUser;
    
    return null;
}

export const getCurrentUser = async () => {
    const session = await auth();
    if(session && session.user){
        const user = await getUserById(session.user.id as string);

        if(user) return user;
    }
    return null;
}