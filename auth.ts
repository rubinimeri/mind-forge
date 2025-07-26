import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {hashAndSaltPassword} from "@/utils/password";

export const { auth, handlers, signOut, signIn } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        authorize: async (credentials: Partial<Record<"email" | "password", unknown>> | undefined) => {

          if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
            return null;
          }

          let user = null

          const passwordHash = await hashAndSaltPassword(credentials.password)

          user = await prisma.user.findFirst({ where: { email: credentials.email } })

          if (!user) {
            throw new Error("Invalid credentials.")
          }

          return user
        }
      })
    ]
  })