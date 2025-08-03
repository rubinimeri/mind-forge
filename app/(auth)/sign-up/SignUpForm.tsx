"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"

import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PasswordInput
} from "@/components/ui/password-input"
import {CardContent, CardFooter} from "@/components/ui/card";
import Link from "next/link";
import { signUpSchema } from "@/lib/schemas/auth.schema";
import {signUp} from "@/app/(auth)/actions";
import {signIn} from "next-auth/react";
import {useState} from "react";

export default function SignUpForm() {
  const [error, setError] = useState<string>("");

  const form = useForm < z.infer < typeof signUpSchema >> ({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(values: z.infer < typeof signUpSchema > ) {
    try {
      const result = await signUp(values)
      if (result?.error) {
        setError(result.error)
        return;
      }

      await signIn("credentials", { email: values.email, password: values.password, redirect: false })
    } catch (error) {
      console.error("Form submission error", error);
      setError("Account creation failed!")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"py-4"}>
        <CardContent className={"space-y-4"}>
        <FormField
          control={form.control}
          name="firstName"
          render={({field}) => (
            <FormItem>
              <FormLabel>First Name <span className={'text-red-500'}>*</span></FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""

                  type=""
                  {...field} />
              </FormControl>

              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email <span className={'text-red-500'}>*</span></FormLabel>
              <FormControl>
                <Input
                  placeholder=""

                  type="email"
                  {...field} />
              </FormControl>

              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password <span className={'text-red-500'}>*</span></FormLabel>
              <FormControl>
                <PasswordInput placeholder="" {...field} />
              </FormControl>
              <FormDescription>Password must be at least 8 characters long.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>Confirm Password <span className={'text-red-500'}>*</span></FormLabel>
              <FormControl>
                <PasswordInput placeholder="" {...field} />
              </FormControl>
              <FormDescription>Retype your password.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormDescription className={"text-red-500"}>{error}</FormDescription>
      </CardContent>

        <CardFooter className={"flex flex-col gap-1"}>
          <Button type="submit" className={"w-full cursor-pointer"}>Create Account</Button>
          <p className={'w-max mt-2'}>Already have an account? <Link href={'/sign-in'} className={'hover:underline'}><strong>Sign In</strong></Link></p>
        </CardFooter>
      </form>
    </Form>
  )
}