"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis
} from "recharts"

import { cn } from "@/lib/utils";
import { BarChartData } from "@/lib/defintions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  theme: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ThemesBarChart({ className, barChartData }: { className?: string, barChartData: BarChartData | undefined }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Top 5 Themes</CardTitle>
        <CardDescription>Showing the top 5 themes related to your thoughts!</CardDescription>
      </CardHeader>
      <CardContent>
        {barChartData && <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={barChartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="theme"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel/>}
            />
            <Bar dataKey="count" fill="var(--color-theme)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  )
}
