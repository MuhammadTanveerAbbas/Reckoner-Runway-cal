'use client';

import { motion } from 'framer-motion';

export function ToolTransition() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        className="relative w-20 h-20 mb-6"
      >
        <div className="absolute inset-0 border-4 border-t-transparent border-[#00B4FF] rounded-full"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute inset-2 border-4 border-b-transparent border-[#00E676] rounded-full"
        ></motion.div>
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-[#B3B3B3] text-sm tracking-wide uppercase"
      >
        Loading Intelligence...
      </motion.p>
    </motion.div>
  );
}
