"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, DollarSign, Percent, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RunwayCalculatorFormProps {
    cash: string;
    revenue: string;
    expenses: string;
    revenueGrowth: string;
    expenseGrowth: string;
    funding: string;
    teamSize: string;
    setCash: (value: string) => void;
    setRevenue: (value: string) => void;
    setExpenses: (value: string) => void;
    setRevenueGrowth: (value: string) => void;
    setExpenseGrowth: (value: string) => void;
    setFunding: (value: string) => void;
    setTeamSize: (value: string) => void;
    error: string | null;
}

export function RunwayCalculatorForm({ 
    cash, revenue, expenses, revenueGrowth, expenseGrowth, funding, teamSize,
    setCash, setRevenue, setExpenses, setRevenueGrowth, setExpenseGrowth, setFunding, setTeamSize, error 
}: RunwayCalculatorFormProps) {
  return (
    <TooltipProvider delayDuration={200}>
    <div className="space-y-1.5">
      <div className="space-y-1.5">
        <Label htmlFor="cash" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          Cash Balance
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex">
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs bg-popover border">
              <p className="text-xs">Total money in your bank accounts right now. This is how much you have to spend.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
          <Input 
            id="cash" 
            type="number" 
            placeholder="500000" 
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="pl-7 text-sm h-10"
            min="0"
            step="1000"
            required 
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="funding" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-purple-600" />
          Expected Funding (Optional)
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex">
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs bg-popover border">
              <p className="text-xs">Money you expect to receive soon (investment, grant, or loan). This will be added to your cash.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
          <Input 
            id="funding" 
            type="number" 
            placeholder="0" 
            value={funding}
            onChange={(e) => setFunding(e.target.value)}
            className="pl-7 text-sm h-10"
            min="0"
            step="10000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="space-y-1.5">
          <Label htmlFor="revenue" className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Revenue
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button type="button" className="inline-flex">
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs bg-popover border">
                <p className="text-xs">Money coming in each month from sales, subscriptions, or services.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
            <Input 
              id="revenue" 
              type="number" 
              placeholder="20000" 
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="pl-7 text-sm h-10"
              min="0"
              step="1000"
              required 
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="expenses" className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            Expenses
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button type="button" className="inline-flex">
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs bg-popover border">
                <p className="text-xs">Money going out each month for salaries, rent, software, and other costs.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
            <Input 
              id="expenses" 
              type="number" 
              placeholder="70000" 
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="pl-7 text-sm h-10"
              min="0"
              step="1000"
              required 
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Percent className="h-4 w-4" />
          Growth Projections (Optional)
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex">
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs bg-popover border">
              <p className="text-xs">How much your revenue and expenses will grow each month. Leave at 0 if staying the same.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        
        <div className="grid grid-cols-2 gap-1.5">
          <div className="space-y-1.5">
            <Label htmlFor="revenueGrowth" className="text-xs text-muted-foreground">
              Revenue Growth %/month
            </Label>
            <div className="relative">
              <Input 
                id="revenueGrowth" 
                type="number" 
                placeholder="5" 
                value={revenueGrowth}
                onChange={(e) => setRevenueGrowth(e.target.value)}
                className="pr-6 text-sm h-9"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="expenseGrowth" className="text-xs text-muted-foreground">
              Expense Growth %/month
            </Label>
            <div className="relative">
              <Input 
                id="expenseGrowth" 
                type="number" 
                placeholder="2" 
                value={expenseGrowth}
                onChange={(e) => setExpenseGrowth(e.target.value)}
                className="pr-6 text-sm h-9"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="teamSize" className="text-sm font-medium flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-indigo-600" />
          Team Size (Optional)
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex">
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs bg-popover border">
              <p className="text-xs">Number of people on your team. Helps validate if your expenses match your team size.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <Input 
          id="teamSize" 
          type="number" 
          placeholder="5" 
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="text-sm h-10"
          min="0"
          step="1"
        />
        {teamSize && expenses && (
          <p className="text-xs text-muted-foreground mt-1">
            ~${(parseFloat(expenses.replace(/,/g, '') || '0') / Math.max(1, parseFloat(teamSize))).toLocaleString(undefined, {maximumFractionDigits: 0})}/person/month
          </p>
        )}
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
    </TooltipProvider>
  );
}