import {auth} from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import {redirect} from "next/navigation";


export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <main>
      <h1>MindForge</h1>
      <h2>{session.user.email}</h2>
      <SignOutButton />
    </main>
  );
}
