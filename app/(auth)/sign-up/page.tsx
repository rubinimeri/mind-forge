import { redirect } from "next/navigation";

import SignUpForm from "@/app/(auth)/sign-up/sign-up-form";
import GithubSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import { auth } from "@/auth";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

async function Page() {
  const session = await auth();

  if (session?.user) redirect('/')

  return (
    <>
      <Card className={"max-w-md mx-auto shadow-lg mt-15"}>
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