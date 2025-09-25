
"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pricingTiers = [
    {
        name: "Starter",
        price: "Free",
        description: "For individuals and startups just getting started.",
        features: ["Unlimited calculations", "Browser based privacy", "Community support"],
        cta: "Get Started for Free",
        isFeatured: false
    },
    {
        name: "Pro",
        price: "$10",
        pricePeriod: "/ month",
        description: "For growing businesses that need more.",
        features: ["All Starter features", "Save and compare scenarios", "Export to CSV", "Priority email support"],
        cta: "Coming Soon",
        isFeatured: true
    },
    {
        name: "Enterprise",
        price: "Contact Us",
        description: "For large organizations with custom needs.",
        features: ["All Pro features", "Team collaboration", "API access", "Dedicated account manager"],
        cta: "Coming Soon",
        isFeatured: false
    }
]

export function Pricing() {
    return (
        <AnimatedSection id="pricing" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Simple, Transparent Pricing</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">Choose the plan that is right for you.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                    {pricingTiers.map((tier, i) => (
                        <motion.div
                          key={tier.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex"
                        >
                          <Card key={tier.name} className={`flex flex-col w-full ${tier.isFeatured ? 'border-primary ring-2 ring-primary' : ''}`}>
                              <CardHeader>
                                  <CardTitle>{tier.name}</CardTitle>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-4xl font-bold">{tier.price}</span>
                                      {tier.pricePeriod && <span className="text-muted-foreground">{tier.pricePeriod}</span>}
                                  </div>
                                  <p className="text-muted-foreground pt-2">{tier.description}</p>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                  <ul className="space-y-3">
                                      {tier.features.map(feature => (
                                           <li key={feature} className="flex items-center gap-2">
                                              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                              </div>
                                              <span>{feature}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </CardContent>
                              <div className="p-6 pt-0 mt-auto">
                                  <Button className="w-full" disabled={tier.cta !== "Get Started for Free"}>
                                      {tier.cta}
                                  </Button>
                              </div>
                          </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
