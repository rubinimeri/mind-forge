"use client"

import {
  toast
} from "sonner"
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

const formSchema = z
  .object({
    email: z.email({ error: 'Email is required.' }),
    password: z.string({ error: 'Password is required'}).min(8, { error: 'Password must be at least 8 characters.' }),
  })

export default function SignInForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
          </CardContent>
          <CardFooter className={"flex flex-col gap-1"}>
            <Button type="submit" className={"w-full cursor-pointer"}>Create Account</Button>
            <Button variant={"outline"} className={"w-full cursor-pointer"}>
              <span><img src="github-logo.png" alt="" width={24}/></span>
              Continue with Github
            </Button>
            <Button variant={"outline"} className={"w-full cursor-pointer"}>
              <span><img src="google-logo.png" alt=""/></span>
              Continue with Google</Button>
            <p className={'w-max mt-2'}>Don't have an account? <Link href={'/sign-up'} className={'hover:underline'}><strong>Sign up</strong></Link></p>
          </CardFooter>
        </form>

      </div>
    </Form>
  )
}