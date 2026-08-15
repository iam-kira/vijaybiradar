"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FavoriteGamesPanel } from "@/components/gaming-arena/FavoriteGamesPanel";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const PipelineDefenderGame = dynamic(
  () => import("@/components/gaming-arena/PipelineDefenderGame").then((m) => m.PipelineDefenderGame),
  { ssr: false }
);
const VulnerabilityHunterGame = dynamic(
  () => import("@/components/gaming-arena/VulnerabilityHunterGame").then((m) => m.VulnerabilityHunterGame),
  { ssr: false }
);
const CortexQuestGame = dynamic(
  () => import("@/components/gaming-arena/CortexQuestGame").then((m) => m.CortexQuestGame),
  { ssr: false }
);

export default function GamingArenaPage() {
  const theme = getStoryTheme("gaming");

  return (
    <StoryPageShell theme={theme} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="The Arena"
          subtitle="Mastery comes from discipline, adaptation, and strategy."
          accent="purple"
        />

        <motion.div
          className="mb-12 rounded-3xl border border-accent-purple/25 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 07 · The Arena</p>
          <p className="text-lg italic text-text-secondary md:text-xl">
            “Every game is a lesson in strategy, patience, and execution.”
          </p>
        </motion.div>

        {/* Favorite games */}
        <FavoriteGamesPanel />

        {/* Mini-games */}
        <div className="mt-16">
          <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest text-center mb-8">
            Mini Games — Local High Scores via localStorage
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PipelineDefenderGame />
            <VulnerabilityHunterGame />
            <CortexQuestGame />
          </div>
        </div>
      </div>
    </StoryPageShell>
  );
}
