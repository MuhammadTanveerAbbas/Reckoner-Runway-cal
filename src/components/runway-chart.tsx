
"use client"

import { TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface RunwayChartProps {
    data: { month: string; cash: number }[];
}

export function RunwayChart({ data }: RunwayChartProps) {
  const chartConfig = {
    cash: {
      label: "Cash Balance",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={2}
          tick={{ fontSize: 10 }}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={2}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent 
            indicator="dot" 
            formatter={(value, name, props) => (
                <div className="flex flex-col">
                    <span>{`Month: ${props.payload.month}`}</span>
                    <span>{`Cash: $${Number(value).toLocaleString()}`}</span>
                </div>
            )}
            />}
        />
        <defs>
          <linearGradient id="fillCash" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-cash)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-cash)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="cash"
          type="natural"
          fill="url(#fillCash)"
          stroke="var(--color-cash)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
