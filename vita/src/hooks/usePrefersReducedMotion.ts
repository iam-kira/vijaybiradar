'use client';

import { useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query. Server-renders as `false`, which is the safe default in
 * both current uses: no motion assumptions, and no fluid cursor until we know there is
 * a cursor.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Honours the OS "reduce motion" setting; the camera then tracks the wheel exactly. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True only for a real pointing device — a fluid cursor has nothing to follow on touch. */
export const useHasFinePointer = () => useMediaQuery('(pointer: fine)');
