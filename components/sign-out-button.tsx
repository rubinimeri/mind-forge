"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SignOutButton({ className = "" }: { className?: string }) {
  return (
      <Button
      variant={'destructive'}
      size={"sm"}
      className={cn("cursor-pointer", className)}
      type="submit"
      onClick={() => signOut()}>
        Sign Out
      </Button>
  );
}

export default SignOutButton;