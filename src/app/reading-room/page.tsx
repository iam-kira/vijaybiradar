"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { quotes } from "@/data/quotes";

export default function ReadingRoomPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Reading Room"
          subtitle="Words that shaped how I think about work, life, and what it means to act with purpose."
          accent="purple"
        />
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
    </div>
  );
}
