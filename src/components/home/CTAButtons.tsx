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
      className="relative z-10 mt-8 flex flex-wrap items-center justify-start gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
    >
      {BUTTONS.map(({ label, href, variant, external }) => {
        const base = "group inline-flex items-center justify-center rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300";
        const styles = {
          primary: `${base} bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold text-white shadow-[0_0_35px_rgba(59,130,246,0.38)] hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(139,92,246,0.5)]`,
          secondary: `${base} border border-accent-gold/40 bg-accent-gold/10 text-accent-gold hover:-translate-y-0.5 hover:bg-accent-gold/15`,
          ghost: `${base} text-text-secondary hover:-translate-y-0.5 hover:bg-white/5 hover:text-white`,
          outline: `${base} border border-accent-blue/40 bg-white/3 text-accent-blue hover:-translate-y-0.5 hover:border-accent-blue hover:bg-accent-blue/10`,
        }[variant];

        if (external) {
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles}>
              {label}
              <span className="ml-2 text-base transition-transform duration-300 group-hover:translate-x-0.5">↓</span>
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
