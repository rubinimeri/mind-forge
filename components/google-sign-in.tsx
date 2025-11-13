import Image from "next/image";

import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

function GithubSignIn() {
  return (
    <form action={async () => {
      "use server"
      await signIn("google")
    }}>
      <Button variant={"outline"} className={"cursor-pointer w-full"}>
        <span><Image src="/google-logo.png" alt="" width={24} height={24}/></span>
        Continue with Google
      </Button>
    </form>
  );
}

export default GithubSignIn;