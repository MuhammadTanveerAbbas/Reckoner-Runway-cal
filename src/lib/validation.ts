import { VALIDATION } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  warnings: string[];
}

export const validateFinancialInputs = (
  cash: string,
  revenue: string,
  expenses: string,
  revenueGrowth: string,
  expenseGrowth: string
): ValidationResult => {
  const warnings: string[] = [];
  
  const cashAmount = parseFloat(cash) || 0;
  const revenueAmount = parseFloat(revenue) || 0;
  const expensesAmount = parseFloat(expenses) || 0;
  const revenueGrowthRate = parseFloat(revenueGrowth) || 0;
  const expenseGrowthRate = parseFloat(expenseGrowth) || 0;

  if (!cash || !revenue || !expenses) {
    return { isValid: false, error: null, warnings: [] };
  }

  if (cashAmount < VALIDATION.MIN_CASH || revenueAmount < VALIDATION.MIN_REVENUE || expensesAmount < VALIDATION.MIN_EXPENSES) {
    return { isValid: false, error: "Financial values cannot be negative.", warnings: [] };
  }

  if (cashAmount === 0) {
    return { isValid: false, error: "Cash balance must be greater than zero.", warnings: [] };
  }

  if (revenueGrowthRate > 50) {
    warnings.push("Revenue growth over 50% monthly is extremely optimistic.");
  }
  
  if (expenseGrowthRate > 30) {
    warnings.push("Expense growth over 30% monthly may indicate scaling issues.");
  }
  
  if (revenueAmount > expensesAmount * 2) {
    warnings.push("Very high profit margins - ensure all expenses are included.");
  }
  
  if (expensesAmount > cashAmount) {
    warnings.push("Monthly expenses exceed total cash - immediate funding needed.");
  }

  return { isValid: true, error: null, warnings };
};
