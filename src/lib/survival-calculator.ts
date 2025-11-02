export interface FinancialInputs {
  revenue: number;
  expenses: number;
  savings: number;
  growth: number;
  industry?: string;
  currency?: string;
}

export interface FinancialMetrics {
  burnRate: number;
  breakEvenMonths: number;
  healthIndex: number;
  healthStatus: 'Excellent' | 'Fair' | 'Risky';
  growthPotential: number;
  confidenceScore: number;
  projectedEarnings: number[];
  timelineData: { month: number; cash: number; revenue: number }[];
  spendingData: { name: string; value: number; color: string }[];
  recommendations: { text: string; impact: number }[];
}

const INDUSTRY_BENCHMARKS: Record<string, { avgBurn: number; avgGrowth: number; avgRunway: number }> = {
  saas: { avgBurn: 0.7, avgGrowth: 15, avgRunway: 14 },
  ecommerce: { avgBurn: 0.8, avgGrowth: 12, avgRunway: 10 },
  fintech: { avgBurn: 0.75, avgGrowth: 18, avgRunway: 16 },
  healthtech: { avgBurn: 0.65, avgGrowth: 10, avgRunway: 18 },
  marketplace: { avgBurn: 0.85, avgGrowth: 20, avgRunway: 12 },
  hardware: { avgBurn: 0.9, avgGrowth: 8, avgRunway: 15 },
  consulting: { avgBurn: 0.5, avgGrowth: 10, avgRunway: 8 },
  other: { avgBurn: 0.75, avgGrowth: 12, avgRunway: 12 },
};

export function calculateFinancialMetrics(inputs: FinancialInputs): FinancialMetrics {
  const { revenue, expenses, savings, growth, industry = 'other' } = inputs;

  // Core calculations with variance
  const burnRate = Math.round(expenses - revenue);
  const growthPotential = growth;
  
  // Calculate break-even point (when revenue equals expenses)
  let breakEvenMonths = 0;
  if (burnRate > 0 && growth > 0 && revenue > 0) {
    // Calculate months until revenue growth covers the burn
    breakEvenMonths = Math.ceil(Math.log(expenses / revenue) / Math.log(1 + growth / 100));
  } else if (burnRate <= 0) {
    breakEvenMonths = 0; // Already profitable
  } else {
    breakEvenMonths = -1; // Cannot reach break-even with current trajectory
  }
  
  // Confidence score (0-100) based on data quality
  const confidenceScore = calculateConfidenceScore(inputs);

  // Health status based on break-even timeline and cash position
  const benchmark = INDUSTRY_BENCHMARKS[industry];
  const cashRunway = burnRate > 0 ? savings / burnRate : 999;
  let healthStatus: 'Excellent' | 'Fair' | 'Risky';
  let healthIndex: number;

  if (breakEvenMonths === 0 || (breakEvenMonths > 0 && breakEvenMonths < 12 && cashRunway > breakEvenMonths)) {
    healthStatus = 'Excellent';
    healthIndex = 85 + Math.min(15, growth);
  } else if (breakEvenMonths > 0 && breakEvenMonths < 24 && cashRunway > breakEvenMonths * 0.5) {
    healthStatus = 'Fair';
    healthIndex = 50 + (24 - breakEvenMonths);
  } else {
    healthStatus = 'Risky';
    healthIndex = Math.max(20, 50 - breakEvenMonths);
  }

  // Projected earnings and timeline
  const projectedEarnings: number[] = [];
  const timelineData: { month: number; cash: number; revenue: number }[] = [];

  for (let month = 0; month <= 12; month++) {
    const monthlyGrowth = Math.pow(1 + growth / 100, month);
    const projectedRevenue = revenue * monthlyGrowth;
    const projectedExpenses = expenses * Math.pow(1.02, month); // 2% expense inflation
    const monthlyBurn = projectedExpenses - projectedRevenue;
    const cashRemaining = Math.max(0, savings - monthlyBurn * month);

    projectedEarnings.push(projectedRevenue);
    timelineData.push({
      month,
      cash: cashRemaining,
      revenue: projectedRevenue,
    });
  }

  // Spending breakdown
  const spendingData = [
    { name: 'Revenue', value: revenue, color: '#10b981' },
    { name: 'Expenses', value: expenses, color: '#ef4444' },
  ];

  // AI recommendations with impact scores
  const recommendations = generateRecommendations(inputs, breakEvenMonths, healthStatus, burnRate, industry);

  return {
    burnRate,
    breakEvenMonths,
    healthIndex: Math.round(healthIndex),
    healthStatus,
    growthPotential,
    confidenceScore,
    projectedEarnings,
    timelineData,
    spendingData,
    recommendations,
  };
}

