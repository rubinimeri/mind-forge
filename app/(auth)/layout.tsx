import React from 'react';
import Logo from "@/components/logo";

export default function AuthLayout(
  { children } : { children: React.ReactNode
  }) {
  return (
    <>
      <nav className={"py-2"}>
        <Logo width={200} height={56} className={"mx-auto"} />
      </nav>
      <main className={"min-h-screen"} >
        {children}
      </main>
    </>
  );
}