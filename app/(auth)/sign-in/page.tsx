import React from 'react';
import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import GithubSignIn from "@/components/GithubSignIn";
import GoogleSignIn from "@/components/GoogleSignIn";
import {CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth()

  if (session?.user) redirect("/");

  const background = {
    background: '#4545ff linear-gradient(45deg, rgba(69, 69, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)'
  }
  return (
    <>
      <nav className={"py-2"}><img className={"mx-auto"} src="/horizontal-logo.png" alt="" width={200}/></nav>
      <main className={"min-h-screen content-center"} style={background}>
        <div className="mx-auto max-w-md flex-col min-sm:rounded-4xl bg-white shadow-2xl py-8">
          <CardHeader className={'text-center'}>
            <CardTitle>
              <h1 className="text-3xl">Sign In</h1>
            </CardTitle>
            <CardDescription>
              Welcome to MindForge, let's sign you in! <br/>
            </CardDescription>
          </CardHeader>
          <SignInForm />
          <CardFooter className={"grid gap-2"}>
            <GithubSignIn/>
            <GoogleSignIn/>
          </CardFooter>
        </div>
      </main>
    </>
  );
}

export default Page;