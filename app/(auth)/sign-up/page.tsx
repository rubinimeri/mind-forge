import React from 'react';
import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

async function Page() {
  return (
    <>
      <nav className={"p-2"}><img className={"mx-auto"} src="/full-logo.png" alt="" width={100}/></nav>
      <main className={"min-h-[90vh] content-center"}>
        <SignUpForm />
      </main>
    </>
  );
}

export default Page;