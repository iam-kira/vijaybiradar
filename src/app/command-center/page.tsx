"use client";

import { motion } from "framer-motion";
import { SkillsShowcase } from "@/components/shared/SkillsShowcase";
import { InteractiveCommandCenter } from "@/components/shared/InteractiveCommandCenter";
import { CursorTrail } from "@/components/shared/CursorTrail";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const METRICS = [
  { value: 800, suffix: "+", label: "ETL Pipelines Owned", sublabel: "Across Germany & India" },
  { value: 30, suffix: "+", label: "Enterprise Data Products", sublabel: "Built and delivered" },
  { value: 75, suffix: "%", prefix: "~", label: "Manual Monitoring Reduced", sublabel: "Via observability platform" },
  { value: 80, suffix: "+", label: "AI Workshop Participants", sublabel: "Managers, architects, POs, tech leads" },
  { value: 3, suffix: "+", label: "Years at Daimler Truck", sublabel: "Innovation Center India" },
  { value: 5, suffix: "", prefix: "3–", label: "Auto-Recoveries Daily", sublabel: "Self-healing framework" },
];

export default function CommandCenterPage() {
  const theme = getStoryTheme("command");

  return (
    <>
      <CursorTrail />
      <StoryPageShell theme={theme} className="relative overflow-hidden">
        {/* Enhanced Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-20 pb-10 text-center max-w-6xl mx-auto px-6"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ letterSpacing: "0.05em" }}
            whileHover={{ letterSpacing: "0.1em" }}
          >
            COMMAND CENTER
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Engineering systems that power manufacturing ecosystems across continents
          </p>
        </motion.div>

        {/* Interactive Actions */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <InteractiveCommandCenter
            title="CORE ACTIONS"
            subtitle="Mission Objectives"
          />
        </motion.section>

        {/* Existing Metrics Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Impact by Numbers
          </motion.h2>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {METRICS.map(({ value, suffix, prefix, label, sublabel }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-base card-glow p-6 relative overflow-hidden group border border-white/10 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm"
              >
                {/* Pulse dot */}
                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

                <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-transparent">
                  <AnimatedCounter
                    target={value}
                    suffix={suffix}
                    prefix={prefix ?? ""}
                  />
                </div>
                <p className="mt-2 text-text-primary font-semibold">{label}</p>
                <p className="text-xs text-text-muted mt-1">{sublabel}</p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SkillsShowcase
            title="Technical Arsenal"
            subtitle="Skills that conquer complexity in every dimension"
            showGrid={true}
            showBento={true}
          />
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 px-4 text-center border-t border-white/10 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to conquer complexity together?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            These capabilities are battle-tested and ready to deploy.
          </p>
        </motion.section>
      </StoryPageShell>
    </>
  );
}
