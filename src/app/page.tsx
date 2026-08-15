"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
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

const WALLPAPER_STORIES = [
  { title: "Silent precision", src: "/images/wallpaper/Conqure.jpg" },
  { title: "Shadow mode", src: "/images/wallpaper/dark death note.png" },
  { title: "Final form", src: "/images/wallpaper/solo.png" },
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
      <div className="absolute inset-0 bg-cover bg-center opacity-35 grayscale" style={{ backgroundImage: 'url("/images/wallpaper/Conqure.jpg")' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,7,12,0.12)_28%,rgba(4,7,12,0.82)_100%)]" />
      <div className="cinematic-shell" aria-hidden="true" />
      <ParticleBackground />
      <FloatingWords />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-10 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-text-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent-gold shadow-[0_0_18px_rgba(245,158,11,0.8)]" />
              Vijay Biradar · Conqueror of Complexity
            </div>

            <HeroText />
            <CTAButtons />

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { value: "800+", text: "ETL pipelines" },
                { value: "30+", text: "data products" },
                { value: "75%", text: "efficiency lift" },
              ].map(({ value, text }) => (
                <div key={value} className="glass-panel rounded-2xl px-4 py-3">
                  <div className="font-display text-2xl font-bold text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold bg-clip-text">
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-text-secondary">{text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="relative flex min-h-[520px] items-center justify-center"
          >
            <div className="hero-orbit hero-orbit-1" aria-hidden="true" />
            <div className="hero-orbit hero-orbit-2" aria-hidden="true" />

            <div className="story-stack w-full max-w-[540px]">
              {WALLPAPER_STORIES.map((story, index) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, x: 18, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.12, duration: 0.6, ease: "easeOut" }}
                  className="story-card glass-panel relative overflow-hidden rounded-[22px] p-2"
                >
                  <div
                    className="relative h-24 rounded-[14px] bg-cover bg-center"
                    style={{ backgroundImage: `url("${story.src}")` }}
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] uppercase tracking-[0.26em] text-white/80 backdrop-blur-sm">
                    {story.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.34em] text-accent-cyan">Current chapter</div>
            <h2 className="font-display text-3xl text-white md:text-5xl">The mission is already in motion.</h2>
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
              <p className="font-display text-2xl font-bold text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold bg-clip-text md:text-3xl">
                {value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
