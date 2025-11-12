import { redirect } from "next/navigation";

import ThoughtsChartArea from "@/app/(main)/insights/thoughts-chart-area";
import ThemesBarChart from "@/app/(main)/insights/themes-bar-chart";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getActivity,
  getTaskStats,
  thoughtsCreatedPerDay,
  topFiveThemes,
} from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter, formatDate } from "@/lib/utils";

async function Page() {
  const session = await auth();

  if (!session.user) redirect("/sign-in");
  const userId = session.user.id;

  const [chartData, barChartData, taskStats, activity] = await Promise.all([
    thoughtsCreatedPerDay(userId),
    topFiveThemes(userId),
    getTaskStats(userId),
    getActivity(userId),
  ]);

  function colorWeights(count: number): string {
    switch (count) {
      case 0:
        return "";
      case 1:
        return "bg-green-50";
      case 2:
        return "bg-green-100";
      case 3:
        return "bg-green-200";
      case 4:
        return "bg-green-300";
      case 5:
        return "bg-green-400";
      default:
        return "bg-green-500";
    }
  }

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
        {!("error" in taskStats) ? (
          <CardContent className={"gap-4 flex flex-wrap"}>
            <Card>
              <CardTitle className={"font-normal text-center"}>
                Tasks Created
              </CardTitle>
              <Separator orientation={"horizontal"} />
              <CardContent>
                <h4 className={"text-9xl text-[#F08C00] font-black"}>
                  {taskStats.createdTasks}
                </h4>
              </CardContent>
            </Card>
            <Card>
              <CardTitle className={"text-center"}>
                <h4 className={"font-normal text-center"}>Tasks Completed</h4>
              </CardTitle>
              <Separator orientation={"horizontal"} />
              <CardContent>
                <h4 className={"text-9xl text-green-600 font-black"}>
                  {taskStats.completedTasks}
                </h4>
              </CardContent>
            </Card>
          </CardContent>
        ) : (
          <p className="text-destructive">{taskStats.error}</p>
        )}
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
          {"error" in activity ? (
            <p>{activity.error}</p>
          ) : (
            activity.map((value) => {
              const colorWeight = colorWeights(value.count);
              return (
                <Tooltip>
                  <TooltipTrigger key={value.count}>
                    <div
                      key={value.count}
                      className={`${colorWeight} border w-4 h-4 rounded`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatDate(value.date)} - Thoughts Created: {value.count}
                  </TooltipContent>
                </Tooltip>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
