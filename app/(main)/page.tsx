import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Bot, Dot, FileText, Lightbulb, List, Pin, Target} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";


export default async function Home() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in");

  return (
    <main>
      <Card className={"mx-auto max-w-lg mt-8"}>
        <CardHeader>
          <h1
            className={"mx-auto text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter text-center"}>
            What's on your mind?
          </h1>
        </CardHeader>
        <CardContent>
          <form action="">
            <Textarea cols={20} placeholder={"Type your thought here."} className={"placeholder:text-gray-400 border-2 border-inherit"}></Textarea>
            <Button type="submit" className={"mt-4 w-full"}>Organize thought</Button>
          </form>
        </CardContent>
      </Card>
      <Card className={"mx-auto max-w-lg mt-8"}>
        <CardHeader className={"flex justify-between items-center"}>
          <h2 className={"text-secondary leading-tighter text-2xl font-light tracking-tight text-balance lg:leading-[1.1] xl:text-3xl xl:tracking-tighter flex items-center gap-1"}><Bot strokeWidth={1} size={30} className={"text-primary"}/>  AI Reflection</h2>
          <form action="">
            <Button type="submit" variant={"outline"}>Save to Dashboard</Button>
          </form>
        </CardHeader>
        <CardContent className={"space-y-4"}>
          <h3 className={"text-secondary leading-tighter text-lg font-light tracking-tight text-balance lg:leading-[1.1]s xl:tracking-tighter flex items-center gap-1"}>
            <FileText strokeWidth={1} size={20} className={"text-primary"}/>
            Summary
          </h3>
          <p className={"tracking-wider text-sm font-light"}> - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aspernatur commodi culpa deleniti dolorem ea esse facere harum in iste laudantium praesentium quia quidem quos reiciendis rem, suscipit, tempore?</p>
          <h3 className={"text-secondary leading-tighter text-lg font-light tracking-tight text-balance lg:leading-[1.1]s xl:tracking-tighter flex items-center gap-1"}>
            <Lightbulb strokeWidth={1} size={20} className={"text-primary"}/>
            Insight
          </h3>
          <p className={"tracking-wider text-sm font-light"}> - Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <h3 className={"text-secondary leading-tighter text-lg font-light tracking-tight text-balance lg:leading-[1.1]s xl:tracking-tighter flex items-center gap-1"}><Target strokeWidth={1} size={20} className={"text-primary"} /> Suggested goal</h3>
          <p className={"tracking-wider text-sm font-light"}> - Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <h3 className={"text-secondary leading-tighter text-lg font-light tracking-tight text-balance lg:leading-[1.1]s xl:tracking-tighter"}>Themes</h3>
          <ul className={"flex"}>
            - &nbsp;
            <li>[ <span className={"text-primary tracking-wider text-sm"}>Fitness</span> ],&nbsp;</li>
            <li>[ <span className={"text-primary tracking-wider text-sm"}>Health</span> ],&nbsp;</li>
            <li>[ <span className={"text-primary tracking-wider text-sm"}>Finance</span> ],&nbsp;</li>
          </ul>
        </CardContent>
        <CardFooter className={"flex flex-col items-start space-y-4 font-light tracking-wide"}>
          <h3 className={"text-secondary leading-tighter text-lg font-light tracking-tight text-balance lg:leading-[1.1]s xl:tracking-tighter flex items-center gap-1"}>
             <List strokeWidth={1} size={20} className={"text-primary"} /> Suggestions
          </h3>
          <ul className={"w-full list-decimal"}>
            <li className={"flex justify-between items-center"}>
              <p className={"flex gap-2 items-center"}><Dot /> Make an appointment</p>
              <form action="">
                <Button type="submit" variant={"outline"} size={"sm"} className={""}><Pin/></Button>
              </form>
            </li>
            <li className={"flex justify-between"}>
              <p className={"flex gap-2 items-center"}><Dot /> Make an appointment</p>
              <form action="">
                <Button type="submit" variant={"outline"} size={"sm"} className={""}><Pin/></Button>
              </form>
            </li>
            <li className={"flex justify-between"}>
              <p className={"flex gap-2 items-center"}><Dot /> Make an appointment</p>
              <form action="">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" variant={"outline"} size={"sm"} className={""}><Pin/></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save to Kanban</p>
                  </TooltipContent>
                </Tooltip>
              </form>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </main>
  );
}
