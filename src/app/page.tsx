"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { useCapabilityGate } from "@/components/home/armillary/useCapabilityGate";
import { ArmillaryFallback } from "@/components/home/armillary/ArmillaryFallback";

const ArmillaryScrollController = dynamic(
  () => import("@/components/home/armillary/ArmillaryScrollController").then((m) => m.ArmillaryScrollController),
  { ssr: false }
);

const CORE_MISSIONS = [
  { title: "Architect", text: "Designing enterprise systems that bring clarity to complexity." },
  { title: "Builder", text: "Turning ideas into secure, scalable digital platforms." },
  { title: "Guardian", text: "Protecting ecosystems with awareness, discipline, and foresight." },
];

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = getStoryTheme("home");
  const { ready, canRender3D } = useCapabilityGate();

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("vjb-intro-seen");
    if (!seen) setShowIntro(true);
  }, []);

  if (!mounted) return null;

  if (showIntro) {
    return <CinematicIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <StoryPageShell theme={theme} className="relative overflow-hidden text-text-primary">
      {ready && canRender3D ? <ArmillaryScrollController /> : <ArmillaryFallback />}

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.34em] text-accent-cyan">Current chapter</div>
            <h2 className="font-display text-3xl text-text-primary md:text-5xl">The mission is already in motion.</h2>
          </div>
          <div className="hidden text-[10px] uppercase tracking-[0.28em] text-text-muted md:block">Awakening • Build • Protect</div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CORE_MISSIONS.map(({ title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.7 }}
              className="scene-panel glass-panel rounded-[26px] p-5"
            >
              <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-accent-gold">{title}</div>
              <p className="text-base leading-7 text-text-secondary">{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 text-center md:grid-cols-4">
          {[
            { value: "800+", label: "ETL Pipelines" },
            { value: "30+", label: "Data Products" },
            { value: "~75%", label: "Effort Reduced" },
            { value: "80+", label: "AI Workshop Participants" },
          ].map(({ value, label }) => (
            <div key={label} className="glass-panel rounded-2xl px-4 py-5">
              <p className="font-display text-2xl font-bold text-gold-text md:text-3xl">
                {value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </StoryPageShell>
  );
}
