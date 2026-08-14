"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrophyCard } from "@/components/victories/TrophyCard";
import { achievements } from "@/data/achievements";

export default function VictoriesPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Hall of Victories"
          subtitle="Every achievement is a milestone in the journey. Unlock them all."
          accent="gold"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <TrophyCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
