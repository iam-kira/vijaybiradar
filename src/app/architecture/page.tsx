"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectSection } from "@/components/architecture/ProjectSection";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { projects } from "@/data/projects";

export default function ArchitecturePage() {
  const theme = getStoryTheme("architecture");

  return (
    <StoryPageShell theme={theme} className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          numeral="IV"
          title="The Aqueducts"
          subtitle="Modern engineering is not just about code. It is about designing clarity into complexity."
          accent="blue"
        />

        <div className="mb-12 rounded-3xl border border-accent-blue/25 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-cyan/10 p-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 04 · The System</p>
          <h3 className="max-w-3xl font-display text-3xl md:text-5xl text-white">
            Vijay builds platforms that hold under pressure and scale with intent.
          </h3>
        </div>

        <div className="space-y-20">
          {projects.map((project, i) => (
            <ProjectSection key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </StoryPageShell>
  );
}
