"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FavoriteGamesPanel } from "@/components/gaming-arena/FavoriteGamesPanel";
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
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Gaming Arena"
          subtitle="Games taught me strategy. Production support taught me survival."
          accent="purple"
        />

        <motion.p
          className="text-center text-text-muted text-sm font-mono italic mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          &quot;Aim is muscle memory. Production incidents are reflex memory.&quot;
        </motion.p>

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
    </div>
  );
}
