import {auth} from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth()

  if (!session?.user) return <h1>Unauthorized, <Link href={"/sign-in"}>sign in</Link></h1>

  return (
    <main>
      <h1>MindForge</h1>
      <h2>{session.user.email}</h2>
    </main>
  );
}