function calculateConfidenceScore(inputs: FinancialInputs): number {
  let score = 60; // Base score
  
  if (inputs.revenue > 0) score += 15;
  if (inputs.savings > inputs.expenses * 3) score += 10;
  if (inputs.growth > 0 && inputs.growth < 50) score += 10;
  if (inputs.industry && inputs.industry !== 'other') score += 5;
  
  return Math.min(100, score);
}

function generateRecommendations(
  inputs: FinancialInputs,
  breakEvenMonths: number,
  healthStatus: string,
  burnRate: number,
  industry: string
): { text: string; impact: number }[] {
  const { revenue, expenses, savings, growth } = inputs;
  const recommendations: { text: string; impact: number }[] = [];
  const benchmark = INDUSTRY_BENCHMARKS[industry];
  const burnRatio = expenses > 0 ? (expenses - revenue) / expenses : 0;
  const cashRunway = burnRate > 0 ? savings / burnRate : 999;

  // Break-even based recommendations
  if (breakEvenMonths > 24 || breakEvenMonths === -1) {
    const targetGrowth = Math.ceil(benchmark.avgGrowth * 1.5);
    recommendations.push({ 
      text: `Increase growth to ${targetGrowth}% to reach break-even within 18 months`,
      impact: 95
    });
  } else if (breakEvenMonths > 12 && cashRunway < breakEvenMonths) {
    const raiseAmount = Math.round(burnRate * (breakEvenMonths - cashRunway));
    recommendations.push({ 
      text: `Raise $${raiseAmount.toLocaleString()} to survive until break-even in ${breakEvenMonths} months`,
      impact: 90
    });
  }

  // Cash runway recommendations
  if (cashRunway < 6 && cashRunway > 0) {
    const savingsNeeded = Math.round(expenses * 0.3);
    const extraMonths = ((expenses - savingsNeeded - revenue) > 0) ? (savings / (expenses - savingsNeeded - revenue) - runway).toFixed(1) : 0;
    recommendations.push({ 
      text: `Cut costs by $${savingsNeeded.toLocaleString()} to gain ${extraMonths} months runway`,
      impact: 95
    });
    recommendations.push({ 
      text: `Raise $${Math.round(burnRate * 6).toLocaleString()} to reach 6-month safety threshold`,
      impact: 90
    });
  } else if (cashRunway < 12 && cashRunway > 0) {
    const reductionNeeded = Math.round(burnRate * 0.2);
    recommendations.push({ 
      text: `Reduce burn by $${reductionNeeded.toLocaleString()}/mo to extend cash runway`,
      impact: 80
    });
  }

  // Growth recommendations
  if (growth < benchmark.avgGrowth) {
    const revenueIncrease = Math.round(revenue * (benchmark.avgGrowth - growth) / 100);
    recommendations.push({ 
      text: `Boost revenue by $${revenueIncrease.toLocaleString()}/mo to match ${benchmark.avgGrowth}% industry avg`,
      impact: 75
    });
  } else if (growth > benchmark.avgGrowth) {
    recommendations.push({ 
      text: `Strong ${growth}% growth rate exceeds industry standard`,
      impact: 60
    });
  }

  // Burn rate recommendations
  if (burnRatio > benchmark.avgBurn && burnRate > 0) {
    const targetBurn = Math.round(expenses * benchmark.avgBurn);
    const savings = Math.round(expenses - targetBurn);
    recommendations.push({ 
      text: `Optimize spend by $${savings.toLocaleString()}/mo to hit ${Math.round(benchmark.avgBurn * 100)}% industry ratio`,
      impact: 70
    });
  }

  // Profitability recommendations
  if (breakEvenMonths > 0 && breakEvenMonths < 18) {
    recommendations.push({ 
      text: `On track to profitability in ${breakEvenMonths} months - maintain course`,
      impact: 70
    });
  }

  // Profitability path
  if (revenue > 0 && growth > 0) {
    const monthsToBreakeven = Math.ceil((expenses - revenue) / (revenue * (growth / 100)));
    if (monthsToBreakeven > 0 && monthsToBreakeven < 24) {
      recommendations.push({ 
        text: `Reach profitability in ${monthsToBreakeven} months at ${growth}% growth`,
        impact: 65
      });
    }
  }

  // Cash management
  if (savings < expenses * 3 && expenses > 0) {
    const bufferNeeded = Math.round(expenses * 3 - savings);
    recommendations.push({ 
      text: `Build $${bufferNeeded.toLocaleString()} emergency buffer for 3-month safety`,
      impact: 55
    });
  }

  // Sort by impact and return top 4-5
  return recommendations
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5);
}
