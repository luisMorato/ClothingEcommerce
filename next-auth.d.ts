import NextAuth, { DefaultSession } from "next-auth";

export type extendedUser = DefaultSession["user"] & {
    provider: string,
}

declare module "next-auth" {
    interface Session {
        user: extendedUser,
    }
}
  