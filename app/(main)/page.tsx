import {auth} from "@/auth";
import {redirect} from "next/navigation";
import React from "react";
import AIResponse from "@/app/(main)/ai-response";

export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <main>
      <AIResponse />
    </main>
  );
}
