"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChromaticAberrationProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function ChromaticAberration({
  children,
  intensity = 2,
  className = "",
}: ChromaticAberrationProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
      }}
      whileHover={{
        filter: [
          "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
          `drop-shadow(${intensity}px 0 0 rgb(239, 68, 68)) drop-shadow(-${intensity}px 0 0 rgb(34, 211, 238))`,
          "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
        ],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
}

interface CinematicGlowProps {
  children: ReactNode;
  color?: "blue" | "purple" | "cyan" | "gold";
  intensity?: "subtle" | "medium" | "intense";
  className?: string;
}

const GLOW_COLORS = {
  blue: "rgba(59, 130, 246, 0.6)",
  purple: "rgba(139, 92, 246, 0.6)",
  cyan: "rgba(34, 211, 238, 0.6)",
  gold: "rgba(245, 158, 11, 0.6)",
};

const GLOW_INTENSITIES = {
  subtle: "0 0 20px",
  medium: "0 0 40px",
  intense: "0 0 60px",
};

export function CinematicGlow({
  children,
  color = "blue",
  intensity = "medium",
  className = "",
}: CinematicGlowProps) {
  return (
    <motion.div
      className={className}
      initial={{ textShadow: `${GLOW_INTENSITIES[intensity]} ${GLOW_COLORS[color]}` }}
      animate={{
        textShadow: [
          `${GLOW_INTENSITIES[intensity]} ${GLOW_COLORS[color]}`,
          `${GLOW_INTENSITIES[intensity]} ${GLOW_COLORS[color]} 0 0 0 rgba(255, 255, 255, 0.1)`,
          `${GLOW_INTENSITIES[intensity]} ${GLOW_COLORS[color]}`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface MotionBlurProps {
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal";
}

export function MotionBlur({
  children,
  className = "",
  direction = "horizontal",
}: MotionBlurProps) {
  const blurVariant = {
    horizontal: "blur(1px) translateX(2px)",
    vertical: "blur(1px) translateY(2px)",
    diagonal: "blur(1px) translate(2px, 2px)",
  };

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(0px)" }}
      animate={{
        filter: [
          "blur(0px)",
          blurVariant[direction],
          "blur(0px)",
        ],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {children}
    </motion.div>
  );
}

interface DepthLayerProps {
  children: ReactNode;
  depth?: number; // 0-10, where 10 is furthest
  className?: string;
}

export function DepthLayer({
  children,
  depth = 5,
  className = "",
}: DepthLayerProps) {
  const scale = 1 - depth * 0.05;
  const opacity = 1 - depth * 0.08;

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        opacity,
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
