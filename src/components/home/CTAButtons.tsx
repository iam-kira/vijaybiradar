"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const BUTTONS = [
  { label: "Explore My Journey", href: "/about", variant: "primary" },
  { label: "Hall of Fame", href: "/victories", variant: "secondary" },
  { label: "Command Center", href: "/command-center", variant: "outline" },
  { label: "Download Resume", href: "/vijaybiradar/resume/Vijay_Biradar_Resume.pdf", variant: "ghost", external: true },
];

export function CTAButtons() {
  return (
    <motion.div
      className="relative z-10 mt-8 flex flex-wrap justify-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      {BUTTONS.map(({ label, href, variant, external }) => {
        const base = "px-5 py-2.75 rounded-full text-sm font-semibold transition-all duration-200 tracking-[0.08em] uppercase";
        const styles = {
          primary: `${base} bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]`,
          secondary: `${base} border border-accent-gold/40 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 hover:scale-[1.02]`,
          ghost: `${base} text-text-secondary hover:text-text-primary hover:bg-white/5`,
          outline: `${base} border border-accent-blue/35 text-accent-blue hover:border-accent-blue hover:bg-accent-blue/10`,
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
