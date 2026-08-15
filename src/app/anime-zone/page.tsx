"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { animeList, animeThemes } from "@/data/anime";
import {
  FlameIcon,
  ChessPawnIcon,
  CrossedSwordsIcon,
  HandshakeIcon,
  ChartUpIcon,
  FlexArmIcon,
  StarIcon,
  LaurelArchIcon,
  type IconProps,
} from "@/components/icons";
import type { ComponentType } from "react";

const THEME_ICONS: Record<string, ComponentType<IconProps>> = {
  Persistence: FlameIcon,
  Strategy: ChessPawnIcon,
  Discipline: CrossedSwordsIcon,
  Friendship: HandshakeIcon,
  Growth: ChartUpIcon,
  "Never Giving Up": FlexArmIcon,
};

export default function AnimeZonePage() {
  const theme = getStoryTheme("anime");

  return (
    <StoryPageShell theme={theme} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          numeral="XIII"
          title="Anime Zone"
          subtitle="Anime is not just entertainment. It is storytelling about resilience, ambition, loyalty, and growth."
          accent="purple"
        />

        {/* Themes */}
        <div className="mb-12">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4 text-center">Core Lessons</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {animeThemes.map((theme, i) => {
              const ThemeIcon = THEME_ICONS[theme] ?? StarIcon;
              return (
                <motion.div
                  key={theme}
                  className="card-base px-4 py-2 flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(91,58,110,0.5)" }}
                >
                  <ThemeIcon className="text-gold-text" aria-hidden="true" />
                  <span className="text-text-secondary">{theme}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Anime cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animeList.map((anime, i) => (
            <motion.div
              key={anime.id}
              className="card-base card-glow overflow-hidden relative halftone-overlay group"
              initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                x: [0, -2, 2, -1, 0],
                transition: { duration: 0.15 },
              }}
            >
              {/* Poster */}
              {anime.posterSrc ? (
                <img
                  src={anime.posterSrc}
                  alt={anime.title}
                  className="w-full h-40 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 flex items-center justify-center">
                  <LaurelArchIcon className="text-4xl text-gold-text" aria-hidden="true" />
                </div>
              )}

              {/* Impact frame flash on hover */}
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: [0, 0.08, 0] }}
                transition={{ duration: 0.08 }}
              />

              <div className="relative z-10 p-4">
                <span className="text-xs font-mono text-accent-purple border border-accent-purple/30 rounded px-2 py-0.5">
                  {anime.lessonTag}
                </span>
                <h4 className="mt-2 text-base font-display font-bold text-text-primary">{anime.title}</h4>
                <p className="mt-1 text-xs text-text-secondary leading-relaxed">{anime.blurb}</p>
              </div>
            </motion.div>
          ))}

          {/* YOU FILL slot */}
          <div className="card-base border-dashed border-white/20 flex items-center justify-center p-6 text-center min-h-[240px]">
            <p className="text-text-muted text-xs font-mono">
              [YOU FILL]<br />Add more anime in<br />
              <code className="text-accent-purple">src/data/anime.ts</code>
            </p>
          </div>
        </div>
      </div>
    </StoryPageShell>
  );
}
