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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <FloatingWords />

      <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <HeroText />
        <CTAButtons />
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex gap-8 md:gap-16 text-center">
          {[
            { value: "800+", label: "ETL Pipelines" },
            { value: "30+", label: "Data Products" },
            { value: "~75%", label: "Effort Reduced" },
            { value: "80+", label: "AI Workshop Participants" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-xs text-text-muted mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
