"use client";

import { useEffect } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { CURIOSITY_THRESHOLD } from "@/data/easterEggs";

interface EasterEggListenerProps {
  onKonami: () => void;
}

export function EasterEggListener({ onKonami }: EasterEggListenerProps) {
  useKonamiCode(onKonami);

  // Track architecture node clicks for Curiosity achievement
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.type === "architecture-node-click") {
        const key = "vjb-arch-clicks";
        const clicked: string[] = JSON.parse(sessionStorage.getItem(key) ?? "[]");
        if (!clicked.includes(detail.nodeId)) {
          clicked.push(detail.nodeId);
          sessionStorage.setItem(key, JSON.stringify(clicked));
          if (clicked.length >= CURIOSITY_THRESHOLD) {
            window.dispatchEvent(new CustomEvent("vjb-curiosity-achievement"));
          }
        }
      }
    };
    window.addEventListener("vjb-arch-node-click", handler);
    return () => window.removeEventListener("vjb-arch-node-click", handler);
  }, []);

  return null;
}
