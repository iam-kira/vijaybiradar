"use client";

import { motion } from "framer-motion";

const LINES = [
  "I came with curiosity.",
  "I saw complexity.",
  "I built systems to conquer it.",
];

export function HeroText() {
  return (
    <div className="relative z-10 text-center">
      <motion.p
        className="text-accent-blue font-mono text-sm tracking-widest uppercase mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Enterprise Data Engineer · AI Platform Builder
      </motion.p>

      <div className="space-y-1 mb-6">
        {LINES.map((line, i) => (
          <motion.h1
            key={line}
            className={`font-display font-bold leading-tight ${
              i === 2
                ? "text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
                : "text-2xl md:text-4xl lg:text-5xl text-text-primary"
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.7 }}
          >
            {line}
          </motion.h1>
        ))}
      </div>

      <motion.p
        className="text-text-secondary max-w-xl mx-auto text-base md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Daimler Truck Innovation Center India · Bengaluru
      </motion.p>
    </div>
  );
}
