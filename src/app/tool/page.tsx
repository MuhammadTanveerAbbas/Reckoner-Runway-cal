"use client";

import { useState } from "react";
import { InputForm } from "@/components/survival/input-form";
import { LoadingStage } from "@/components/survival/loading-stage";
import { ResultsDashboard } from "@/components/survival/results-dashboard";
import {
  calculateFinancialMetrics,
  FinancialMetrics,
  FinancialInputs,
} from "@/lib/survival-calculator";
import { generateAIRecommendations } from "@/lib/ai-engine";
import { Header } from "@/components/pages/header";

export default function ToolPage() {
  const [stage, setStage] = useState<"input" | "loading" | "results">("input");
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [savedInputs, setSavedInputs] = useState<FinancialInputs | null>(null);

  const handleSubmit = async (data: any) => {
    setStage("loading");

    const inputs: FinancialInputs = {
      revenue: parseFloat(data.revenue) || 0,
      expenses: parseFloat(data.expenses) || 0,
      savings: parseFloat(data.savings) || 0,
      growth: parseFloat(data.growth) || 0,
      teamSize: parseFloat(data.teamSize) || 0,
    };

    setSavedInputs(inputs);

    const baseMetrics = calculateFinancialMetrics(inputs);
    const aiRecommendations = await generateAIRecommendations(
      inputs,
      baseMetrics
    );

    const finalMetrics = {
      ...baseMetrics,
      recommendations: aiRecommendations,
    };

    setMetrics(finalMetrics);
    setStage("results");
  };

  const handleReset = () => {
    setStage("input");
    setMetrics(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 bg-black">
        {stage === "input" && (
          <>
            <div className="text-center mb-6 sm:mb-8 max-w-2xl px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Know Exactly How Long Your Startup Can Survive
              </h1>
            </div>
            <InputForm onSubmit={handleSubmit} />
          </>
        )}
        {stage === "loading" && <LoadingStage />}
        {stage === "results" && metrics && savedInputs && (
          <ResultsDashboard
            metrics={metrics}
            inputs={savedInputs}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
