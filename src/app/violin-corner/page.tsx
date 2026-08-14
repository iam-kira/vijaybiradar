"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSound } from "@/hooks/useSound";

const NOTES = ["♩", "♪", "♫", "♬"];

export default function ViolinCornerPage() {
  const { playSfx } = useSound();

  return (
    <div className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Floating music notes background */}
      {NOTES.map((note, i) => (
        <motion.div
          key={i}
          className="absolute text-accent-purple/20 text-4xl pointer-events-none select-none"
          style={{ left: `${10 + i * 22}%`, top: `${20 + (i % 2) * 30}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, -5, 0],
          }}
          transition={{ duration: 4 + i, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {note}
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          title="Violin Corner"
          subtitle="Data flows by day. Strings flow by evening."
          accent="purple"
        />

        <motion.div
          className="card-base p-8 space-y-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-6xl mb-4">🎻</div>

          <blockquote className="text-xl font-display text-text-primary leading-relaxed">
            &ldquo;I play violin sometimes, not as a performer, but as a learner. It reminds me
            that rhythm, precision, and patience matter both in music and engineering.&rdquo;
          </blockquote>

          <p className="text-text-muted italic text-sm font-mono">
            &ldquo;Debugging code and learning violin have one thing in common: the first output
            is rarely production-ready.&rdquo;
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {["Rhythm", "Precision", "Patience", "Learning"].map((val) => (
              <span
                key={val}
                className="text-xs font-mono text-accent-purple border border-accent-purple/30 rounded-full px-3 py-1"
              >
                {val}
              </span>
            ))}
          </div>

          {/* Audio sample button */}
          <div>
            <button
              onClick={() => playSfx("violinNote")}
              className="mt-4 px-6 py-2.5 rounded-full border border-accent-purple/40 bg-accent-purple/10 text-accent-purple text-sm font-mono hover:bg-accent-purple/20 hover:shadow-glow-purple transition-all"
            >
              🎵 Play a Note
            </button>
            <p className="text-[10px] text-text-muted mt-2">
              [YOU FILL] — Replace <code className="text-accent-purple">violin-note.mp3</code> with a real practice recording
            </p>
          </div>
        </motion.div>

        {/* Floating notes animation */}
        <div className="flex justify-center gap-6 mt-8">
          {NOTES.map((note, i) => (
            <motion.span
              key={i}
              className="text-accent-purple/40 text-2xl"
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2 + i * 0.5, delay: i * 0.3, repeat: Infinity }}
            >
              {note}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
