
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
import { useTheme } from "next-themes";

interface RunwayChartProps {
    data: { month: string; cash: number }[];
}

export function RunwayChart({ data }: RunwayChartProps) {
  const { theme } = useTheme();
  
  const chartConfig = {
    cash: {
      label: "Cash Balance",
      color: theme === 'dark' ? "hsl(var(--primary))" : "hsl(var(--primary))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
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
