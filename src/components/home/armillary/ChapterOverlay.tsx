"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ARMILLARY_CHAPTERS } from "./chapters";

/**
 * Plain DOM overlay, not rendered inside the <Canvas> — keeps chapter
 * copy in the accessibility tree and indexable by search engines.
 * Driven by a discrete activeChapter index, not per-frame scroll progress.
 */
export function ChapterOverlay({ activeChapter }: { activeChapter: number }) {
  const chapter = ARMILLARY_CHAPTERS[activeChapter];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 flex justify-center px-6 md:bottom-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          className="glass-panel pointer-events-auto max-w-md rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="font-chapter text-xl text-gold-text">{chapter.numeral}</span>
            <h3 className="font-display text-xl text-text-primary">{chapter.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">{chapter.body}</p>
          <div className="mt-3 font-mono text-xs text-text-muted">
            <span className="text-gold-text">{chapter.stat.value}</span> {chapter.stat.label}
          </div>
        </motion.div>
      </AnimatePresence>

      <ol className="sr-only">
        {ARMILLARY_CHAPTERS.map((c) => (
          <li key={c.id}>
            {c.numeral}. {c.title} — {c.body}
          </li>
        ))}
      </ol>
    </div>
  );
}
