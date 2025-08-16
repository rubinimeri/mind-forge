import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
