'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScenarioPanelProps {
  scenarios: {
    best: { runway: number; description: string; breakEven?: number };
    likely: { runway: number; description: string; breakEven?: number };
    worst: { runway: number; description: string; breakEven?: number };
  };
}

export function ScenarioPanel({ scenarios }: ScenarioPanelProps) {
  const formatRunway = (runway: number) => {
    if (runway === -1 || runway === Infinity || runway > 999) return 'Sustainable';
    if (runway <= 0) return 'Critical';
    return `${runway.toFixed(1)} mo cash`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-[#111111] rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Scenario Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Best Case */}
        <div className="bg-black rounded-lg p-4 border border-green-900/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#00E676]" />
            <span className="text-sm font-medium text-[#00E676]">Best Case</span>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{formatRunway(scenarios.best.runway)}</p>
          <p className="text-xs text-gray-400">{scenarios.best.description}</p>
        </div>

        {/* Likely Case */}
        <div className="bg-black rounded-lg p-4 border border-blue-900/30">
          <div className="flex items-center gap-2 mb-2">
            <Minus className="w-5 h-5 text-[#00B4FF]" />
            <span className="text-sm font-medium text-[#00B4FF]">Most Likely</span>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{formatRunway(scenarios.likely.runway)}</p>
          <p className="text-xs text-gray-400">{scenarios.likely.description}</p>
        </div>

        {/* Worst Case */}
        <div className="bg-black rounded-lg p-4 border border-red-900/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-[#FF3B3B]" />
            <span className="text-sm font-medium text-[#FF3B3B]">Worst Case</span>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{formatRunway(scenarios.worst.runway)}</p>
          <p className="text-xs text-gray-400">{scenarios.worst.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
