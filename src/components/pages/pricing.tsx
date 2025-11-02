"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic runway calculation",
      "Growth projections",
      "Cash flow chart",
      "PDF export",
      "Browser-based privacy",
    ],
    cta: "Get Started",
    href: "/tool",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious founders",
    features: [
      "Everything in Free",
      "Scenario comparison",
      "Historical tracking",
      "CSV/Excel export",
      "Email reports",
      "Priority support",
    ],
    cta: "Coming Soon",
    href: "#",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and advisors",
    features: [
      "Everything in Pro",
      "Multi-company dashboard",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Dedicated support",
    ],
    cta: "Contact Us",
    href: "#",
    popular: false,
  },
];

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl mt-4">
            Start free, upgrade when you need more
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Note: This is a portfolio project. Paid plans are conceptual.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild={plan.href !== "#"}
                  disabled={plan.href === "#"}
                >
                  {plan.href !== "#" ? (
                    <a href={plan.href}>{plan.cta}</a>
                  ) : (
                    <span>{plan.cta}</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
