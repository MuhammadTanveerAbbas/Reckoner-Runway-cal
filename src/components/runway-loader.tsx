"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function RunwayLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <Calculator className="h-16 w-16 text-white" strokeWidth={1.5} />
          
          <motion.div
            animate={{
              scale: [1, 2, 2],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-white"
          />
          <motion.div
            animate={{
              scale: [1, 2, 2],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
            className="absolute inset-0 rounded-full border-2 border-white"
          />
        </motion.div>

        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
