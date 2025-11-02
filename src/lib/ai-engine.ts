import { FinancialInputs } from './survival-calculator';

// Simulated AI engine that demonstrates AI integration capability
// In production, this would call OpenAI/Anthropic API
export async function generateAIRecommendations(
  inputs: FinancialInputs,
  metrics: any
): Promise<{ text: string; impact: number }[]> {
  
  // Simulate API call delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { revenue, expenses, savings, growth, industry = 'other' } = inputs;
  const { burnRate, breakEvenMonths } = metrics;
  const cashRunway = burnRate > 0 ? savings / burnRate : 999;

  // AI-style contextual analysis
  const recommendations: { text: string; impact: number }[] = [];

  // Context-aware recommendations based on break-even timeline
  if (breakEvenMonths > 24 || breakEvenMonths === -1) {
    const targetGrowth = Math.ceil(growth * 1.5);
    recommendations.push({
      text: `Critical: Increase growth to ${targetGrowth}% to reach profitability faster`,
      impact: 98
    });
  } else if (breakEvenMonths > 0 && cashRunway < breakEvenMonths) {
    const raiseAmount = Math.round(burnRate * (breakEvenMonths - cashRunway));
    recommendations.push({
      text: `Raise $${raiseAmount.toLocaleString()} to survive until break-even in ${breakEvenMonths} months`,
      impact: 95
    });
  }

  // Industry-specific insights
  const industryInsights: Record<string, string> = {
    saas: `Focus on MRR growth - target $${Math.round(revenue * 1.3).toLocaleString()}/mo for sustainability`,
    ecommerce: `Optimize CAC to <$${Math.round(revenue * 0.15).toLocaleString()} for profitable unit economics`,
    fintech: `Regulatory costs high - allocate $${Math.round(expenses * 0.12).toLocaleString()} for compliance`,
    healthtech: `Long sales cycles - maintain ${Math.round(cashRunway + 6)} month runway minimum`,
    marketplace: `Focus on GMV growth - target 30% take rate for profitability`,
    hardware: `High upfront costs - secure $${Math.round(expenses * 12).toLocaleString()} for production`,
    consulting: `Maintain 50%+ profit margin - current at ${Math.round((1 - burnRate / expenses) * 100)}%`
  };

  if (industry && industry !== 'other' && industryInsights[industry]) {
    recommendations.push({
      text: industryInsights[industry],
      impact: 85
    });
  }

  // Growth optimization
  if (growth < 10) {
    const targetRevenue = Math.round(revenue * 1.15);
    recommendations.push({
      text: `Boost revenue to $${targetRevenue.toLocaleString()}/mo for 15% growth baseline`,
      impact: 80
    });
  } else if (growth > 20) {
    recommendations.push({
      text: `Strong ${growth}% growth - reinvest ${Math.round(revenue * 0.2).toLocaleString()} into scaling`,
      impact: 75
    });
  }

  // Cash management
  const idealBuffer = expenses * 6;
  if (savings < idealBuffer && expenses > 0) {
    recommendations.push({
      text: `Build $${Math.round((idealBuffer - savings) / 1000)}k buffer for 6-month safety net`,
      impact: 70
    });
  }

  // Profitability path
  if (burnRate > 0 && growth > 0) {
    const monthsToProfit = Math.ceil(burnRate / (revenue * (growth / 100)));
    if (monthsToProfit < 18) {
      recommendations.push({
        text: `Path to profitability in ${monthsToProfit} months at current trajectory`,
        impact: 65
      });
    }
  }

  // Profitability timeline
  if (breakEvenMonths > 0 && breakEvenMonths <= 18) {
    recommendations.push({
      text: `Strong trajectory - ${breakEvenMonths} months to profitability at current pace`,
      impact: 75
    });
  }

  // Generate exactly 3 unique recommendations with 5 words each
  const finalRecommendations: { text: string; impact: number }[] = [];
  
  if (cashRunway < 6 && cashRunway > 0) {
    finalRecommendations.push({
      text: 'Reduce expenses immediately today',
      impact: 95
    });
  } else if (cashRunway >= 6 && cashRunway < 12) {
    finalRecommendations.push({
      text: 'Optimize spending for better runway',
      impact: 85
    });
  } else {
    finalRecommendations.push({
      text: 'Maintain current financial health status',
      impact: 75
    });
  }
  
  if (growth < 10) {
    finalRecommendations.push({
      text: 'Increase revenue growth rate now',
      impact: 90
    });
  } else if (growth >= 10 && growth < 20) {
    finalRecommendations.push({
      text: 'Scale operations with current momentum',
      impact: 80
    });
  } else {
    finalRecommendations.push({
      text: 'Reinvest profits into business growth',
      impact: 70
    });
  }
  
  if (burnRate > expenses * 0.5) {
    finalRecommendations.push({
      text: 'High burn rate needs attention',
      impact: 88
    });
  } else if (burnRate > 0) {
    finalRecommendations.push({
      text: 'Monitor cash flow more closely',
      impact: 78
    });
  } else {
    finalRecommendations.push({
      text: 'Profitable business keep it up',
      impact: 68
    });
  }
  
  return finalRecommendations.slice(0, 3);
}

// Scenario modeling for advanced analysis
export function generateScenarios(inputs: FinancialInputs) {
  const { revenue, expenses, savings, growth } = inputs;
  const burnRate = expenses - revenue;

  // Best case: 20% revenue growth, 15% cost reduction
  const bestRevenue = revenue * 1.2;
  const bestExpenses = expenses * 0.85;
  const bestBurn = bestExpenses - bestRevenue;
  const bestRunway = bestBurn > 0 ? savings / bestBurn : -1;

  // Likely case: current trajectory
  const likelyRunway = burnRate > 0 ? savings / burnRate : -1;

  // Worst case: 15% revenue drop, 20% cost increase
  const worstRevenue = revenue * 0.85;
  const worstExpenses = expenses * 1.2;
  const worstBurn = worstExpenses - worstRevenue;
  const worstRunway = worstBurn > 0 ? savings / worstBurn : -1;

  return {
    best: {
      runway: bestRunway,
      description: 'Growth Accelerates'
    },
    likely: {
      runway: likelyRunway,
      description: 'Current Trajectory'
    },
    worst: {
      runway: worstRunway,
      description: 'Market Downturn'
    }
  };
}
