import React from 'react';
import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

async function Page() {
  const background = {
    background: '#4545ff linear-gradient(45deg, rgba(69, 69, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)'
  }
  return (
    <>
      <nav className={"p-2"}><img className={"mx-auto"} src="/full-logo.png" alt="" width={100}/></nav>
      <main className={"min-h-screen content-center"} style={background}>
        <SignUpForm />
      </main>
    </>
  );
}

export default Page;