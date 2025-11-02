
"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Coins,
  BarChart,
  Building2,
  Lock,
  Gift,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get your runway calculation in under 10 seconds. No complex spreadsheets or financial modeling required.",
  },
  {
    icon: BarChart,
    title: "Growth Projections",
    description: "Factor in revenue growth and expense scaling to get realistic runway projections as your startup evolves.",
  },
  {
    icon: Building2,
    title: "Founder-Focused",
    description: "Built specifically for startup founders who need quick, actionable financial insights for decision making.",
  },
  {
    icon: Lock,
    title: "100% Private",
    description: "All calculations happen in your browser. Your sensitive financial data never leaves your device.",
  },
  {
    icon: Coins,
    title: "Smart Insights",
    description: "Get break-even projections, burn rate analysis, and actionable recommendations to extend your runway.",
  },
  {
    icon: Gift,
    title: "Always Free",
    description: "No hidden fees, no premium tiers, no signup required. Professional-grade runway analysis, completely free.",
  },
];

export function Features() {
    return (
        <AnimatedSection id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Built for Real Founders</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl mt-4">
                  Professional-grade financial runway analysis, completely free and private
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => {
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
                      <CardHeader className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <feature.icon className="h-8 w-8 text-primary" />
                          <CardTitle>{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
    );
}
