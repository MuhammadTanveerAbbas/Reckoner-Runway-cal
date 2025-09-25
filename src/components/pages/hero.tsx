
"use client";

import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <section className="w-full py-24 md:py-40 lg:py-48">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div 
              className="flex flex-col items-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-16 w-16 text-primary" />
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none font-headline">
                Know Your Runway in Seconds.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The simple, instant, and accurate way for founders to calculate how long their business can survive on its current cash reserves.
              </p>
              <a href="#calculator" onClick={(e) => scrollToSection(e, 'calculator')} className="mt-4">
                  <Button size="lg" className="shadow-lg shadow-gray-500/10 transition-shadow hover:shadow-gray-500/20">
                    Calculate My Runway
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
              </a>
            </motion.div>
          </div>
        </section>
    );
}
