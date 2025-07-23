import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma";

export const { auth, handlers, signOut, signIn } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Credentials]
  })