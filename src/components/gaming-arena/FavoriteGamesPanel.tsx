"use client";

import { motion } from "framer-motion";
import { GameProfileCard } from "./GameProfileCard";
import { gamesList } from "@/data/games";

export function FavoriteGamesPanel() {
  return (
    <div className="card-base p-6 md:p-8">
      <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-6">
        Player Profile — Favorite Games
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gamesList.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <GameProfileCard game={game} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
