import React from 'react';

export default function AuthLayout(
  { children } : { children: React.ReactNode
  }) {
  return (
    <>
      <nav className={"py-2"}><img className={"mx-auto"} src="/horizontal-logo.png" alt="" width={200}/></nav>
      <main className={"min-h-screen content-center"} >
        {children}
      </main>
    </>
  );
}