"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a custom label"

const chartConfig = {
  purchaseCount: {
    label: "Quantity: ",
  }
} satisfies ChartConfig

export default function MyChart({chartData} : {chartData: any}) {
  const colorBoard = ["#2662d9", "#e23670", "#e88c30", "#af57db", "#2eb88a"];
  const updatedChartData = chartData?.map((item: any, index: any) => ({
    ...item,
    fill: colorBoard[index % colorBoard.length],
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Top 5 best seller</CardTitle>
        <CardDescription>August 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={updatedChartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="productTitle"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="purchaseCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line"/>}
            />
            <Bar
              dataKey="purchaseCount"
              layout="vertical"
              fill="#34b7eb"
              radius={4}
            >
              <LabelList
                dataKey="productTitle"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="purchaseCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
