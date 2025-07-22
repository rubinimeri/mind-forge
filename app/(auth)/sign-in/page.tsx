import React from 'react';
import SignInForm from "@/app/(auth)/sign-in/SignInForm";

async function Page() {
  return (
    <>
      <nav className={"p-2"}><img className={"mx-auto"} src="/full-logo.png" alt="" width={100}/></nav>
      <main className={""}>
        <SignInForm />
      </main>
    </>
  );
}

export default Page;