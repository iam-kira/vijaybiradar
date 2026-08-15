"use client";

import { motion } from "framer-motion";

const WORDS = [
  { text: "Data", color: "#3b82f6" },
  { text: "AI", color: "#8b5cf6" },
  { text: "Security", color: "#ef4444" },
  { text: "Architecture", color: "#22d3ee" },
  { text: "Platform", color: "#22c55e" },
  { text: "Builder", color: "#f59e0b" },
  { text: "Engineer", color: "#a78bfa" },
];

export function FloatingWords() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {WORDS.map((word, i) => {
        const x = 10 + (i * 13) % 80;
        const y = 15 + (i * 17) % 70;
        const dur = 6 + (i % 3) * 2;
        const delay = i * 0.8;

        return (
          <motion.div
            key={word.text}
            className="absolute text-xs font-mono font-semibold tracking-widest uppercase select-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: word.color,
              opacity: 0.12,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {word.text}
          </motion.div>
        );
      })}
    </div>
  );
}
