"use client";

import { useEffect, useRef, useCallback } from "react";
import { KONAMI_SEQUENCE } from "@/data/easterEggs";

export function useKonamiCode(onActivate: () => void) {
  const bufferRef = useRef<string[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      bufferRef.current = [...bufferRef.current, e.key].slice(-KONAMI_SEQUENCE.length);
      if (
        bufferRef.current.length === KONAMI_SEQUENCE.length &&
        bufferRef.current.every((k, i) => k === KONAMI_SEQUENCE[i])
      ) {
        bufferRef.current = [];
        onActivate();
      }
    },
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
