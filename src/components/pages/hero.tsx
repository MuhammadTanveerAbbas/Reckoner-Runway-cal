
"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
    const handleClick = () => {
      trackEvent('cta_clicked', { location: 'hero' });
    };

    return (
        <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-12 mb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="flex flex-col items-center text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
              >
                <Sparkles className="h-4 w-4 text-white/80" />
                <span className="text-sm font-medium text-white/90">Free • Instant • No Signup Required</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Calculate Your
                <br />
                <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Financial Runway
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mb-8 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Know exactly how many months your startup can survive. Get instant, accurate burn rate analysis in seconds.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-10"
              >
                <Link href="/tool">
                  <Button 
                    onClick={handleClick} 
                    size="lg" 
                    className="bg-[#00B4FF] text-black hover:bg-[#00E676] text-base font-semibold px-6 py-3 h-auto rounded-xl shadow-2xl shadow-[#00B4FF]/20 transition-all duration-300 hover:scale-105" 
                  >
                    Calculate Your Runway
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <a
                  href="https://github.com/muhammadtanveerabbas/Reckoner-Runway-cal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium border border-white/20 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 text-white/90"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Star on GitHub
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 font-light"
              >
                <span>✓ 100% Private</span>
                <span>✓ No Installation</span>
                <span>✓ Completely Free</span>
              </motion.div>
            </motion.div>
          </div>
        </section>
    );
}
