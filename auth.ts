import NextAuth from "next-auth"
export const { auth, handlers, signOut, signIn } = NextAuth({ providers: [] })