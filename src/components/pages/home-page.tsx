
"use client";

import { Suspense } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
import { About } from "./about";
import { Features } from "./features";
import { Testimonials } from "./testimonials";
import { FAQs } from "./faqs";
import { Pricing } from "./pricing";
import { Footer } from "./footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RunwayCalculatorForm } from "@/components/runway-calculator-form";
import { AnimatedSection } from "@/components/animated-section";

export function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Features />

        <AnimatedSection id="calculator" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Calculate Your Runway</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">Enter your financials below to get an instant calculation and cash burn projection.</p>
                </div>
                <div className="mx-auto mt-8 max-w-md">
                    <Card className="rounded-2xl shadow-xl">
                        <CardHeader>
                            <CardTitle>Runway Calculator</CardTitle>
                             <CardDescription>Get a clear view of your startup's financial future.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Suspense fallback={<div>Loading...</div>}>
                              <RunwayCalculatorForm />
                           </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AnimatedSection>

        <Testimonials />
        <Pricing />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
