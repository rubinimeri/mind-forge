"use server"

import z from "zod"
import {signUpSchema} from "@/lib/schemas/auth.schema";
import {prisma} from "@/lib/prisma";
import {generateSalt, hashAndSaltPassword} from "@/utils/password";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  try {
    const existingUser = await prisma.user.findFirst({where: {email: data.email}})

    if (existingUser) return { error: "Account already exists with this email!" }

    const salt = generateSalt();
    const hashedPassword = await hashAndSaltPassword(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        salt
      }
    })

    if (user == null) return { error: "Account creation failed!" }

    return { user }
  } catch (error) {
    console.log(error)
    return { error: "Account creation failed!" }
  }
}
