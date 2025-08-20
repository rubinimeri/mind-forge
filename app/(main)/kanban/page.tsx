import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <>Kanban</>
  );
}

export default Page;