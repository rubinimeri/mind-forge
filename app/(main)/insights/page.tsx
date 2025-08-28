import {auth} from "@/auth";
import {redirect} from "next/navigation";
import ThoughtsChartArea from "@/app/(main)/insights/thoughts-chart-area";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import ThemesBarChart from "@/app/(main)/insights/themes-bar-chart";

async function Page() {
  const session = await auth();

  if (!session.user) redirect('/sign-in')
  return (
    <div className={"flex justify-center"}>
      <Card className={"rounded-none border-none px-4 py-7 w-full max-w-7xl"}>
        <CardHeader className="">
          <CardTitle><h2 className={"text-3xl"}>Thought Activity</h2></CardTitle>
        </CardHeader>
        <div className={"gap-4 flex flex-wrap"}>
          <ThoughtsChartArea className={"flex-grow-5 flex-[400px]"}/>
          <ThemesBarChart className={"grow flex-[400px]"}/>
        </div>
      </Card>
    </div>
  );
}

export default Page;