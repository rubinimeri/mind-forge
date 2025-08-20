import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Quote, Trash} from "lucide-react";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {formatDate} from "@/lib/utils";
import ThoughtDetails from "@/app/(main)/dashboard/thought-details";
import {getThoughts} from "@/app/actions";

export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  const thoughts = await getThoughts(session?.user.id);

  if (!thoughts)
    return (
      <h1 className={"mt-4 text-secondary font-light"}>No thoughts yet...</h1>
    )

  return (
    <div className={"flex flex-wrap gap-4 p-4 items-start"}>
      {thoughts.map((thought) => (
        <Card className={"grid grid-cols-1 basis-[600px] max-w-[600px] grow-1"} key={thought.id}>
          <CardHeader key={thought.id} className={"self-center flex justify-between items-start gap-1"}>
            <Quote strokeWidth={1} className={"transform rotate-180 fill-primary stroke-primary text-[40px] shrink-0"}/>
            <h3 className={"italic text-xl tracking-wide text-center"}>
              {thought.content}
            </h3>
            <Quote strokeWidth={1} className={"self-end fill-primary stroke-primary text-[40px] shrink-0"}/>
          </CardHeader>

          <ThoughtDetails thought={thought} />

          <CardFooter className={"flex justify-between"} >
            <form action="">
              <Button type="submit" size={"sm"} variant="outline" className={"hover:bg-primary dark:hover:bg-primary hover:text-white rounded-full"}>
                <Trash />
              </Button>
            </form>

            <p className={"tracking-wider text-sm font-light text-gray-500"}>
              {formatDate(thought.createdAt)}
            </p>
          </CardFooter>
        </Card>))}
    </div>
  );
}
