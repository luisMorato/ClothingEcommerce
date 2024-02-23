import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

import { 
    publicRoutes,
    authRoutes,
    apiAuthPrefix
} from '@/app/Routes';

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute || isAuthRoute){
        return null;
    }

    if(nextUrl.pathname === '/api/auth/signin' && nextUrl.searchParams.get('error') === 'OAuthAccountNotLinked'){
        return NextResponse.redirect(new URL('/', nextUrl));
    }

    if(!isPublicRoute && !isLoggedIn && !nextUrl.pathname.startsWith('/Products')){
        return NextResponse.redirect(new URL('/', nextUrl));
    }

    return null;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}