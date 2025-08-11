import React from 'react';
import SignInForm from "@/app/(auth)/sign-in/sign-in-form";
import GithubSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth()

  if (session?.user) redirect("/");

  return (
    <Card className={"max-w-md mx-auto shadow-lg"}>
      <CardHeader className={'text-center'}>
        <CardTitle>
          <h1 className="text-3xl">Sign In</h1>
        </CardTitle>
        <CardDescription>
          Welcome to MindForge, let's sign you in! <br/>
        </CardDescription>
      </CardHeader>
      <SignInForm/>
      <CardFooter className={"grid gap-2"}>
        <GithubSignIn/>
        <GoogleSignIn/>
      </CardFooter>
    </Card>
  );
}

export default Page;