"use client";

import { motion } from "framer-motion";
import { IdentityCard } from "./IdentityCard";

const CARDS = [
  { icon: "⚙️", label: "Engineer", detail: "Building robust systems that scale across manufacturing plants." },
  { icon: "🏗️", label: "Platform Builder", detail: "DFL Cortex, observability platforms, self-healing pipelines." },
  { icon: "🤖", label: "AI Explorer", detail: "LLMs, MCP, RAG patterns, AI adoption across the enterprise." },
  { icon: "🔒", label: "Cybersecurity SPOC", detail: "Trusted advisor for production security topics across teams." },
  { icon: "📚", label: "Reader", detail: "Stoics, strategy, fiction, philosophy — always reading." },
  { icon: "🎮", label: "Gamer", detail: "Valorant, COD Ghosts. Aim is muscle memory. Incidents are reflex." },
  { icon: "🏍️", label: "Rider", detail: "Some problems are solved at the desk. Some on the road." },
  { icon: "🎻", label: "Violin Learner", detail: "Rhythm, precision, patience — the same in music and engineering." },
  { icon: "⛩️", label: "Anime Fan", detail: "Strategy, discipline, resilience — told one arc at a time." },
  { icon: "🤝", label: "Volunteer", detail: "Volunteer Lead, Women and Children Welfare Association, since 2017." },
];

export function MeaningSection() {
  return (
    <div>
      {/* Copy */}
      <motion.div
        className="space-y-6 text-text-secondary text-lg leading-relaxed mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p>
          <span className="text-accent-gold font-display font-semibold text-xl">Vijay Biradar</span> is
          an <em className="text-text-primary">Enterprise Data Engineer</em> and{" "}
          <em className="text-text-primary">AI Platform Builder</em> focused on solving
          complex systems challenges at scale.
        </p>
        <p>
          Vijay thrives on turning chaos into momentum. By day, he designs enterprise platforms
          that bring clarity to complexity. By intent, he builds the future behind the scenes—
          architecting resilient systems, mentoring teams, and creating innovation through discipline
          and continuous learning.
        </p>
        <p className="text-accent-blue font-mono text-sm tracking-widest border-l-2 border-accent-blue pl-4">
          Building enterprise platforms. Creating systems that matter. Living the story.
        </p>
      </motion.div>

      {/* Identity cards */}
      <div>
        <h3 className="text-text-secondary text-sm font-mono uppercase tracking-widest mb-6">
          Who I Am — Hover or tap a card
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <IdentityCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
