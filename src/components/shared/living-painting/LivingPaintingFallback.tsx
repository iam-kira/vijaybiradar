"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BASE_PATH } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { LivingPaintingProps } from "./types";

/**
 * Static/CSS-parallax stand-in for the r3f LivingPainting — used whenever
 * useCapabilityGate rules out 3D (reduced-motion, low cores, small
 * coarse-pointer viewport, or no WebGL). Shows every caption as plain
 * visible text (not motion-revealed) so the fallback carries the same
 * content as the 3D path, not just the same image.
 */
export function LivingPaintingFallback({
  image,
  alt,
  captions,
  mode = "push-in",
  heightVh = 140,
  className = "",
  children,
}: LivingPaintingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-4%", "4%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], reducedMotion ? [1, 1, 1, 1] : [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[28px] ${className}`} style={{ minHeight: `${heightVh}vh` }}>
      <motion.img
        src={`${BASE_PATH}${image}`}
        alt={alt}
        className="imperium-tint absolute inset-0 h-full w-full object-cover"
        style={{ y, opacity }}
      />
      <div className="imperium-tint-overlay absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,9,6,0.1)_0%,rgba(11,9,6,0.75)_100%)]" />

      {captions && captions.length > 0 && (
        <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-6 md:p-10">
          {captions.map((c) => (
            <p
              key={c.text}
              className="glass-panel max-w-xl rounded-2xl px-5 py-3 font-display text-lg leading-snug text-text-primary md:text-xl"
            >
              {c.text}
            </p>
          ))}
        </div>
      )}

      {mode === "procession" && children && (
        <div className="relative z-10 flex gap-4 overflow-x-auto p-6 md:p-10">{children}</div>
      )}
      {mode === "push-in" && children}
    </div>
  );
}
