"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";

export default function SignInForm() {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      console.log(values);
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(response);
      if (response?.error === "CredentialsSignin") {
        setError("Invalid email or password!");
      } else if (response?.error) {
        setError("Something went wrong!");
      }
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 py-8"}>
        <CardContent className={"space-y-3"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className={"text-red-500"}>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className={"text-red-500"}>*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription className={"text-red-500"}>{error}</FormDescription>
        </CardContent>
        <CardFooter className={"flex flex-col gap-1"}>
          <Button type="submit" className={"w-full cursor-pointer"}>
            Sign In
          </Button>
          <p className={"w-max mt-2"}>
            Don&apos;t have an account?{" "}
            <Link href={"/sign-up"} className={"hover:underline"}>
              <strong>Sign up</strong>
            </Link>
          </p>
        </CardFooter>
      </form>
    </Form>
  );
}
