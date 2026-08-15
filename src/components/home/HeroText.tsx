"use client";

import { motion } from "framer-motion";

const LINES = [
  "I design systems",
  "that turn chaos into momentum.",
  "I build the future behind the scenes.",
];

export function HeroText() {
  return (
    <div className="relative z-10 text-left md:text-left">
      <motion.p
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-accent-blue backdrop-blur-sm"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
        Enterprise Data Engineer • AI Platform Builder
      </motion.p>

      <div className="mb-6 space-y-1">
        {LINES.map((line, i) => (
          <motion.h1
            key={line}
            className={`font-display font-semibold leading-[0.9] tracking-[-0.05em] ${
              i === 2
                ? "max-w-3xl text-[2.7rem] md:text-[4.5rem] lg:text-[6rem] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold bg-clip-text text-transparent"
                : i === 1
                  ? "max-w-3xl text-[2.5rem] md:text-[4rem] lg:text-[5.2rem] text-white"
                  : "max-w-2xl text-[2.2rem] md:text-[3.6rem] lg:text-[4.8rem] text-white/95"
            }`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.18, duration: 0.8, ease: "easeOut" }}
          >
            {line}
          </motion.h1>
        ))}
      </div>

      <motion.p
        className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
      >
        Building resilient intelligence systems for modern enterprises — from data foundations to secure AI experiences.
      </motion.p>
    </div>
  );
}
