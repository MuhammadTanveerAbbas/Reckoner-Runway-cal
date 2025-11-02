"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React from "react";
import { Download, Loader2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, DollarSign } from "lucide-react";
import { RunwayChart } from "./runway-chart";
import jsPDF from "jspdf";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { RUNWAY_THRESHOLDS, MESSAGES } from "@/lib/constants";
import { exportToCSV } from "@/lib/export";
import { FileSpreadsheet } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: number | null; suffix?: string }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const spring = useSpring(0, { damping: 30, stiffness: 100 });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (value !== null && isInView) {
            spring.set(value);
        }
    }, [spring, value, isInView]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            if (value === Infinity) {
                setDisplayValue("∞");
            } else if (value !== null) {
                setDisplayValue(Math.round(latest).toString());
            }
        });
    }, [spring, value]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
}

interface RunwayResultsProps {
    runway: number | null;
    burn: number | null;
    runwayEndDate: Date | null;
    monthlyData: any[];
    cash: string;
    revenue: string;
    expenses: string;
    breakEvenMonth?: number | null;
    profitableMonth?: number | null;
}

export function RunwayResults({ 
    runway, burn, runwayEndDate, monthlyData, cash, revenue, expenses, 
    breakEvenMonth, profitableMonth 
}: RunwayResultsProps) {
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const chartData = useMemo(() => {
        if (!monthlyData?.length) return [];
        return monthlyData.slice(0, Math.min(24, monthlyData.length)).map(d => ({ 
            month: `M${d.month}`, 
            cash: Math.max(0, d.cash) 
        }));
    }, [monthlyData]);



    const getRunwayStatus = () => {
        if (runway === null) return { status: 'unknown', color: 'secondary', icon: AlertTriangle };
        if (runway === Infinity) return { status: 'profitable', color: 'green', icon: CheckCircle };
        if (runway <= RUNWAY_THRESHOLDS.CRITICAL) return { status: 'critical', color: 'red', icon: AlertTriangle };
        if (runway <= RUNWAY_THRESHOLDS.WARNING) return { status: 'warning', color: 'yellow', icon: AlertTriangle };
        if (runway <= RUNWAY_THRESHOLDS.CAUTION) return { status: 'caution', color: 'orange', icon: TrendingDown };
        return { status: 'healthy', color: 'green', icon: TrendingUp };
    };

    const getStatusMessage = () => {
        if (runway === null) return "Enter your data to calculate runway";
        if (runway === Infinity) return MESSAGES.INFINITE_RUNWAY;
        if (runway <= RUNWAY_THRESHOLDS.CRITICAL) return MESSAGES.CRITICAL;
        if (runway <= RUNWAY_THRESHOLDS.WARNING) return MESSAGES.WARNING;
        if (runway <= RUNWAY_THRESHOLDS.CAUTION) return MESSAGES.CAUTION;
        return MESSAGES.HEALTHY;
    };

    const getInsights = () => {
        const insights = [];
        const burnRate = parseFloat(burn?.toString() || '0');
        const monthlyRevenue = parseFloat(revenue.replace(/,/g, '') || '0');
        const monthlyExpenses = parseFloat(expenses.replace(/,/g, '') || '0');
        
        if (burnRate > 0) {
            const burnToRevenueRatio = burnRate / Math.max(monthlyRevenue, 1);
            if (burnToRevenueRatio > 2) {
                insights.push("High burn-to-revenue ratio suggests need for cost optimization");
            }
        }
        
        if (breakEvenMonth && breakEvenMonth <= 12) {
            insights.push(`Break-even projected in ${breakEvenMonth} months`);
        }
        
        if (profitableMonth && profitableMonth <= 18) {
            insights.push(`Profitability projected in ${profitableMonth} months`);
        }
        
        return insights;
    };

    const handleExport = async () => {
        if (runway === null || burn === null) return;
        setIsExporting(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const margin = 20;
            let y = margin;

            // Header
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(24);
            pdf.text("Financial Runway Report", margin, y);
            y += 15;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y);
            y += 20;

            // Key Metrics
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("Key Metrics", margin, y);
            y += 10;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            const runwayText = runway === Infinity ? "Infinite (Profitable)" : `${runway.toFixed(1)} months`;
            pdf.text(`Runway: ${runwayText}`, margin, y);
            y += 8;
            pdf.text(`Monthly Burn: ${formatCurrency(burn)}`, margin, y);
            y += 8;
            pdf.text(`Status: ${getStatusMessage()}`, margin, y);
            y += 15;

            // Financial Inputs
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("Financial Inputs", margin, y);
            y += 10;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text(`Cash Balance: ${formatCurrency(cash)}`, margin, y);
            y += 8;
            pdf.text(`Monthly Revenue: ${formatCurrency(revenue)}`, margin, y);
            y += 8;
            pdf.text(`Monthly Expenses: ${formatCurrency(expenses)}`, margin, y);

            pdf.save("runway-report.pdf");
            
            toast({
                title: "Report Exported",
                description: "Your runway report has been saved as PDF.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Export Failed",
                description: "Could not export the report.",
            });
        } finally {
            setIsExporting(false);
        }
    };

    const status = getRunwayStatus();
    const StatusIcon = status.icon;
    const insights = getInsights();
    
    const getRecommendations = () => {
        const recommendations = [];
        const burnRate = parseFloat(burn?.toString() || '0');
        const monthlyRevenue = parseFloat(revenue.replace(/,/g, '') || '0');
        const cashBalance = parseFloat(cash.replace(/,/g, '') || '0');
        
        if (runway !== null && runway !== Infinity) {
            if (runway <= 3) {
                recommendations.push({ type: 'critical', text: '🚨 Secure bridge funding or cut 50% expenses now' });
            } else if (runway <= 6) {
                recommendations.push({ type: 'warning', text: '⚠️ Start fundraising - typical process takes 3-6 months' });
                recommendations.push({ type: 'warning', text: `💡 Reduce burn by $${(burnRate * 0.3).toLocaleString()}/mo to extend runway` });
            } else if (runway <= 12) {
                recommendations.push({ type: 'info', text: '📅 Plan fundraising next quarter for 12+ months runway' });
            }
            
            if (monthlyRevenue > 0 && burnRate > 0) {
                const monthsToBreakEven = burnRate / (monthlyRevenue * 0.1);
                if (monthsToBreakEven < runway) {
                    recommendations.push({ type: 'success', text: `🎯 10% monthly growth = break-even in ${monthsToBreakEven.toFixed(0)}m` });
                }
            }
            
            const targetCash = burnRate * 18;
            if (cashBalance < targetCash) {
                recommendations.push({ type: 'info', text: `💰 Target: $${targetCash.toLocaleString()} (18m runway)` });
            }
        }
        
        return recommendations;
    };
    
    const recommendations = getRecommendations();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
        >
            {/* Main Runway Display */}
            <Card className={cn(
                "text-center transition-colors p-2",
                status.color === 'green' && "bg-green-50 border-green-200 dark:bg-green-950/20",
                status.color === 'yellow' && "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20",
                status.color === 'orange' && "bg-orange-50 border-orange-200 dark:bg-orange-950/20",
                status.color === 'red' && "bg-red-50 border-red-200 dark:bg-red-950/20"
            )}>
                <div className="flex items-center justify-center gap-1 mb-1">
                    <StatusIcon className={cn(
                        "h-3 w-3",
                        status.color === 'green' && "text-green-600",
                        status.color === 'yellow' && "text-yellow-600",
                        status.color === 'orange' && "text-orange-600",
                        status.color === 'red' && "text-red-600"
                    )} />
                    <Badge variant={status.color === 'green' ? 'default' : 'destructive'} className="text-xs px-1.5 py-0">
                        {status.status.toUpperCase()}
                    </Badge>
                </div>
                
                <div className="text-xl md:text-2xl font-bold mb-0.5">
                    <AnimatedNumber value={runway} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                    {runway === Infinity ? "Infinite Runway" : "Months Left"}
                </p>
                
                <p className="text-xs font-medium leading-tight">{getStatusMessage()}</p>
            </Card>

            {/* Enhanced Metrics Grid */}
            <div className="grid grid-cols-2 gap-1.5">
                <Card className="p-1.5">
                    <div className="flex items-center gap-0.5 mb-0.5">
                        <TrendingDown className="h-2.5 w-2.5 text-red-500" />
                        <span className="text-xs font-medium">Burn Rate</span>
                    </div>
                    <p className="text-xs font-bold">{formatCurrency(burn)}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                </Card>
                
                <Card className="p-1.5">
                    <div className="flex items-center gap-0.5 mb-0.5">
                        <Calendar className="h-2.5 w-2.5 text-purple-500" />
                        <span className="text-xs font-medium">End Date</span>
                    </div>
                    <p className="text-xs font-bold">
                        {runway === Infinity ? '∞' : formatDate(runwayEndDate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {breakEvenMonth ? `Break-even: M${breakEvenMonth}` : 'No break-even'}
                    </p>
                </Card>
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-2 gap-1.5">
                <Card className="p-1.5">
                    <div className="flex items-center gap-0.5 mb-0.5">
                        <DollarSign className="h-2.5 w-2.5 text-green-500" />
                        <span className="text-xs font-medium">Cash Left</span>
                    </div>
                    <p className="text-xs font-bold">{formatCurrency(cash)}</p>
                    <p className="text-xs text-muted-foreground">
                        {runway !== null && runway !== Infinity ? `${(parseFloat(cash.replace(/,/g, '')) / Math.abs(parseFloat(burn?.toString() || '1'))).toFixed(1)}x burn` : 'Current'}
                    </p>
                </Card>
                
                <Card className="p-1.5">
                    <div className="flex items-center gap-0.5 mb-0.5">
                        <TrendingUp className="h-2.5 w-2.5 text-blue-500" />
                        <span className="text-xs font-medium">Efficiency</span>
                    </div>
                    <p className="text-xs font-bold">
                        {(() => {
                            const rev = parseFloat(revenue.replace(/,/g, '') || '0');
                            const exp = parseFloat(expenses.replace(/,/g, '') || '1');
                            return `${((rev / exp) * 100).toFixed(0)}%`;
                        })()} 
                    </p>
                    <p className="text-xs text-muted-foreground">Revenue/Expense</p>
                </Card>
            </div>

            {/* Cash Flow Chart */}
            {chartData.length > 0 && (
                <Card className="p-3">
                    <h3 className="text-sm font-medium mb-2 text-center">Cash Flow Projection</h3>
                    <div className="h-48">
                        <RunwayChart data={chartData} />
                    </div>
                </Card>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <Card className="p-2">
                    <h3 className="text-xs font-medium mb-1.5 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Action Items
                    </h3>
                    <div className="space-y-1">
                        {recommendations.map((rec, idx) => (
                            <div key={idx} className={cn(
                                "text-xs p-1.5 rounded leading-tight",
                                rec.type === 'critical' && "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200",
                                rec.type === 'warning' && "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200",
                                rec.type === 'info' && "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
                                rec.type === 'success' && "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                            )}>
                                {rec.text}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-1.5">
                <Button 
                    onClick={handleExport} 
                    disabled={isExporting || runway === null}
                    className="h-7 text-xs"
                    variant="outline"
                    size="sm"
                >
                    {isExporting ? (
                        <><Loader2 className="mr-1 h-2.5 w-2.5 animate-spin" />PDF</>
                    ) : (
                        <><Download className="mr-1 h-2.5 w-2.5" />PDF</>  
                    )}
                </Button>
                
                <Button 
                    onClick={() => {
                        const csvData = monthlyData.map(d => ({
                            Month: d.month,
                            Cash: d.cash.toFixed(2),
                            Revenue: d.revenue.toFixed(2),
                            Expenses: d.expenses.toFixed(2),
                            Burn: d.burn.toFixed(2)
                        }));
                        exportToCSV(csvData, 'runway-data');
                        toast({ title: "CSV exported!", description: "Your data has been downloaded." });
                    }}
                    disabled={!monthlyData.length}
                    className="h-7 text-xs"
                    variant="outline"
                    size="sm"
                >
                    <FileSpreadsheet className="mr-1 h-2.5 w-2.5" />CSV
                </Button>
                
                <Button 
                    onClick={() => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('cash', cash);
                        url.searchParams.set('revenue', revenue);
                        url.searchParams.set('expenses', expenses);
                        navigator.clipboard.writeText(url.toString());
                        toast({ title: "Link copied!", description: "Share this calculation with your team." });
                    }}
                    disabled={!cash || !revenue || !expenses}
                    className="h-7 text-xs"
                    variant="outline"
                    size="sm"
                >
                    <TrendingUp className="mr-1 h-2.5 w-2.5" />Share
                </Button>
            </div>
        </motion.div>
    );
}
