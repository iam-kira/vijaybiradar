'use client';

/**
 * The readable half of a portal. The 3D interior supplies the space; this supplies the
 * words, as real selectable DOM over it — the same division SceneCaptions already makes
 * against the hall.
 *
 * Which entry is showing is derived from the same 0–1 progress the interior moves on, so
 * the text and the space advance together without a second source of truth.
 */

import { useEffect, useRef } from 'react';
import { milestones, projects } from '@/data/portals';
import { usePortalStore } from './Portal';

/** Maps 0–1 onto an index, with the last entry holding the top of the range. */
const indexAt = (progress: number, count: number) =>
  Math.min(Math.floor(progress * count), count - 1);

export default function PortalOverlay() {
  const active = usePortalStore((s) => s.active);
  const progress = usePortalStore((s) => s.progress);
  const close = usePortalStore((s) => s.close);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Entering a portal moves focus into it, so Escape and Tab have somewhere sensible to
  // start and a keyboard visitor is not left behind in the hall.
  useEffect(() => {
    if (active) closeButton.current?.focus();
  }, [active]);

  if (!active) return null;

  const isJourney = active === 'journey';
  const entries = isJourney ? milestones : projects;
  const index = indexAt(progress, entries.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isJourney ? 'Journey' : 'Build'}
      className="fixed inset-0 z-30 flex flex-col justify-between px-8 py-10 md:px-16"
    >
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-light tracking-[0.3em] text-[color:var(--foreground)] drop-shadow-[var(--caption-shadow)] md:text-5xl">
            {isJourney ? 'JOURNEY' : 'BUILD'}
          </h2>
          <p className="mt-2 font-mono text-xs tabular-nums text-[color:var(--gold)]">
            {String(index + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </p>
        </div>

        <button
          ref={closeButton}
          onClick={close}
          className="rounded-full border border-[color:var(--foreground)]/20 bg-[color:var(--background)]/40 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--foreground)]/80 backdrop-blur-md transition-colors hover:border-[color:var(--gold)]/60"
        >
          Close
          <span className="ml-3 opacity-50">Esc</span>
        </button>
      </header>

      <div className="max-w-2xl pb-16">
        {isJourney ? (
          <>
            <p className="font-mono text-sm tracking-[0.3em] text-[color:var(--gold)]">
              {milestones[index].year}
            </p>
            <h3 className="mt-3 text-2xl font-light tracking-wide text-[color:var(--foreground)] drop-shadow-[var(--caption-shadow)] md:text-4xl">
              {milestones[index].title}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-[color:var(--foreground)]/50">
              {milestones[index].where}
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-[color:var(--foreground)]/85 drop-shadow-[var(--caption-shadow)]">
              {milestones[index].detail}
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[color:var(--gold)]">
              {projects[index].kind}
            </p>
            <h3 className="mt-3 text-2xl font-light tracking-wide text-[color:var(--foreground)] drop-shadow-[var(--caption-shadow)] md:text-4xl">
              {projects[index].title}
            </h3>
            <p className="mt-5 text-base font-light leading-relaxed text-[color:var(--foreground)]/85 drop-shadow-[var(--caption-shadow)]">
              {projects[index].detail}
            </p>
            <p className="mt-5 border-l border-[color:var(--gold)]/50 pl-4 text-sm tracking-wide text-[color:var(--gold)]">
              {projects[index].result}
            </p>
          </>
        )}

        <p className="mt-10 text-[0.6rem] uppercase tracking-[0.35em] text-[color:var(--foreground)]/40">
          Scroll to continue
        </p>
      </div>
    </div>
  );
}
