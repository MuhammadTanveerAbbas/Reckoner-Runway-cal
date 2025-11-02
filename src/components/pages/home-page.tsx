
"use client";

import { Suspense } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Features } from "./features";
import { Pricing } from "./pricing";
import { Transparency } from "./transparency";
import { CTA } from "./cta";
import { FAQs } from "./faqs";
import { Footer } from "./footer";

function LoadingSection() {
  return <div className="w-full py-12 flex justify-center"><div className="h-8 w-8 rounded-full border-2 border-muted border-t-primary animate-spin"></div></div>;
}

interface HomePageProps {
  onCTAClick: () => void;
}

export function HomePage({ onCTAClick }: HomePageProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Hero onCTAClick={onCTAClick} />
        <Suspense fallback={<LoadingSection />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Features />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Transparency />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <CTA onCTAClick={onCTAClick} />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <FAQs />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
