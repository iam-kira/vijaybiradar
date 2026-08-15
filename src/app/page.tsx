"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { HeroText } from "@/components/home/HeroText";
import { CTAButtons } from "@/components/home/CTAButtons";
import { FloatingWords } from "@/components/home/FloatingWords";

const ParticleBackground = dynamic(
  () => import("@/components/home/ParticleBackground").then((m) => m.ParticleBackground),
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
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <div className="cinematic-shell" aria-hidden="true" />
      <ParticleBackground />
      <FloatingWords />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24 md:px-10">
        <div className="relative w-full">
          <div className="absolute inset-x-0 top-8 mx-auto h-80 w-80 rounded-full bg-accent-blue/15 blur-[120px]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent-purple/20 blur-[110px]" aria-hidden="true" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-text-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent-gold shadow-[0_0_18px_rgba(245,158,11,0.8)]" />
              Vijay Biradar · Conqueror of Complexity
            </div>

            <HeroText />
            <CTAButtons />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {CORE_MISSIONS.map(({ title, text }) => (
                <div key={title} className="scene-panel group h-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.4)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/40 hover:bg-white/10">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-accent-gold">Mission</div>
                  <h3 className="mb-2 text-xl font-display font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-text-secondary">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="grid gap-4 border-t border-white/10 pt-8 text-center md:grid-cols-4">
          {[
            { value: "800+", label: "ETL Pipelines" },
            { value: "30+", label: "Data Products" },
            { value: "~75%", label: "Effort Reduced" },
            { value: "80+", label: "AI Workshop Participants" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm">
              <p className="font-display text-2xl font-bold text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold bg-clip-text md:text-3xl">
                {value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
