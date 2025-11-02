'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { Download, Copy, Check, FileText, FileSpreadsheet } from 'lucide-react';
import { FinancialMetrics } from '@/lib/survival-calculator';
import { exportToPDF, exportToCSV, copyToClipboard } from '@/lib/export-utils';
import { generateScenarios } from '@/lib/ai-engine';
import { ScenarioPanel } from './scenario-panel';

interface ResultsDashboardProps {
  metrics: FinancialMetrics;
  inputs: any;
  onReset: () => void;
}

export function ResultsDashboard({ metrics, inputs, onReset }: ResultsDashboardProps) {
  const { burnRate, breakEvenMonths, healthIndex, healthStatus, growthPotential, confidenceScore, spendingData, timelineData, recommendations, projectedEarnings } = metrics;

  const getBreakEvenDate = () => {
    if (breakEvenMonths === 0) return 'Profitable Now';
    if (breakEvenMonths === -1) return 'Not Achievable';
    const date = new Date();
    date.setMonth(date.getMonth() + breakEvenMonths);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(metrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scenarios = generateScenarios(inputs);

  const getHealthColor = (status: string) => {
    if (status === 'Excellent') return '#00E676';
    if (status === 'Fair') return '#FFC400';
    return '#FF3B3B';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };



  return (
    <div className="w-full max-w-[900px] px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center sm:text-left">Financial Survival Dashboard</h1>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            onClick={handleCopy}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 flex items-center gap-2"
            title="Copy summary to clipboard"
          >
            {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={() => exportToCSV(metrics)}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 flex items-center gap-2"
            title="Export to CSV"
          >
            <FileSpreadsheet className="w-3 h-3 sm:w-4 sm:h-4" />
            CSV
          </button>
          <button
            onClick={() => exportToPDF(metrics, {})} 
            className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 flex items-center gap-2"
            title="Export report"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            Report
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-black bg-[#00B4FF] rounded-lg hover:bg-[#0099DD] transition-all hover:shadow-lg uppercase tracking-wide"
          >
            New Analysis
          </button>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6"
      >
        {/* Box 1: Spending Chart */}
        <motion.div variants={item} className="bg-[#111111] rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Spending Breakdown</h2>

          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {spendingData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[#B3B3B3]">{item.name}</span>
                </div>
                <span className="font-semibold text-white">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Box 2: Timeline Graph */}
        <motion.div variants={item} className="bg-[#111111] rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Survival Timeline</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <defs>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00B4FF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00B4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#B3B3B3" fontSize={12} label={{ value: 'Months', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#B3B3B3' }} />
              <YAxis stroke="#B3B3B3" fontSize={12} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Cash Balance']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
              />
              <ReferenceLine y={timelineData[0]?.cash * 0.3} stroke="#FF3B3B" strokeDasharray="3 3" label={{ value: 'Critical', position: 'right', fontSize: 10, fill: '#FF3B3B' }} />
              <ReferenceLine y={timelineData[0]?.cash * 0.6} stroke="#FFC400" strokeDasharray="3 3" label={{ value: 'Risk', position: 'right', fontSize: 10, fill: '#FFC400' }} />
              <Line type="monotone" dataKey="cash" stroke="#00B4FF" strokeWidth={3} dot={false} fill="url(#cashGradient)" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-3 md:gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00E676]"></div>
              <span className="text-[#B3B3B3]">Stable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FFC400]"></div>
              <span className="text-[#B3B3B3]">Risk Zone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF3B3B]"></div>
              <span className="text-[#B3B3B3]">Critical</span>
            </div>
          </div>
        </motion.div>

        {/* Box 3: Financial Summary */}
        <motion.div 
          variants={item} 
          className="bg-[#111111] rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800 md:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Financial Summary</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#B3B3B3]">Confidence:</span>
              <span className="font-semibold text-[#00B4FF]">{confidenceScore}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            <div className="pb-4 border-b border-gray-800">
              <p className="text-xs font-medium text-[#B3B3B3] uppercase tracking-wide mb-1">Burn Rate</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: burnRate > 0 ? '#FF3B3B' : '#00E676' }}>
                ${burnRate.toLocaleString()}
              </p>
            </div>
            <div className="pb-4 border-b border-gray-800">
              <p className="text-xs font-medium text-[#B3B3B3] uppercase tracking-wide mb-1">Break-Even</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold" style={{ color: breakEvenMonths === 0 ? '#00E676' : breakEvenMonths === -1 ? '#FF3B3B' : '#FFC400' }}>
                {getBreakEvenDate()}
              </p>
            </div>
            <div className="pb-4 border-b border-gray-800">
              <p className="text-xs font-medium text-[#B3B3B3] uppercase tracking-wide mb-1">Growth</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00B4FF]">+{growthPotential}%</p>
            </div>
            <div className="pb-4 border-b border-gray-800">
              <p className="text-xs font-medium text-[#B3B3B3] uppercase tracking-wide mb-1">Projected (12mo)</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">${Math.round(projectedEarnings[12] / 1000)}k</p>
            </div>
            <div className="pb-4 border-b border-gray-800 col-span-2 sm:col-span-1">
              <p className="text-xs font-medium text-[#B3B3B3] uppercase tracking-wide mb-2">Health</p>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${healthIndex}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-2.5 rounded-full"
                  style={{ backgroundColor: getHealthColor(healthStatus) }}
                ></motion.div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold" style={{ color: getHealthColor(healthStatus) }}>{healthStatus}</span>
                <span className="text-xs font-semibold text-white">{healthIndex}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scenario Analysis */}
      <ScenarioPanel scenarios={scenarios} />

      {/* Box 4: AI Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        className="bg-[#111111] rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800 mt-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
          <span className="text-xs text-[#00B4FF] font-medium">Sorted by Impact</span>
        </div>
        <div className="space-y-3">
          {recommendations.slice(0, 3).map((rec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-black border border-transparent"
            >
              <span className="text-gray-500 text-lg leading-none mt-0.5">●</span>
              <p className="text-sm text-[#B3B3B3] leading-relaxed">{rec.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
