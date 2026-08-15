"use client";

import { motion } from "framer-motion";
import { AnimatedSkillCard } from "./AnimatedSkillCard";
import { EnhancedButton } from "./EnhancedButton";
import { AnimatedTooltip } from "./AnimatedTooltip";

interface InteractiveCommandCenterProps {
  title?: string;
  subtitle?: string;
}

const commands = [
  {
    label: "ARCHITECT",
    description: "Design enterprise systems",
    action: "/architecture",
    hotkey: "⌘A",
    emoji: "🏗️",
  },
  {
    label: "BUILD",
    description: "Create scalable platforms",
    action: "/projects",
    hotkey: "⌘B",
    emoji: "🔨",
  },
  {
    label: "PROTECT",
    description: "Secure digital ecosystems",
    action: "/cybersecurity",
    hotkey: "⌘P",
    emoji: "🛡️",
  },
  {
    label: "STRATEGIZE",
    description: "Plan complex systems",
    action: "/about",
    hotkey: "⌘S",
    emoji: "🎯",
  },
  {
    label: "INNOVATE",
    description: "Build AI solutions",
    action: "/victories",
    hotkey: "⌘I",
    emoji: "✨",
  },
  {
    label: "LEAD",
    description: "Guide teams forward",
    action: "/contact",
    hotkey: "⌘L",
    emoji: "👥",
  },
];

export function InteractiveCommandCenter({
  title = "COMMAND CENTER",
  subtitle = "Core Actions",
}: InteractiveCommandCenterProps) {
  return (
    <div className="w-full py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background grid effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "40px 40px" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-wider"
            initial={{ letterSpacing: "0px" }}
            whileHover={{ letterSpacing: "4px" }}
            transition={{ duration: 0.3 }}
          >
            &gt; {title}
          </motion.h2>
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <p className="text-lg text-gray-400 font-mono">{subtitle}</p>
        </motion.div>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {commands.map((cmd, i) => (
            <motion.a
              key={cmd.label}
              href={cmd.action}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <AnimatedTooltip
                content={`Press ${cmd.hotkey}`}
                side="top"
              >
                <div className="relative overflow-hidden rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-purple-950/50 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 group-hover:border-blue-500/60 group-hover:bg-gradient-to-br group-hover:from-blue-900/70 group-hover:to-purple-900/70">
                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.3) 0px, rgba(59, 130, 246, 0.3) 1px, transparent 1px, transparent 2px)",
                      pointerEvents: "none",
                    }}
                    animate={{ backgroundPosition: ["0 0", "0 4px"] }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {cmd.emoji}
                    </motion.div>

                    <motion.h3
                      className="text-lg font-bold text-blue-300 mb-2 font-mono tracking-wider"
                      whileHover={{
                        color: "#fff",
                        letterSpacing: "2px",
                      }}
                    >
                      {cmd.label}
                    </motion.h3>

                    <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                      {cmd.description}
                    </p>

                    <motion.div
                      className="mt-4 text-xs text-gray-500 font-mono"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {cmd.hotkey}
                    </motion.div>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))",
                      pointerEvents: "none",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Bottom bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </AnimatedTooltip>
            </motion.a>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {[
            { label: "Projects Conquered", value: "15+" },
            { label: "Systems Architected", value: "30+" },
            { label: "Data Pipelines", value: "50+" },
            { label: "Security Audits", value: "20+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center border border-white/10 rounded-lg p-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
            >
              <motion.div
                className="text-3xl font-bold text-blue-400 mb-2"
                whileHover={{ scale: 1.2, color: "#a855f7" }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <EnhancedButton
            variant="primary"
            size="lg"
            href="/contact"
          >
            Initiate Contact Protocol
          </EnhancedButton>
        </motion.div>
      </div>
    </div>
  );
}
