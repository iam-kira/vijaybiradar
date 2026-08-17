"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

const SAMPLE_SIZE = 256;

/**
 * Procedural depth-map approximation: no LeiaPix/Immersity step, no build
 * pipeline — just a luminance heuristic computed in-browser from the same
 * image used as the color texture. Bright/warm midtones read as "near",
 * dark edges/sky read as "far"; `depthBias` shifts that curve per painting
 * (e.g. a dark etching needs a different bias than a bright oil painting).
 * Drawing at a small fixed size doubles as a cheap blur — per-pixel noise
 * in the source photo doesn't survive the downscale.
 */
export function useDepthTexture(imageUrl: string, depthBias = 0): THREE.CanvasTexture | null {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      if (cancelled) return;

      const src = document.createElement("canvas");
      src.width = SAMPLE_SIZE;
      src.height = SAMPLE_SIZE;
      const sctx = src.getContext("2d")!;
      sctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const { data } = sctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

      const out = document.createElement("canvas");
      out.width = SAMPLE_SIZE;
      out.height = SAMPLE_SIZE;
      const octx = out.getContext("2d")!;
      const outData = octx.createImageData(SAMPLE_SIZE, SAMPLE_SIZE);

      for (let i = 0; i < data.length; i += 4) {
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        const depth = Math.min(1, Math.max(0, lum + depthBias));
        const v = Math.round(depth * 255);
        outData.data[i] = v;
        outData.data[i + 1] = v;
        outData.data[i + 2] = v;
        outData.data[i + 3] = 255;
      }
      octx.putImageData(outData, 0, 0);

      const tex = new THREE.CanvasTexture(out);
      tex.needsUpdate = true;
      setTexture(tex);
    };

    return () => {
      cancelled = true;
    };
  }, [imageUrl, depthBias]);

  return texture;
}
