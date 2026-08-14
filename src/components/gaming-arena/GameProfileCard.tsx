"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { GameEntry } from "@/data/games";

export function GameProfileCard({ game }: { game: GameEntry }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 cursor-pointer h-52 relative"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Most Loved badge */}
      {game.mostLoved && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="bg-accent-gold text-black text-[10px] font-bold px-3 py-0.5 rounded-full shadow-glow-gold"
            animate={{ boxShadow: ["0 0 8px rgba(245,158,11,0.4)", "0 0 20px rgba(245,158,11,0.8)", "0 0 8px rgba(245,158,11,0.4)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ Most Loved Game
          </motion.div>
        </div>
      )}

      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front — key art */}
        <div
          className="absolute inset-0 card-base flex flex-col items-center justify-center gap-2 backface-hidden overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {game.keyArtSrc ? (
            <img src={game.keyArtSrc} alt={game.title} className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-xl" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-xl" />
          )}
          <div className="relative z-10 text-center">
            <p className="text-xl font-display font-bold text-text-primary">{game.title}</p>
            <p className="text-xs text-text-muted mt-1 font-mono">Hover / tap for stats</p>
          </div>
        </div>

        {/* Back — stats */}
        <div
          className="absolute inset-0 card-base bg-bg-overlay flex flex-col justify-center gap-2 p-4 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm font-display font-bold text-text-primary mb-2">{game.title}</p>
          {game.ignOrTag && (
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">IGN / Tag</span>
              <span className="text-accent-blue font-mono">{game.ignOrTag}</span>
            </div>
          )}
          {game.role && (
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Role / Agent</span>
              <span className="text-accent-purple font-mono">{game.role}</span>
            </div>
          )}
          {game.rank && (
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Rank</span>
              <span className="text-accent-gold font-mono">{game.rank}</span>
            </div>
          )}
          {game.note && (
            <p className="text-xs text-text-secondary mt-2 border-t border-white/10 pt-2 leading-snug">
              {game.note}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
