'use client';

import dynamic from 'next/dynamic';
import { usePortalWheel } from '@/components/Portal';
import PortalOverlay from '@/components/PortalOverlay';
import Preloader from '@/components/Preloader';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeStore } from '@/store/themeStore';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// WebGL can't be server-rendered.
const World = dynamic(() => import('@/components/World'), { ssr: false });

export default function Home() {
  const theme = useThemeStore((s) => s.theme);
  const reducedMotion = usePrefersReducedMotion();

  // Takes the wheel and Escape for as long as a portal is open.
  usePortalWheel();

  return (
    <>
      <World theme={theme} reducedMotion={reducedMotion} />

      {/* The painterly finish: canvas weave, warm wash, vignette. Doing it in CSS over
          the canvas rather than as a postprocessing pass costs nothing per frame, and
          it covers the captions too, so text and hall share one surface. */}
      <div className="finish" aria-hidden />

      {/* Above the finish layer: inside a portal, the words are the point. */}
      <PortalOverlay />

      <Preloader />
      <ThemeToggle />
    </>
  );
}
