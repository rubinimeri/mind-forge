import { redirect } from "next/navigation";

import SignInForm from "@/app/(auth)/sign-in/sign-in-form";
import GithubSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import { auth } from "@/auth";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function Page() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <Card className={"max-w-md mx-auto shadow-lg mt-[72px]"}>
      <CardHeader className={"text-center"}>
        <CardTitle>
          <h1 className="text-3xl">Sign In</h1>
        </CardTitle>
        <CardDescription>
          Welcome to MindForge, let&apos;s sign you in! <br />
        </CardDescription>
      </CardHeader>
      <SignInForm />
      <CardFooter className={"grid gap-2"}>
        <GithubSignIn />
        <GoogleSignIn />
      </CardFooter>
    </Card>
  );
}

export default Page;

