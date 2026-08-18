'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

/**
 * Reports real GLTF load progress from three's loading manager, which is the only thing
 * the visitor is actually waiting on.
 *
 * `active` is false both before loading starts and after it finishes, so it can only be
 * trusted once something has loaded — hence the `loaded > 0` guard. The timeout is the
 * backstop: a model that 404s must not strand the visitor on a stuck bar.
 */
const MAX_WAIT_MS = 15_000;

export default function Preloader() {
  const { active, progress, loaded } = useProgress();
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  const pct = done ? 100 : Math.min(Math.round(progress), 99);

  useEffect(() => {
    // Latched deliberately: a later load flipping `active` back on must not bring the
    // preloader back over a hall the visitor is already walking down.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loaded > 0 && !active) setDone(true);
  }, [active, loaded]);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), MAX_WAIT_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), 900);
    return () => clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${pct} percent`}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 100 100"
          className="mb-10"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            opacity="0.25"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={2 * Math.PI * 46 * (1 - pct / 100)}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 400ms cubic-bezier(0.22,0.61,0.36,1)' }}
          />
          <path
            d="M 50 32 L 59 45 L 72 41 L 63 50 L 72 59 L 59 55 L 50 68 L 41 55 L 28 59 L 37 50 L 28 41 L 41 45 Z"
            fill="var(--gold)"
            opacity="0.9"
          />
        </svg>

        <p className="mb-3 text-[0.65rem] font-light uppercase tracking-[0.45em] text-white/45">
          Vita
        </p>
        <p className="font-mono text-xs tabular-nums text-[color:var(--gold)]">
          {pct.toString().padStart(3, '0')}
        </p>
      </div>
    </div>
  );
}
