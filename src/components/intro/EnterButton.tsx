"use client";

import { motion } from "framer-motion";

export function EnterButton({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.button
      onClick={onEnter}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="mt-8 px-8 py-3 rounded-full border border-accent-blue/50 bg-accent-blue/10 text-accent-blue font-display font-semibold tracking-widest uppercase text-sm hover:bg-accent-blue/20 hover:border-accent-blue hover:shadow-glow-blue transition-all"
    >
      Enter VijayBiradar →
    </motion.button>
  );
}
