"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function probeWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * Gates the 3D Armillary hero behind real device capability, not just a
 * feature-detect. Any of these disqualifies: reduced-motion preference,
 * low core count, a small coarse-pointer (mobile) viewport, or no WebGL.
 */
export function useCapabilityGate(): { ready: boolean; canRender3D: boolean } {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const lowCores = (navigator.hardwareConcurrency ?? 8) < 4;
    const coarseSmall = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;
    const hasWebGL = probeWebGL();

    setCanRender3D(!reducedMotion && !lowCores && !coarseSmall && hasWebGL);
    setReady(true);
  }, [reducedMotion]);

  return { ready, canRender3D };
}
