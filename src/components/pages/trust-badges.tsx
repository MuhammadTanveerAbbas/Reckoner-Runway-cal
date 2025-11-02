"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Shield, Lock, Zap, Code2 } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "100% Private",
    description: "All calculations in your browser",
  },
  {
    icon: Lock,
    title: "No Data Stored",
    description: "Your financials never leave your device",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant results, no waiting",
  },
  {
    icon: Code2,
    title: "Open Source Ready",
    description: "Built with Next.js & TypeScript",
  },
];

export function TrustBadges() {
  return (
    <AnimatedSection className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <badge.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
