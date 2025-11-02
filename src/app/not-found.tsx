"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Home, ArrowLeft, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#000000] px-4 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-primary blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Animated 404 with Calculator */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Calculator className="h-32 w-32 text-primary/20" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="font-mono text-5xl font-black text-primary drop-shadow-lg">404</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-3 text-xl text-muted-foreground sm:text-2xl"
        >
          This page ran out of runway
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10 inline-block rounded-lg bg-muted/50 px-4 py-2 font-mono text-sm text-muted-foreground backdrop-blur-sm"
        >
          <span className="text-destructive font-semibold">Error:</span> Runway = 0 months | Status = 404
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-12"
        >
          <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-all">
            <Link href="/">
              <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Back to Home
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="group shadow-md hover:shadow-lg transition-all">
            <Link href="/tool">
              <Calculator className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              Try Calculator
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-border/50 pt-8"
        >
          <p className="text-sm text-muted-foreground mb-4">Looking for something else?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/#features" className="text-primary hover:underline flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Features
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="/#pricing" className="text-primary hover:underline flex items-center gap-1">
              <Search className="h-4 w-4" />
              Pricing
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
