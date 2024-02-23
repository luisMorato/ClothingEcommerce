import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

import { FieldValues } from "react-hook-form";

import { db } from "@/app/lib/db";
import bcrypt from 'bcryptjs';

export default {
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials: FieldValues): Promise<any>{
                const email = credentials.email as string;
                const password = credentials.password;

                const user = await db.user.findUnique({
                    where: {
                        email: email
                    }
                });

                if(user){
                    const passwordMatch = await bcrypt.compare(
                        password as string,
                        user.hashedPassword as string
                    );

                    if(passwordMatch){
                        return user;
                    }
                }

                return null;
            }
        }),
    ]
} satisfies NextAuthConfig;