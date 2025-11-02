"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Calculator, TrendingUp, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Calculator,
    title: "Enter Your Data",
    description: "Input your cash balance, monthly revenue, and expenses. Add growth rates for projections.",
    step: "01",
  },
  {
    icon: TrendingUp,
    title: "See Results Instantly",
    description: "Get your runway calculation, burn rate analysis, and cash flow projections in real-time.",
    step: "02",
  },
  {
    icon: Rocket,
    title: "Take Action",
    description: "Export reports, compare scenarios, and make informed decisions about your business.",
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <AnimatedSection id="how-it-works" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-white/60 text-lg">
            Three simple steps to financial clarity
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative p-8 h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white text-xl font-bold">
                    {step.step}
                  </div>
                  <step.icon className="h-8 w-8 text-white/80" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-white/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
