import {Button} from "@/components/ui/button";
import {signIn} from "@/auth";

function GithubSignIn() {
  return (
    <form action={async () => {
      "use server"
      await signIn("github")
    }}>
      <Button variant={"outline"} className={"w-full cursor-pointer"}>
      <span><img src="/github-logo.png" alt="" width={24}/></span>
      Continue with Github
    </Button>
    </form>
  );
}

export default GithubSignIn;