import { redirect } from "next/navigation";

import ThoughtsChartArea from "@/app/(main)/insights/thoughts-chart-area";
import ThemesBarChart from "@/app/(main)/insights/themes-bar-chart";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { thoughtsCreatedPerDay, topFiveThemes } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function Page() {
  const session = await auth();

  if (!session.user) redirect("/sign-in");

  const chartData = await thoughtsCreatedPerDay(session.user.id);
  const barChartData = await topFiveThemes(session.user.id);
  console.log(barChartData);

  return (
    <div className={"bg-card"}>
      <Card
        className={
          "rounded-none border-none px-4 py-7 w-full max-w-7xl mx-auto"
        }
      >
        <CardHeader>
          <CardTitle>
            <h2 className={"text-3xl"}>Thought Activity</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className={"gap-4 flex flex-wrap"}>
          {"error" in chartData ? (
            <p>{chartData.error}</p>
          ) : (
            <ThoughtsChartArea
              chartData={chartData}
              className={"flex-grow-5 flex-[400px]"}
            />
          )}
          {"error" in barChartData ? (
            <p>{barChartData.error}</p>
          ) : (
            <ThemesBarChart
              barChartData={barChartData}
              className={"grow flex-[400px]"}
            />
          )}
        </CardContent>
      </Card>

      <Card
        className={
          "rounded-none border-none px-4 py-7 w-full max-w-7xl mx-auto"
        }
      >
        <CardHeader>
          <CardTitle>
            <h2 className={"text-3xl"}>Goal Progress</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className={"gap-4 flex flex-wrap"}>
          <Card>
            <CardTitle className={"font-normal text-center"}>
              Tasks Created
            </CardTitle>
            <Separator orientation={"horizontal"} />
            <CardContent>
              <h4 className={"text-9xl text-[#F08C00] font-black"}>28</h4>
            </CardContent>
          </Card>
          <Card>
            <CardTitle className={"text-center"}>
              <h4 className={"font-normal text-center"}>Tasks Completed</h4>
            </CardTitle>
            <Separator orientation={"horizontal"} />
            <CardContent>
              <h4 className={"text-9xl text-green-600 font-black"}>18</h4>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card
        className={
          "border-none px-4 py-7 w-full mx-auto rounded-none max-w-7xl"
        }
      >
        <CardHeader>
          <CardTitle>
            <h4 className={"text-3xl"}>Activity Heatmap</h4>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={
            "grid grid-cols-20 gap-1 justify-center w-max border py-6 rounded-[inherit]"
          }
        >
          {Array.from({ length: 100 }).map((value, index) => (
            <div key={index} className={"bg-green-300 w-4 h-4 rounded"}></div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;

