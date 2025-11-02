import { FinancialMetrics } from './survival-calculator';

export function exportToPDF(metrics: FinancialMetrics, inputs: any) {
  // Simulate PDF generation
  const content = generateReportContent(metrics, inputs);
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `financial-survival-report-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCSV(metrics: FinancialMetrics) {
  const getBreakEven = () => {
    if (metrics.breakEvenMonths === 0) return 'Profitable Now';
    if (metrics.breakEvenMonths === -1) return 'Not Achievable';
    return `${metrics.breakEvenMonths} months`;
  };
  
  const csv = [
    ['Metric', 'Value'],
    ['Burn Rate', `$${metrics.burnRate.toLocaleString()}`],
    ['Break-Even Timeline', getBreakEven()],
    ['Health Status', metrics.healthStatus],
    ['Health Index', `${metrics.healthIndex}%`],
    ['Growth Potential', `${metrics.growthPotential}%`],
    ['Confidence Score', `${metrics.confidenceScore}%`],
    [''],
    ['AI Recommendations', ''],
    ...metrics.recommendations.map(r => ['', r.text])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `financial-data-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateReportContent(metrics: FinancialMetrics, inputs: any): string {
  const getBreakEven = () => {
    if (metrics.breakEvenMonths === 0) return 'Profitable Now';
    if (metrics.breakEvenMonths === -1) return 'Not Achievable with Current Trajectory';
    const date = new Date();
    date.setMonth(date.getMonth() + metrics.breakEvenMonths);
    return `${metrics.breakEvenMonths} months (${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`;
  };
  
  return `
═══════════════════════════════════════════════════════
    FINANCIAL SURVIVAL ANALYSIS REPORT
═══════════════════════════════════════════════════════

Generated: ${new Date().toLocaleDateString()}

INPUT PARAMETERS
────────────────────────────────────────────────────────
Monthly Revenue:        $${parseFloat(inputs.revenue).toLocaleString()}
Monthly Expenses:       $${parseFloat(inputs.expenses).toLocaleString()}
Cash in Hand:           $${parseFloat(inputs.savings).toLocaleString()}
Growth Rate:            ${inputs.growth}%
Industry:               ${inputs.industry || 'General'}

KEY METRICS
────────────────────────────────────────────────────────
Monthly Burn Rate:      $${metrics.burnRate.toLocaleString()}
Break-Even Timeline:    ${getBreakEven()}
Health Status:          ${metrics.healthStatus} (${metrics.healthIndex}%)
Growth Potential:       +${metrics.growthPotential}%
Confidence Score:       ${metrics.confidenceScore}%

AI RECOMMENDATIONS (Sorted by Impact)
────────────────────────────────────────────────────────
${metrics.recommendations.map((r, i) => `${i + 1}. ${r.text}`).join('\n')}

ANALYSIS SUMMARY
────────────────────────────────────────────────────────
${metrics.healthStatus === 'Excellent' 
  ? 'Your financial position is strong. Focus on sustainable growth.'
  : metrics.healthStatus === 'Fair'
  ? 'Your runway is moderate. Consider optimizing burn rate or raising capital.'
  : 'Critical attention needed. Immediate action required to extend runway.'}

═══════════════════════════════════════════════════════
    Powered by AI Financial Survival Estimator
═══════════════════════════════════════════════════════
`;
}

export function copyToClipboard(metrics: FinancialMetrics) {
  const getBreakEven = () => {
    if (metrics.breakEvenMonths === 0) return 'Profitable Now';
    if (metrics.breakEvenMonths === -1) return 'Not Achievable';
    return `${metrics.breakEvenMonths} months`;
  };
  
  const summary = `
Financial Survival Summary:
• Burn Rate: $${metrics.burnRate.toLocaleString()}/mo
• Break-Even: ${getBreakEven()}
• Health: ${metrics.healthStatus} (${metrics.healthIndex}%)
• Growth: +${metrics.growthPotential}%

Top Recommendations:
${metrics.recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.text}`).join('\n')}
  `.trim();

  navigator.clipboard.writeText(summary);
  return true;
}
