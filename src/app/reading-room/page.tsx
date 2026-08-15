"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { motion } from "framer-motion";
import { quotes } from "@/data/quotes";

export default function ReadingRoomPage() {
  const theme = getStoryTheme("reading");

  return (
    <StoryPageShell theme={theme} className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="The Mind"
          subtitle="Books teach lessons that technology alone cannot."
          accent="purple"
        />

        <div className="mb-10 rounded-3xl border border-accent-purple/25 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-gold/10 p-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 06 · The Mind</p>
          <h3 className="mb-4 font-display text-3xl md:text-5xl text-white">
            Discipline is not only built in systems. It is built in thought.
          </h3>
          <p className="max-w-3xl text-base leading-8 text-text-secondary">
            Vijay reads to understand human nature, strategy, responsibility, and resilience. The books
            he returns to are not just references; they are lenses. They sharpen how he works,
            how he leads, and how he remains steady when complexity grows louder.
          </p>
        </div>

        <div className="grid gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={q.id}
              className="card-base card-glow p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-accent-purple uppercase tracking-widest border border-accent-purple/30 rounded px-2 py-0.5">
                  {q.theme}
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-display text-text-primary leading-relaxed mb-4">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              {q.attribution && (
                <p className="text-sm text-text-muted font-mono">— {q.attribution}</p>
              )}
              {q.reflection && (
                <p className="mt-4 text-text-secondary text-sm leading-relaxed border-l-2 border-accent-purple/30 pl-4">
                  {q.reflection}
                </p>
              )}
            </motion.div>
          ))}

          {/* YOU FILL placeholder */}
          <div className="card-base p-6 border-dashed border-white/20 text-center">
            <p className="text-text-muted text-sm font-mono">
              [YOU FILL] — Add 3–5 more quotes/books in{" "}
              <code className="text-accent-blue">src/data/quotes.ts</code>
            </p>
          </div>
        </div>
      </div>
    </StoryPageShell>
  );
}
