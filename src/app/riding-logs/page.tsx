"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { rides } from "@/data/rides";
import { useSound } from "@/hooks/useSound";
import { useEffect } from "react";

export default function RidingLogsPage() {
  const { playSfx } = useSound();

  useEffect(() => {
    playSfx("engineStart");
  }, [playSfx]);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="The Road"
          subtitle="Some lessons are learned beyond the screen."
          accent="blue"
        />

        <div className="mb-10 rounded-3xl border border-accent-blue/25 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-gold/10 p-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 09 · The Road</p>
          <p className="text-base leading-8 text-text-secondary">
            Riding brings clarity. It strips the noise away and leaves only motion, attention, and the
            discipline to remain present. For Vijay, the road is a place of reflection and reset.
          </p>
        </div>

        {rides.length === 0 ? (
          <div className="card-base border-dashed border-white/20 p-12 text-center">
            <div className="text-5xl mb-4">🏍️</div>
            <p className="text-text-muted font-mono text-sm mb-2">
              [YOU FILL] — Add your riding routes in{" "}
              <code className="text-accent-blue">src/data/rides.ts</code>
            </p>
            <p className="text-text-muted text-xs">
              Each entry: routeName, distance, story, favoriteStop, imageSrc, coordinates (for map)
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {rides.map((ride, i) => (
              <motion.div
                key={ride.id}
                className="card-base card-glow p-6"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {ride.imageSrc && (
                  <img
                    src={ride.imageSrc}
                    alt={ride.routeName}
                    className="w-full h-48 object-cover rounded-lg mb-4 opacity-80"
                  />
                )}
                <h3 className="text-lg font-display font-bold text-text-primary">{ride.routeName}</h3>
                <div className="flex gap-4 mt-1 text-xs text-text-muted font-mono">
                  {ride.distance && <span>📍 {ride.distance}</span>}
                  {ride.date && <span>📅 {ride.date}</span>}
                </div>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{ride.story}</p>
                {ride.favoriteStop && (
                  <p className="mt-2 text-xs text-accent-blue font-mono">
                    ⭐ Favorite stop: {ride.favoriteStop}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
