"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface TransitionProps {
  type: "fade" | "wipe" | "scale" | "blur";
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom" | "diagonal";
}

interface CinematicTransitionProps {
  children: ReactNode;
  transition?: TransitionProps;
  isVisible?: boolean;
}

export function CinematicTransition({
  children,
  transition = { type: "fade", duration: 0.8 },
  isVisible = true,
}: CinematicTransitionProps) {
  const { type, delay = 0, duration = 0.8, direction = "left" } = transition;

  const getVariants = () => {
    switch (type) {
      case "wipe": {
        // Wipe direction variants
        const clipPaths = {
          left: ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
          right: ["polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
          top: ["polygon(0 0, 100% 0, 100% 0, 0 0)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
          bottom: ["polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
          diagonal: ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
        };
        return {
          hidden: { clipPath: clipPaths[direction][0] },
          visible: { clipPath: clipPaths[direction][1] },
        };
      }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(12px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="hidden"
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
