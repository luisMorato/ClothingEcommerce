import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { db } from "@/app/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./app/utils/GetUser";
import {JWT } from "next-auth/jwt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    pages: {
      signIn: '/',
    },
    callbacks: {
      async session({ session, token }: {session: any, token?: JWT}){
        if(token && token.sub && session.user){
          session.user.id = token.sub;
        }

        if(token && token.provider && session.user){
          session.user.provider = token.provider;
        }

        return session;
      },
      async jwt({ token }) {
        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub);

        if(!existingUser) return token;

        const provider = await db.account.findFirst({
          where: {
            userId: existingUser.id,
          },
          select: {
            provider: true
          }
        });

        if(provider && provider.provider !== undefined){
          token.provider = provider.provider;
        }else{
          token.provider = 'credentials';
        }

        return token;
      },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});