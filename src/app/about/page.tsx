"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { MeaningSection } from "@/components/identity/MeaningSection";

const MISSION_PILLARS = [
  { label: "Architect", value: "Designing enterprise systems that create order from complexity." },
  { label: "Builder", value: "Turning ideas into scalable, resilient digital platforms." },
  { label: "Guardian", value: "Protecting systems with awareness, discipline, and foresight." },
  { label: "Strategist", value: "Connecting decisions to impact, risk, and long-term value." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="The Mission"
          subtitle="Understanding systems became a passion. Solving them became a profession."
          accent="purple"
        />

        <div className="mb-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_20px_50px_rgba(59,130,246,0.08)]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-accent-gold">
              Chapter 03 · The Mission
            </p>
            <h3 className="mb-5 max-w-xl font-display text-3xl md:text-5xl text-white">
              Vijay Biradar is a calm operator in a chaotic system.
            </h3>
            <p className="mb-4 text-base leading-8 text-text-secondary">
              He enters complexity with clarity. He studies the flow, identifies the weak points,
              and builds structure where others see noise. His work spans data engineering,
              AI enablement, secure operational design, and enterprise-scale problem solving.
            </p>
            <p className="text-base leading-8 text-text-secondary">
              Every system he touches is shaped by discipline, strategy, and the belief that real
              engineering is not about code alone — it is about impact, resilience, and trust.
            </p>
          </div>

          <div className="rounded-3xl border border-accent-purple/30 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10 p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-accent-cyan">Mission brief</p>
            <div className="space-y-4">
              {MISSION_PILLARS.map((pillar) => (
                <div key={pillar.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-1 font-display text-xl text-white">{pillar.label}</p>
                  <p className="text-sm leading-6 text-text-secondary">{pillar.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MeaningSection />
      </div>
    </div>
  );
}
