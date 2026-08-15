"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSkillCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  category: "engineering" | "design" | "security" | "leadership";
  delay?: number;
  glowColor?: string;
}

const categoryColors = {
  engineering: "from-blue-500 to-cyan-500",
  design: "from-purple-500 to-pink-500",
  security: "from-red-500 to-orange-500",
  leadership: "from-yellow-500 to-amber-500",
};

const glowColorMap = {
  engineering: "rgba(59, 130, 246, 0.5)",
  design: "rgba(168, 85, 247, 0.5)",
  security: "rgba(239, 68, 68, 0.5)",
  leadership: "rgba(234, 179, 8, 0.5)",
};

export function AnimatedSkillCard({
  title,
  description,
  icon,
  category,
  delay = 0,
  glowColor,
}: AnimatedSkillCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const boxShadow = useMotionTemplate`0 0 30px ${
    glowColor || glowColorMap[category]
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          boxShadow,
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Main card */}
      <motion.div
        className={`relative rounded-lg border border-white/10 bg-gradient-to-br ${categoryColors[category]} bg-opacity-5 backdrop-blur-sm p-6 overflow-hidden transition-all duration-300 group-hover:border-white/20`}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(255,255,255,0.3)",
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${glowColor || glowColorMap[category]} 0%, transparent 100%)`,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {icon && (
            <motion.div
              className="w-12 h-12 mb-4 text-2xl"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {icon}
            </motion.div>
          )}

          <motion.h3
            className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
            style={{
              backgroundImage: `linear-gradient(135deg, ${glowColor || glowColorMap[category]} 0%, rgba(255,255,255,0.5) 100%)`,
            }}
            whileHover={{ letterSpacing: "0.05em" }}
          >
            {title}
          </motion.h3>

          <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
            {description}
          </p>
        </div>

        {/* Hover trail effect */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100"
          style={{
            backgroundImage: `linear-gradient(90deg, ${glowColor || glowColorMap[category]}, transparent)`,
          }}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}
