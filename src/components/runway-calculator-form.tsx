
"use client";

import { useState, useEffect, useMemo, useRef }from "react";
import { useSearchParams } from 'next/navigation';
import { motion, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React from "react";
import { Download, TrendingUp, TrendingDown, PiggyBank, Loader2 } from "lucide-react";
import { RunwayChart } from "./runway-chart";
import jsPDF from "jspdf";

function AnimatedNumber({ value }: { value: number | null }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const spring = useSpring(0, {
        damping: 30,
        stiffness: 100,
        duration: 1,
    });
    const [displayValue, setDisplayValue] = useState("0.0");

    useEffect(() => {
        if (value !== null && isInView) {
            spring.set(value);
        } else if (value === null) {
            spring.set(0);
        }
    }, [spring, value, isInView]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            if (value === Infinity) {
                setDisplayValue("∞");
            } else if (value !== null) {
                setDisplayValue(latest.toFixed(1));
            } else {
                setDisplayValue("0.0");
            }
        });
    }, [spring, value]);

    if (value === null) return null;

    return <motion.p ref={ref}>{displayValue}</motion.p>;
}

export function RunwayCalculatorForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [cash, setCash] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const { runway, burn } = useMemo(() => {
    const cashAmount = parseFloat(cash);
    const revenueAmount = parseFloat(revenue);
    const expensesAmount = parseFloat(expenses);

    if (isNaN(cashAmount) || isNaN(revenueAmount) || isNaN(expensesAmount)) {
      setError("Please enter valid numbers for all fields.");
      return { runway: null, burn: null };
    }
    
    if (cashAmount < 0 || revenueAmount < 0 || expensesAmount < 0) {
        setError("Values cannot be negative.");
        return { runway: null, burn: null };
    }
    
    setError(null);
    
    const currentBurn = expensesAmount - revenueAmount;
    let runwayResult: number | null = null;
    
    if (currentBurn <= 0) {
        runwayResult = Infinity; // Profitable or breaking even
    } else {
        runwayResult = cashAmount / currentBurn;
    }

    return { runway: runwayResult, burn: currentBurn };
  }, [cash, revenue, expenses]);

  useEffect(() => {
    const queryCash = searchParams.get('cash');
    const queryRevenue = searchParams.get('revenue');
    const queryExpenses = searchParams.get('expenses');

    if (queryCash && queryRevenue && queryExpenses) {
        setCash(queryCash);
        setRevenue(queryRevenue);
        setExpenses(queryExpenses);
    } else {
        try {
          const savedData = localStorage.getItem("runwayCalculator");
          if (savedData) {
            const { cash, revenue, expenses } = JSON.parse(savedData);
            if (cash) setCash(cash);
            if (revenue) setRevenue(revenue);
            if (expenses) setExpenses(expenses);
          }
        } catch (error) {
          console.error("Failed to parse runway data from localStorage", error);
        }
    }
  }, [searchParams]);

  useEffect(() => {
    try {
        const dataToSave = { cash, revenue, expenses };
        localStorage.setItem("runwayCalculator", JSON.stringify(dataToSave));
    } catch (error) {
        console.error("Failed to save runway data to localStorage", error);
    }
  }, [cash, revenue, expenses]);
  
  const formatCurrency = (value: string | number | null) => {
    if (value === null) return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return `$${num.toLocaleString()}`;
  }
  
  const handleExport = async () => {
    if (runway === null || burn === null) return;
    
    setIsExporting(true);

    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        
        const drawHeader = () => {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(22);
          pdf.text("Reckoner Runway Report", pdfWidth / 2, margin + 5, { align: "center" });
          pdf.setLineWidth(0.5);
          pdf.setDrawColor("#cccccc");
          pdf.line(margin, margin + 12, pdfWidth - margin, margin + 12);
        };

        const drawFooter = () => {
            const pageHeight = pdf.internal.pageSize.getHeight();
            pdf.setLineWidth(0.5);
            pdf.setDrawColor("#cccccc");
            pdf.line(margin, pageHeight - 20, pdfWidth - margin, pageHeight - 20);
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor("#666666");
            const date = new Date().toLocaleDateString();
            pdf.text(`Generated on ${date} by Reckoner`, pdfWidth / 2, pageHeight - 15, { align: "center" });
            pdf.setTextColor("#000000");
        };

        const drawSectionTitle = (title: string, y: number) => {
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text(title, margin, y);
            return y + 10;
        };
        
        const drawKeyValueLine = (key: string, value: string, y: number) => {
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text(key, margin, y);
            pdf.setFont("helvetica", "bold");
            pdf.text(value, pdfWidth - margin, y, { align: "right" });
            return y + 8;
        };

        drawHeader();
        let y = margin + 30;

        // --- Financial Inputs Section ---
        y = drawSectionTitle("Financial Inputs", y);
        y = drawKeyValueLine("Current Cash Balance:", formatCurrency(cash), y);
        y = drawKeyValueLine("Monthly Revenue:", formatCurrency(revenue), y);
        y = drawKeyValueLine("Monthly Expenses:", formatCurrency(expenses), y);
        y += 4; // Extra space after section

        // --- Results Section ---
        y = drawSectionTitle("Calculated Results", y);
        const runwayText = runway === Infinity ? "Infinite (Profitable)" : `${runway.toFixed(1)} months`;
        y = drawKeyValueLine("Financial Runway:", runwayText, y);
        y = drawKeyValueLine("Net Monthly Burn:", formatCurrency(burn), y);
        y = drawKeyValueLine("Status:", burn > 0 ? 'Burning Cash' : 'Profitable', y);
        y += 2;
        
        pdf.setLineWidth(0.2);
        pdf.setDrawColor("#dddddd");
        pdf.line(margin, y, pdfWidth - margin, y);
        y += 8;

        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(11);
        pdf.setTextColor("#333333");
        const summaryText = pdf.splitTextToSize(formatRunway(runway), pdfWidth - margin * 2);
        pdf.text(summaryText, margin, y);
        pdf.setTextColor("#000000");

        drawFooter();
        pdf.save("runway-reckoner-report.pdf");
        
        toast({
            title: "Export Successful!",
            description: "Your runway report has been exported as a PDF.",
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Export Failed",
            description: "Something went wrong while exporting your results.",
        });
        console.error(error);
    } finally {
        setIsExporting(false);
    }
  }


  const formatRunway = (months: number | null): string => {
    if (months === null) return "";
    if (months === Infinity) return "You're profitable or breaking even. With current financials, your runway is effectively infinite. Well done!";
    if (months <= 0) return "You have 0 months of runway. Immediate action is required to reduce burn or secure new funding.";
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let result = "You have ";
    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (years > 0 && remainingMonths > 0.05) { 
        result += " and ";
    }
    if (remainingMonths > 0.05) {
        const fixedMonths = remainingMonths.toFixed(1);
        result += `${fixedMonths} month${parseFloat(fixedMonths) !== 1.0 ? 's' : ''}`;
    }
    result += " of runway remaining.";
    return result;
  }

  const getRunwayStatusColor = (months: number | null): string => {
    if (months === null) return "bg-secondary";
    if (months === Infinity || months > 18) return "bg-green-100 dark:bg-green-900/50";
    if (months > 12) return "bg-green-100 dark:bg-green-900/50";
    if (months >= 6) return "bg-yellow-100 dark:bg-yellow-900/50";
    return "bg-red-100 dark:bg-red-900/50";
  }

  const chartData = useMemo(() => {
      if (runway === null || burn === null || burn <= 0) return [];
      const cashAmount = parseFloat(cash);
      if (isNaN(cashAmount)) return [];
      
      const data = [];
      const monthsToProject = Math.min(Math.ceil(runway) + 2, 36);

      for (let i = 0; i <= monthsToProject; i++) {
          data.push({
              month: `M${i}`,
              cash: Math.max(0, cashAmount - burn * i),
          });
      }
      return data;

  }, [runway, cash, burn]);

  const hasInputs = cash !== "" && revenue !== "" && expenses !== "";

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cash" className="flex items-center"><PiggyBank className="mr-2 h-4 w-4" /> Current Cash Balance</Label>
          <Input 
            id="cash" 
            type="number" 
            placeholder="e.g., 500000" 
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="revenue" className="flex items-center"><TrendingUp className="mr-2 h-4 w-4" /> Monthly Revenue</Label>
          <Input 
            id="revenue" 
            type="number" 
            placeholder="e.g., 20000" 
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenses" className="flex items-center"><TrendingDown className="mr-2 h-4 w-4" /> Monthly Expenses</Label>
          <Input 
            id="expenses" 
            type="number" 
            placeholder="e.g., 70000" 
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required 
          />
        </div>
      </div>
      
      {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
      
      {hasInputs && runway !== null && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={resultsRef}>
            <Card id="results-card" className={cn("mt-4 transition-colors", getRunwayStatusColor(runway))}>
              <CardHeader>
                <CardTitle className="text-center text-sm md:text-base">Your Financial Runway</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 md:gap-3">
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold tracking-tight">
                        <AnimatedNumber value={runway} />
                    </div>
                    <p className="text-center text-xs text-muted-foreground">months</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="rounded-md bg-background/50 p-2">
                        <p className="font-semibold">Net Monthly Burn</p>
                        <p className="text-muted-foreground">
                          {burn !== null ? `$${burn.toLocaleString()}` : 'N/A'}
                        </p>
                    </div>
                    <div className="rounded-md bg-background/50 p-2">
                        <p className="font-semibold">Status</p>
                        <p className="text-muted-foreground">
                          {burn !== null ? (burn > 0 ? 'Burning Cash' : 'Profitable') : 'N/A'}
                        </p>
                    </div>
                </div>

                <p className="text-center w-full text-xs md:text-sm">{formatRunway(runway)}</p>
                
                {chartData.length > 0 && (
                  <div id="chart-container">
                    <h3 className="text-center text-xs font-semibold mb-2">Cash Burn Projection</h3>
                    <div className="h-20 md:h-28">
                      <RunwayChart data={chartData} />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport} className="w-full" disabled={isExporting}>
                      {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      {isExporting ? 'Exporting...' : 'Export as PDF'}
                  </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
