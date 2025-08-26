import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function Page() {
  const session = await auth();

  if (!session.user) redirect('/sign-in')
  return (
    <h1>Insights</h1>
  );
}

export default Page;