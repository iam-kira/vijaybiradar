"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { EnvelopeIcon, BriefcaseIcon, GithubMarkIcon } from "@/components/icons";

export default function ContactPage() {
  const theme = getStoryTheme("contact");

  return (
    <StoryPageShell theme={theme} className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          numeral="VIII"
          title="The Forum"
          subtitle="Every great journey begins with a conversation."
          accent="blue"
        />

        <div className="mb-10 rounded-3xl border border-accent-gold/25 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-purple/10 p-8 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 12 · The Call</p>
          <h3 className="font-display text-3xl text-white md:text-5xl">
            If the mission matters, the next step should begin with a conversation.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:vijaybiradar.work@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            <EnvelopeIcon aria-hidden="true" /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/vijay-biradar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            <BriefcaseIcon aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://github.com/iam-kira"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            <GithubMarkIcon aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </StoryPageShell>
  );
}
