import React from 'react';
import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import GithubSignIn from "@/components/GithubSignIn";

async function Page() {
  const background = {
    background: '#4545ff linear-gradient(45deg, rgba(69, 69, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)'
  }
  return (
    <>
      <nav className={"p-2"}><img className={"mx-auto"} src="/full-logo.png" alt="" width={100}/></nav>
      <main className={"min-h-screen content-center"} style={background}>
        <SignInForm />
        <GithubSignIn />
      </main>
    </>
  );
}

export default Page;