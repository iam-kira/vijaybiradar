import type { ReactNode } from "react";

export interface PaintingCaption {
  /** Caption text, timed to read as if spoken as the camera pushes in. */
  text: string;
  /** Scroll progress (0-1) at which this caption becomes active in the 3D path. */
  at: number;
}

export type LivingPaintingMode = "push-in" | "procession";

export interface LivingPaintingProps {
  /** Path under public/images/paintings, e.g. "/images/paintings/x.jpg" — BASE_PATH is applied internally. */
  image: string;
  alt: string;
  captions?: PaintingCaption[];
  mode?: LivingPaintingMode;
  /** Scroll track length in vh — how far the user scrolls through this painting. */
  heightVh?: number;
  /** Depth-heuristic tuning: -1..1, shifts which luminance range reads as "near". */
  depthBias?: number;
  /** Procession mode: real content (achievements, wins) slotted into the horizontal track. */
  children?: ReactNode;
  className?: string;
}
