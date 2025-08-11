import React from 'react';
import SignUpForm from "@/app/(auth)/sign-up/sign-up-form";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import GithubSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth();

  if (session?.user) redirect('/')

  return (
    <>
      <Card className={"max-w-md mx-auto shadow-lg"}>
        <CardHeader className={'text-center'}>
        <CardTitle>
          <h1 className="text-3xl">Sign Up</h1>
        </CardTitle>
        <CardDescription>
          Welcome to MindForge, let's create a new account! <br/>
        </CardDescription>
      </CardHeader>
        <SignUpForm/>
        <CardFooter className={"grid gap-2"}>
          <GithubSignIn/>
          <GoogleSignIn/>
        </CardFooter>
      </Card>
    </>
  );
}

export default Page;