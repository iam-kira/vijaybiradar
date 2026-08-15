"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroText } from "@/components/home/HeroText";
import { CTAButtons } from "@/components/home/CTAButtons";
import { ArmillarySphere } from "./ArmillarySphere";
import { ChapterOverlay } from "./ChapterOverlay";
import { ARMILLARY_CHAPTERS } from "./chapters";
import { useSound } from "@/hooks/useSound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Owns the scroll-driven Armillary hero: a pinned section whose scroll
 * progress (0-1) drives the r3f camera dolly + ring brighten sequence via a
 * mutable ref (no per-frame React state), and separately derives a discrete
 * activeChapter index (4 possible values) that drives the DOM overlay.
 */
export function ArmillaryScrollController() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const lastChapterRef = useRef(0);
  const { playSfx } = useSound();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const chapterIndex = Math.min(3, Math.floor(self.progress * 4));
        if (chapterIndex !== lastChapterRef.current) {
          lastChapterRef.current = chapterIndex;
          setActiveChapter(chapterIndex);
          if (ARMILLARY_CHAPTERS[chapterIndex].id === "security") playSfx("securityAlert");
        }
        if (self.progress > 0.98) playSfx("achievementUnlock");
      },
    });

    return () => trigger.kill();
  }, [playSfx]);

  return (
    <div ref={wrapperRef} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 1.5]}>
            <ArmillarySphere progressRef={progressRef} />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,9,6,0.15)_40%,rgba(11,9,6,0.9)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
          <div className="pointer-events-auto max-w-xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-text-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,162,39,0.8)]" />
              Vijay Biradar · Imperium
            </div>
            <HeroText />
            <CTAButtons />
          </div>
        </div>

        <ChapterOverlay activeChapter={activeChapter} />
      </div>
    </div>
  );
}
