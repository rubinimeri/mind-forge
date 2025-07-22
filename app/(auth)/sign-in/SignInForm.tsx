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
import {CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string()
});

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
      <div className="mx-auto max-w-md flex-col py-4 rounded-lg">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Sign Up</h1>
          </CardTitle>
          <CardDescription>Welcome to MindForge, let's create a new account!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 py-10"}>
            <FormField
              control={form.control}
              name="firstName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
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
                  <FormLabel>Email *</FormLabel>
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
                  <FormLabel>Password *</FormLabel>
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
                  <FormLabel>Confirm Password *</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Retype your password.</FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className={"flex flex-col gap-1"}>
          <Button type="submit" className={"w-full cursor-pointer"}>Create Account</Button>
          <Button variant={"outline"} className={"w-full cursor-pointer"}><span><img src="github-logo.png" alt="" width={24}/></span>Sign up with Github</Button>
          <Button variant={"outline"} className={"w-full cursor-pointer"}><span><img src="google-logo.png" alt=""/></span>Sign up with Google</Button>
        </CardFooter>
      </div>
    </Form>
  )
}