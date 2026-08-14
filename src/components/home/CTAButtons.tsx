"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const BUTTONS = [
  { label: "Explore My Work", href: "/architecture", variant: "primary" },
  { label: "Hall of Victories", href: "/victories", variant: "secondary" },
  { label: "Download Resume", href: "/vijaybiradar/resume/Vijay_Biradar_Resume.pdf", variant: "ghost", external: true },
  { label: "Command Center", href: "/command-center", variant: "outline" },
];

export function CTAButtons() {
  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center mt-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      {BUTTONS.map(({ label, href, variant, external }) => {
        const base = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200";
        const styles = {
          primary: `${base} bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-glow-blue hover:scale-105`,
          secondary: `${base} bg-accent-gold/10 text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/20 hover:scale-105`,
          ghost: `${base} text-text-secondary hover:text-text-primary hover:bg-white/5`,
          outline: `${base} border border-accent-glow/30 text-accent-blue hover:border-accent-blue hover:bg-accent-blue/10`,
        }[variant];

        if (external) {
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles}>
              {label} ↓
            </a>
          );
        }
        return (
          <Link key={label} href={href} className={styles}>
            {label}
          </Link>
        );
      })}
    </motion.div>
  );
}
