"use client";

import dynamic from "next/dynamic";
import { useCapabilityGate } from "@/components/home/armillary/useCapabilityGate";
import { LivingPaintingFallback } from "./LivingPaintingFallback";
import type { LivingPaintingProps } from "./types";

const LivingPaintingScene = dynamic(
  () => import("./LivingPaintingScene").then((m) => m.LivingPaintingScene),
  { ssr: false }
);

/**
 * Depth-displaced parallax painting, scroll-choreographed camera (drei
 * useScroll + a per-instance zustand store), desktop-only mouse parallax.
 * Falls back to a flat image + CSS parallax when useCapabilityGate rules
 * out 3D (reduced-motion, low cores, small coarse-pointer viewport, no
 * WebGL) — see LivingPaintingFallback for the content-parity fallback.
 */
export function LivingPainting(props: LivingPaintingProps) {
  const { ready, canRender3D } = useCapabilityGate();

  if (!ready) return <LivingPaintingFallback {...props} />;
  return canRender3D ? <LivingPaintingScene {...props} /> : <LivingPaintingFallback {...props} />;
}
