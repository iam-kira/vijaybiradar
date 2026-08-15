"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glowColor?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border border-blue-500/50",
  secondary:
    "bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-800 hover:to-blue-800 text-white border border-purple-500/50",
  ghost: "bg-transparent hover:bg-white/10 text-white border border-white/30",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export function EnhancedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  glowColor = "rgba(59, 130, 246, 0.5)",
  className = "",
  disabled = false,
  href,
}: EnhancedButtonProps) {
  const Element = href ? "a" : "motion.button";

  return (
    <Element
      href={href}
      onClick={!href ? onClick : undefined}
      disabled={disabled}
      className={`relative inline-block rounded-lg font-semibold transition-all duration-300 overflow-hidden group ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
        style={{ boxShadow: `0 0 20px ${glowColor}` }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Border animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </Element>
  );
}
