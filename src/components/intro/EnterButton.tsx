"use client";

import { motion } from "framer-motion";

export function EnterButton({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.button
      onClick={onEnter}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" }}
      whileTap={{ scale: 0.97 }}
      className="mt-8 rounded-full border border-accent-blue/60 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 px-8 py-4 font-display text-sm font-semibold uppercase tracking-widest text-accent-blue shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:border-accent-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
    >
      Enter the VijayVerse →
    </motion.button>
  );
}
