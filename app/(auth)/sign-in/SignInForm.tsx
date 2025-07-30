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
  FormControl, FormDescription,
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
import {CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import Link from "next/link";
import { signInSchema } from "@/lib/schemas/auth.schema";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useState} from "react";
import GithubSignIn from "@/components/GithubSignIn";

export default function SignInForm() {
  const [error, setError] = useState<string>("");

  const { data: session } = useSession()

  if (session?.user) redirect("/")

  const form = useForm < z.infer < typeof signInSchema >> ({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(values: z.infer < typeof signInSchema > ) {
    try {
      console.log(values);
      const response = await signIn("credentials", { email: values.email, password: values.password, redirect: false })
      console.log(response)
      if (response?.error === "CredentialsSignin") {
        setError("Invalid email or password!")
      } else if (response?.error) {
        setError("Something went wrong!")
      }
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <div className="mx-auto max-w-lg flex-col min-sm:rounded-4xl bg-white shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 py-8"}>
          <CardHeader className={'text-center'}>
            <CardTitle>
              <h1 className="text-3xl">Sign In</h1>
            </CardTitle>
            <CardDescription>
              Welcome to MindForge, let's sign you in! <br/>
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-3"}>
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormDescription className={"text-red-500"}>{error}</FormDescription>
          </CardContent>
          <CardFooter className={"flex flex-col gap-1"}>
            <Button type="submit" className={"w-full cursor-pointer"}>Sign In</Button>
            <Button variant={"outline"} className={"w-full cursor-pointer"}>
              <span><img src="/google-logo.png" alt=""/></span>
              Continue with Google</Button>
            <p className={'w-max mt-2'}>Don't have an account? <Link href={'/sign-up'} className={'hover:underline'}><strong>Sign up</strong></Link></p>
          </CardFooter>
        </form>
      </div>
    </Form>
  )
}