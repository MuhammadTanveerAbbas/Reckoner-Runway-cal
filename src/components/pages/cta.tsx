"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

interface CTAProps {
  onCTAClick: () => void;
}

export function CTA({ onCTAClick }: CTAProps) {
  const handleClick = () => {
    trackEvent('cta_clicked', { location: 'cta_section' });
  };

  return (
    <AnimatedSection className="w-full py-16 md:py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
        >
          <Calculator className="h-16 w-16 text-primary" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Calculate Your Runway?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Experience the future of startup forecasting — powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/tool">
              <Button onClick={handleClick} size="lg" className="bg-[#00B4FF] hover:bg-[#00E676] text-black text-base px-6 py-3 h-auto shadow-lg hover:shadow-xl transition-all rounded-xl">
                Calculate Your Runway →
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              ✓ No credit card required  ✓ 100% private
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
