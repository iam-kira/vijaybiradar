"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrophyCard } from "@/components/victories/TrophyCard";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { achievements } from "@/data/achievements";

export default function VictoriesPage() {
  const theme = getStoryTheme("victories");

  return (
    <StoryPageShell theme={theme} className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Hall of Fame"
          subtitle="Where missions, impact, and proud moments are preserved."
          accent="gold"
        />

        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-accent-gold/25 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-purple/10 p-8 backdrop-blur-sm">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 04 · Hall of Fame</p>
            <h3 className="mb-4 font-display text-3xl text-white md:text-5xl">
              Every challenge conquered becomes a stepping stone to the next mission.
            </h3>
            <p className="text-base leading-8 text-text-secondary">
              This is not a trophy wall for vanity. It is a record of systems improved, problems
              solved, time saved, and trust earned. Vijay’s wins are built on execution, insight,
              and the discipline to keep moving when the environment becomes difficult.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { value: "800+", label: "ETL Pipelines" },
              { value: "30+", label: "Data Products" },
              { value: "~75%", label: "Effort Reduced" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="font-display text-3xl text-transparent bg-gradient-to-r from-accent-gold to-accent-blue bg-clip-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <TrophyCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </StoryPageShell>
  );
}
