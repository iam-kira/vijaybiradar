"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Achievement } from "@/data/achievements";
import { useSound } from "@/hooks/useSound";

const CATEGORY_COLORS: Record<string, string> = {
  platform: "from-accent-blue to-accent-purple",
  reliability: "from-accent-green to-accent-cyan",
  leadership: "from-accent-gold to-yellow-300",
  award: "from-accent-purple to-pink-500",
};

export function TrophyCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [unlocked, setUnlocked] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { playSfx } = useSound();

  const handleUnlock = () => {
    if (!unlocked) {
      setUnlocked(true);
      playSfx("achievementUnlock");
      setTimeout(() => setFlipped(true), 400);
    } else {
      setFlipped((f) => !f);
    }
  };

  const gradient = CATEGORY_COLORS[achievement.category] ?? "from-accent-blue to-accent-purple";

  return (
    <motion.div
      className="perspective-1000 cursor-pointer h-52"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={handleUnlock}
      onMouseEnter={() => unlocked && setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 card-base flex flex-col items-center justify-center gap-3 backface-hidden overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {unlocked && (
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient}`} />
          )}
          <span className={`text-4xl ${unlocked ? "" : "grayscale opacity-40"} transition-all`}>
            {achievement.emoji}
          </span>
          <p className={`text-sm font-display font-semibold text-center px-4 ${unlocked ? "text-text-primary" : "text-text-muted"}`}>
            {achievement.title}
          </p>
          {achievement.year && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${unlocked ? "border-accent-gold/40 text-accent-gold" : "border-white/10 text-text-muted"}`}>
              {achievement.year}
            </span>
          )}
          {!unlocked && (
            <p className="text-xs text-text-muted mt-1">Click to unlock</p>
          )}
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 card-base bg-gradient-to-br ${gradient} opacity-90 flex flex-col items-center justify-center gap-2 p-4 backface-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-3xl">{achievement.emoji}</span>
          <p className="text-sm font-bold text-white text-center">{achievement.title}</p>
          <p className="text-xs text-white/80 text-center leading-snug">{achievement.detail ?? achievement.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
