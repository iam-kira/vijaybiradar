import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { useRef } from "react";

interface PaintingState {
  /** 0-1 scroll progress through this painting's track, written every frame — read it, don't subscribe to it, in useFrame. */
  progress: number;
  setProgress: (p: number) => void;
  /** Normalized mouse position (-1..1), desktop pointer:fine only. */
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;
}

function createPaintingStore() {
  return createStore<PaintingState>((set) => ({
    progress: 0,
    setProgress: (progress) => set({ progress }),
    pointer: { x: 0, y: 0 },
    setPointer: (x, y) => set({ pointer: { x, y } }),
  }));
}

export type PaintingStore = ReturnType<typeof createPaintingStore>;

/** One isolated store per LivingPainting mount — never a shared singleton. */
export function usePaintingStore() {
  const storeRef = useRef<PaintingStore>();
  if (!storeRef.current) storeRef.current = createPaintingStore();
  return storeRef.current;
}

export { useStore };
