"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis
} from "recharts"

import { cn } from "@/lib/utils";
import { AreaChartData } from "@/lib/defintions";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Thoughts",
  },
} satisfies ChartConfig

export default function ThoughtsChartArea({ className, chartData }: { className?: string, chartData: AreaChartData | undefined }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Thoughts Captured</CardTitle>
          <CardDescription>
            Showing total thoughts captured per day.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData && <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  label={"Thoughts Captured"}
                  indicator="dot"
                  hideLabel={true}
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillChart)"
              stroke="var(--chart-2)"
              stackId="a"
              baseValue={chartData[0].count}
            />
            <ChartLegend content={<ChartLegendContent/>}/>
          </AreaChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  )
}
