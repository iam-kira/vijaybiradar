'use client';

import { scenes } from '@/data/scenes';

/**
 * The readable layer, laid out to line up with the corridor.
 *
 * Scene `i` is centred in view at scroll progress `i / (n - 1)`, which in a
 * `<Scroll html>` container of `n` pages lands exactly at `i * 100vh`. So each caption
 * is one viewport tall at that offset and needs no separate synchronisation.
 *
 * It stays real DOM text rather than 3D glyphs, so it remains selectable and reaches
 * search engines and screen readers.
 */
export default function SceneCaptions() {
  const pages = scenes.length;

  return (
    <div className="relative w-full" style={{ height: `${pages * 100}vh` }}>
      {scenes.map((scene, i) => (
        <section
          key={scene.id}
          aria-label={scene.title}
          className="absolute inset-x-0 flex h-screen flex-col items-center justify-center px-8 text-center"
          style={{ top: `${i * 100}vh` }}
        >
          {i === 0 ? (
            <>
              <h1 className="mb-8 text-6xl font-light tracking-[0.3em] text-[color:var(--foreground)] drop-shadow-[var(--caption-shadow)] md:text-8xl">
                VITA
              </h1>
              <p className="mb-4 max-w-md text-lg font-light tracking-wide text-[color:var(--foreground)]/75 drop-shadow-[var(--caption-shadow)] md:text-xl">
                {scene.subtitle}
              </p>
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--foreground)]/40">
                Vijay Biradar
              </p>

              <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-3">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-[color:var(--foreground)]/40">
                  Scroll
                </span>
                <svg
                  className="h-5 w-5 text-[color:var(--gold)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.25}
                    d="M19 14l-7 7m0 0l-7-7"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-5 text-4xl font-light tracking-[0.25em] text-[color:var(--foreground)] drop-shadow-[var(--caption-shadow)] sm:text-5xl md:text-7xl">
                {scene.title}
              </h2>
              <p className="max-w-xl text-base font-light leading-relaxed text-[color:var(--foreground)]/85 drop-shadow-[var(--caption-shadow)] md:text-xl">
                {scene.subtitle}
              </p>

              {scene.quote && (
                <figure className="mt-10 max-w-lg">
                  <blockquote className="text-sm font-light italic leading-relaxed text-[color:var(--foreground)]/65 drop-shadow-[var(--caption-shadow)] md:text-base">
                    &ldquo;{scene.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
                    {scene.quote.author}
                  </figcaption>
                </figure>
              )}
            </>
          )}
        </section>
      ))}

      {/* Sits in the lower part of the final viewport, under the last caption. */}
      <footer
        className="absolute inset-x-0 flex flex-col items-center gap-3 px-8 text-center"
        style={{ top: `${(pages - 1) * 100 + 74}vh` }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--foreground)]/40">
          Still climbing
        </p>
        <a
          href="mailto:vijaybiradar8273@gmail.com"
          className="pointer-events-auto text-sm tracking-wide text-[color:var(--gold)] underline-offset-8 hover:underline"
        >
          vijaybiradar8273@gmail.com
        </a>
      </footer>
    </div>
  );
}
