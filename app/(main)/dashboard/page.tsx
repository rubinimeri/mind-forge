import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Quote, Trash} from "lucide-react";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {formatDate} from "@/lib/utils";
import ThoughtDetails from "@/app/(main)/dashboard/thought-details";
import { placeholderThoughtData } from "@/lib/placeholder-data";

export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <div className={"flex flex-wrap gap-4 p-4 items-start"}>
      {placeholderThoughtData.map((thought) => (
        <Card className={"grid grid-cols-1 basis-[600px] max-w-[600px] grow-1"} key={thought.id}>
          <CardHeader key={thought.id} className={"self-center"}>
            <h3 className={"italic text-center flex items-start gap-1 text-xl tracking-wide"}>
              <Quote strokeWidth={1} size={40} className={"transform rotate-180 fill-primary stroke-primary"}/>
              {thought.content}
              <Quote fill={"black"} strokeWidth={1} size={40} className={"self-end fill-primary stroke-primary"}/>
            </h3>
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
