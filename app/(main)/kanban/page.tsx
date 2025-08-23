import {auth} from "@/auth";
import {redirect} from "next/navigation";
import Link from "next/link";
import {ArrowLeft, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import Kanban from "@/app/(main)/kanban/kanban";

async function Page() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <div className={"p-4"}>
      <div className={"flex justify-between mb-3"}>
        <Button variant={"link"} className={"pl-0 pt-0"}>
          <Link href={"/dashboard"} className={"flex items-center gap-1"}>
            <ArrowLeft/>
            Back to Dashboard
          </Link>
        </Button>
        <Button variant={"secondary"} size={"sm"} className={"gap-1 cursor-pointer text-[12px]"} > <Plus />New Task </Button>
      </div>
      <Kanban userId={session.user.id} />
    </div>
  );
}

export default Page;