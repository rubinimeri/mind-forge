import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {hashAndSaltPassword} from "@/utils/password";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google  from "next-auth/providers/google";

export const { auth, handlers, signOut, signIn } =
  //@ts-ignore
  NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
      GitHub,
      Google,
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        authorize: async (credentials: Partial<Record<"email" | "password", unknown>> | undefined) => {
          try {
            if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
              return null;
            }

            let user = null

            user = await prisma.user.findFirst({where: {email: credentials.email}})

            if (!user)
              return null

            let hashedPassword
            if (user?.salt)
              hashedPassword = await hashAndSaltPassword(credentials.password, user.salt)

            const passwordsMatch = hashedPassword === user.password;

            if (!passwordsMatch)
              return null;

            console.log(user)

            return {
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              image: user.image,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }
          } catch (err) {
            console.error(err)
            return null;
          }
        }
      })
    ],
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
    },
    callbacks: {
      async jwt({ token, user }: { token: JWT, user: User }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.lastName = user.lastName;
          token.email = user.email;
          token.image = user.image;
          token.createdAt = user.createdAt;
          token.updatedAt = user.updatedAt;
        }
        return token;
      },
      async session({ session, token }: { session: Session, token: JWT }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.name = token.name as string;
          session.user.email = token.email as string;
          session.user.image = token.image as string | null;
          session.user.lastName = token.lastName as string;
          session.user.createdAt = token.createdAt as Date;
          session.user.updatedAt = token.updatedAt as Date;
        }
        return session;
      }
    }
  })