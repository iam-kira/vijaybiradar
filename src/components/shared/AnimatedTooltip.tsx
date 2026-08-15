"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";

interface AnimatedTooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function AnimatedTooltip({
  content,
  children,
  side = "top",
  delay = 0.1,
  className = "",
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionVariants = {
    top: { y: -10, x: "-50%" },
    bottom: { y: 10, x: "-50%" },
    left: { x: -10, y: "-50%" },
    right: { x: 10, y: "-50%" },
  };

  const positionClasses = {
    top: "bottom-full left-1/2 mb-2",
    bottom: "top-full left-1/2 mt-2",
    left: "right-full top-1/2 mr-2",
    right: "left-full top-1/2 ml-2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute ${positionClasses[side]} z-50 whitespace-nowrap`}
            initial={{ opacity: 0, ...positionVariants[side] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...positionVariants[side] }}
            transition={{ delay, duration: 0.2 }}
          >
            <motion.div
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg font-medium shadow-lg backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              {content}

              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 transform rotate-45 ${
                  side === "top"
                    ? "bottom-[-4px] left-1/2"
                    : side === "bottom"
                      ? "top-[-4px] left-1/2"
                      : side === "left"
                        ? "right-[-4px] top-1/2"
                        : "left-[-4px] top-1/2"
                }`}
                style={{
                  transform:
                    side === "top"
                      ? "translateX(-50%) rotate(45deg)"
                      : side === "bottom"
                        ? "translateX(-50%) rotate(45deg)"
                        : side === "left"
                          ? "translateY(-50%) rotate(45deg)"
                          : "translateY(-50%) rotate(45deg)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
