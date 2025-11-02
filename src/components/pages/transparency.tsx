"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Heart, Lock, Zap } from "lucide-react";

const facts = [
  {
    icon: Heart,
    title: "Built by a Founder",
    description: "Created by Muhammad Tanveer Abbas as a portfolio project to solve a real problem founders face every day.",
  },
  {
    icon: Lock,
    title: "100% Client-Side",
    description: "All calculations happen in your browser. No data is sent to any server. Your financial information stays private.",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "The entire codebase is public on GitHub. You can audit, fork, or contribute to make it better.",
  },
  {
    icon: Zap,
    title: "Always Free",
    description: "The core calculator will always be free. Paid features shown are conceptual for portfolio demonstration.",
  },
];

export function Transparency() {
  return (
    <AnimatedSection id="transparency" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">Honest & Transparent</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Behind the Project
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl mt-4">
            No marketing fluff. Here's the truth about Reckoner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <Card key={fact.title} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{fact.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fact.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
