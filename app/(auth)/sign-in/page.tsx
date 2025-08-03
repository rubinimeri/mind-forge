import React from 'react';
import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import GithubSignIn from "@/components/GithubSignIn";
import GoogleSignIn from "@/components/GoogleSignIn";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth()

  if (session?.user) redirect("/");

  const background = {
    background: '#4545ff linear-gradient(45deg, rgba(69, 69, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)'
  }
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