
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
    title: "Instant Clarity",
    description: "No more complex spreadsheets. Get the financial foresight you need in seconds, not hours.",
  },
  {
    icon: Coins,
    title: "Simple Inputs",
    description: "Just enter your cash, revenue, and expenses to get a clear picture of your financial runway.",
  },
  {
    icon: BarChart,
    title: "Visual Projections",
    description: "Visualize your cash flow with our intuitive burn down chart. Make informed decisions with confidence.",
  },
  {
    icon: Building2,
    title: "Built for Founders",
    description: "An essential tool designed for startups, SMBs, founders, and financial planners.",
  },
  {
    icon: Lock,
    title: "Secure and Private",
    description: "Your financial data is processed in your browser. Nothing is ever stored or sent to a server.",
  },
  {
    icon: Gift,
    title: "Completely Free",
    description: "Get started right away with all our core features. No credit card or sign up required.",
  },
];

export function Features() {
    return (
        <AnimatedSection id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Why Founders Love Reckoner</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">Simple, Instant, and Accurate</p>
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
