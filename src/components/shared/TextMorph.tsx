"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface TextMorphProps {
  words: string[];
  duration?: number;
  delay?: number;
  className?: string;
  colors?: string[];
}

export function TextMorph({
  words,
  duration = 3,
  delay = 0,
  className = "",
  colors = [
    "text-blue-400",
    "text-purple-400",
    "text-cyan-400",
    "text-pink-400",
  ],
}: TextMorphProps) {
  const displayWords = useMemo(() => words, [words]);

  return (
    <div className={`inline-block relative ${className}`}>
      <motion.span
        key="morph"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        {displayWords.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={`inline-block ${colors[i % colors.length]}`}
            animate={{
              opacity: [1, 1, 0],
              y: [0, -10, 20],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: delay + i * (duration / displayWords.length),
              ease: "easeInOut",
            }}
          >
            {word}
            {i < displayWords.length - 1 && <span className="mx-2" />}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
