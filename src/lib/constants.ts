export const RUNWAY_THRESHOLDS = {
  CRITICAL: 3,
  WARNING: 6,
  CAUTION: 12,
} as const;

export const GROWTH_LIMITS = {
  REVENUE_WARNING: 50,
  EXPENSE_WARNING: 30,
  MAX_MONTHS: 240,
} as const;

export const VALIDATION = {
  MIN_CASH: 0,
  MIN_REVENUE: 0,
  MIN_EXPENSES: 0,
  MAX_GROWTH_RATE: 100,
} as const;

export const MESSAGES = {
  INFINITE_RUNWAY: "🎉 You're profitable! Your runway is infinite.",
  CRITICAL: "⚠️ Critical: Secure funding immediately",
  WARNING: "⚠️ Warning: Start fundraising now",
  CAUTION: "⚠️ Caution: Plan fundraising soon",
  HEALTHY: "✅ Healthy runway - monitor regularly",
} as const;
