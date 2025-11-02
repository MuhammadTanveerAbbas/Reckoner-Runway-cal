import { useMemo } from 'react';
import { RUNWAY_THRESHOLDS, GROWTH_LIMITS } from '@/lib/constants';
import { validateFinancialInputs } from '@/lib/validation';

export interface MonthlyData {
  month: number;
  cash: number;
  revenue: number;
  expenses: number;
  burn: number;
  runwayRemaining: number;
}

export interface RunwayCalculation {
  runway: number | null;
  burn: number | null;
  runwayEndDate: Date | null;
  monthlyData: MonthlyData[];
  breakEvenMonth: number | null;
  profitableMonth: number | null;
  isValid: boolean;
  error: string | null;
  warnings: string[];
}

export const useRunwayCalculator = (
  cash: string,
  revenue: string,
  expenses: string,
  revenueGrowth: string,
  expenseGrowth: string
): RunwayCalculation => {
  return useMemo(() => {
    const validation = validateFinancialInputs(cash, revenue, expenses, revenueGrowth, expenseGrowth);
    
    if (!validation.isValid) {
      return {
        runway: null,
        burn: null,
        runwayEndDate: null,
        monthlyData: [],
        breakEvenMonth: null,
        profitableMonth: null,
        isValid: false,
        error: validation.error,
        warnings: validation.warnings,
      };
    }

    const cashAmount = parseFloat(cash);
    const revenueAmount = parseFloat(revenue);
    const expensesAmount = parseFloat(expenses);
    const revenueGrowthRate = parseFloat(revenueGrowth) / 100 || 0;
    const expenseGrowthRate = parseFloat(expenseGrowth) / 100 || 0;

    let currentCash = cashAmount;
    let currentRevenue = revenueAmount;
    let currentExpenses = expensesAmount;
    let months = 0;
    let breakEvenMonth: number | null = null;
    let profitableMonth: number | null = null;

    const monthlyData: MonthlyData[] = [];
    const initialBurn = currentExpenses - currentRevenue;

    monthlyData.push({
      month: 0,
      cash: currentCash,
      revenue: currentRevenue,
      expenses: currentExpenses,
      burn: initialBurn,
      runwayRemaining: initialBurn > 0 ? currentCash / initialBurn : Infinity,
    });

    if (initialBurn <= 0) {
      return {
        runway: Infinity,
        burn: initialBurn,
        runwayEndDate: null,
        monthlyData,
        breakEvenMonth: 0,
        profitableMonth: 0,
        isValid: true,
        error: null,
        warnings: validation.warnings,
      };
    }

    while (currentCash > 0 && months < GROWTH_LIMITS.MAX_MONTHS) {
      months++;
      currentRevenue *= 1 + revenueGrowthRate;
      currentExpenses *= 1 + expenseGrowthRate;

      const monthlyBurn = currentExpenses - currentRevenue;
      currentCash -= monthlyBurn;

      if (breakEvenMonth === null && monthlyBurn <= 0) {
        breakEvenMonth = months;
      }
      if (profitableMonth === null && monthlyBurn < 0) {
        profitableMonth = months;
      }

      const runwayRemaining = monthlyBurn > 0 ? Math.max(0, currentCash / monthlyBurn) : Infinity;

      monthlyData.push({
        month: months,
        cash: Math.max(0, currentCash),
        revenue: currentRevenue,
        expenses: currentExpenses,
        burn: monthlyBurn,
        runwayRemaining,
      });

      if (monthlyBurn < 0 && currentCash > 0) {
        return {
          runway: Infinity,
          burn: initialBurn,
          runwayEndDate: null,
          monthlyData,
          breakEvenMonth,
          profitableMonth: months,
          isValid: true,
          error: null,
          warnings: validation.warnings,
        };
      }
    }

    const runwayEndDate = new Date();
    runwayEndDate.setMonth(runwayEndDate.getMonth() + months);

    return {
      runway: months,
      burn: initialBurn,
      runwayEndDate,
      monthlyData,
      breakEvenMonth,
      profitableMonth,
      isValid: true,
      error: null,
      warnings: validation.warnings,
    };
  }, [cash, revenue, expenses, revenueGrowth, expenseGrowth]);
};
