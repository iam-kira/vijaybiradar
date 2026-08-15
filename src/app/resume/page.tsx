"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { experience, skills, awards, education, languages, volunteering, additionalProjects } from "@/data/resume";
import { TrophyIcon } from "@/components/icons";

export default function ResumePage() {
  const [expandedBullets, setExpandedBullets] = useState<number[]>([]);
  const theme = getStoryTheme("resume");

  const toggleBullet = (i: number) =>
    setExpandedBullets((prev) => prev.includes(i) ? prev.filter((b) => b !== i) : [...prev, i]);

  return (
    <StoryPageShell theme={theme} className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          numeral="VII"
          title="Cursus Honorum"
          subtitle="Behind every achievement is a history of discipline, growth, and execution."
          accent="blue"
        />

        <div className="mb-12 rounded-3xl border border-accent-blue/25 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-gold/10 p-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 11 · The Record</p>
          <h3 className="mb-4 font-display text-3xl md:text-5xl text-white">
            The proof sits in the systems built, the teams supported, and the problems solved.
          </h3>
        </div>

        <div className="mb-12 flex justify-center">
          <a
            href="/vijaybiradar/resume/Vijay_Biradar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:shadow-glow-blue hover:scale-105 transition-all"
          >
            ↓ Download Resume PDF
          </a>
        </div>

        {/* Experience timeline */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">Experience</h3>
          {experience.map((exp) => (
            <div key={exp.company} className="card-base p-6 relative border-l-2 border-accent-blue/50">
              <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-accent-blue" />
              <div className="flex flex-wrap justify-between gap-2 mb-1">
                <h4 className="text-lg font-display font-bold text-text-primary">{exp.company}</h4>
                <span className="text-xs font-mono text-text-muted border border-white/10 rounded px-2 py-0.5">{exp.period}</span>
              </div>
              <p className="text-accent-blue text-sm font-mono mb-1">{exp.title}</p>
              <p className="text-text-muted text-xs mb-4 font-mono">{exp.location}</p>
              <div className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="flex w-full gap-2 text-left cursor-pointer group"
                    onClick={() => toggleBullet(i)}
                    aria-expanded={expandedBullets.includes(i)}
                    whileHover={{ x: 3 }}
                  >
                    <span className="text-accent-blue mt-0.5 flex-shrink-0 text-xs" aria-hidden="true">▸</span>
                    <p className={`text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors ${expandedBullets.includes(i) ? "" : "line-clamp-2"}`}>
                      {bullet}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Skills matrix */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((group) => (
              <div key={group.group} className="card-base p-4">
                <p className="text-xs font-mono text-accent-blue mb-3">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs text-text-secondary bg-white/5 border border-white/10 rounded px-2 py-0.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">Awards</h3>
          <div className="space-y-4">
            {awards.map((award) => (
              <div key={award.title} className="card-base p-4 flex gap-4 items-start">
                <TrophyIcon className="text-2xl text-gold-text" aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-text-primary">{award.title}</p>
                    <span className="text-xs font-mono text-accent-gold border border-accent-gold/30 rounded px-1.5 py-0.5">{award.year}</span>
                  </div>
                  {award.description && <p className="text-xs text-text-secondary mt-1">{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Projects */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">Additional Projects</h3>
          <div className="space-y-4">
            {additionalProjects.map((proj) => (
              <div key={proj.title} className="card-base p-5">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-text-primary">{proj.title}</h4>
                  <span className="text-xs font-mono text-text-muted">{proj.period}</span>
                </div>
                {proj.highlight && (
                  <span className="text-xs font-mono text-accent-green border border-accent-green/30 rounded px-2 py-0.5 mb-2 inline-block">
                    {proj.highlight}
                  </span>
                )}
                <p className="text-xs text-text-secondary leading-relaxed mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education, Languages, Volunteering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="card-base p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Education</h3>
            {education.map((ed) => (
              <div key={ed.degree}>
                <p className="text-sm font-bold text-text-primary">{ed.degree}</p>
                <p className="text-xs text-text-secondary mt-1">{ed.institution}</p>
                <p className="text-xs text-text-muted font-mono mt-0.5">{ed.period} · {ed.location}</p>
              </div>
            ))}
          </section>

          <section className="card-base p-5">
            <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Languages</h3>
            <div className="space-y-2">
              {languages.map((l) => (
                <div key={l.language} className="flex justify-between text-sm">
                  <span className="text-text-primary">{l.language}</span>
                  <span className="text-text-muted text-xs font-mono">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="card-base p-5 mt-6">
          <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Volunteering</h3>
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <p className="text-sm font-bold text-text-primary">{volunteering.role} — {volunteering.organization}</p>
            <span className="text-xs font-mono text-text-muted">{volunteering.period}</span>
          </div>
          <ul className="space-y-1 mt-2">
            {volunteering.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-xs text-text-secondary">
                <span className="text-accent-green flex-shrink-0">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </StoryPageShell>
  );
}
