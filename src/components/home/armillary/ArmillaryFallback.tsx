"use client";

import { motion } from "framer-motion";
import { HeroText } from "@/components/home/HeroText";
import { CTAButtons } from "@/components/home/CTAButtons";
import { ARMILLARY_CHAPTERS } from "./chapters";
import { BASE_PATH } from "@/lib/constants";

/**
 * Static/Framer-Motion 2D hero — served instead of the r3f Armillary when
 * useCapabilityGate rules out 3D (reduced-motion, low cores, small
 * coarse-pointer viewport, or no WebGL). No canvas, no scroll-scrubbed
 * camera — a plain fade-in-on-view reveal of the same four chapters.
 */
export function ArmillaryFallback() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-10 lg:pt-32">
      <div
        className="imperium-tint fixed inset-0 -z-10 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: `url("${BASE_PATH}/images/wallpaper/Conqure.jpg")` }}
        aria-hidden="true"
      />
      <div className="imperium-tint-overlay fixed -z-10" aria-hidden="true" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-text-secondary backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,162,39,0.8)]" />
            Vijay Biradar · Imperium
          </div>
          <HeroText />
          <CTAButtons />
        </div>

        <div className="relative flex min-h-[420px] flex-col justify-center gap-4">
          {ARMILLARY_CHAPTERS.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              className="glass-panel rounded-2xl p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="font-chapter text-lg text-gold-text">{chapter.numeral}</span>
                <h3 className="font-display text-lg text-text-primary">{chapter.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">{chapter.body}</p>
              <div className="mt-3 font-mono text-xs text-text-muted">
                <span className="text-gold-text">{chapter.stat.value}</span> {chapter.stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
