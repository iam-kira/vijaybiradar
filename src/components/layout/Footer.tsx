"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-bg-secondary/30 to-bg-primary/80 backdrop-blur-sm mt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 mb-12 sm:grid-cols-3">
          {/* Brand */}
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-xl font-bold text-gold-text">Vijay Biradar</p>
            <p className="mt-1 text-sm text-text-secondary">Enterprise Data Engineer</p>
            <p className="mt-0.5 text-sm text-text-secondary">AI Platform Builder</p>
            <p className="mt-2 font-mono text-xs tracking-widest text-accent-gold">Imperium in Progress</p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">Connect</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:vijaybiradar.work@gmail.com"
                className="text-text-secondary transition-colors hover:text-accent-blue"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/vijay-biradar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors hover:text-accent-blue"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/iam-kira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors hover:text-accent-blue"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="text-center sm:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">Navigate</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-text-secondary transition-colors hover:text-accent-purple"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-text-secondary transition-colors hover:text-accent-purple"
              >
                About
              </Link>
              <Link
                href="/victories"
                className="text-text-secondary transition-colors hover:text-accent-purple"
              >
                Hall of Fame
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Watch intro */}
        <div className="flex justify-center border-t border-white/10 pt-8">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("vjb-intro-seen");
                window.location.href = "/";
              }
            }}
            className="rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-accent-gold transition-all hover:bg-accent-gold/20 hover:border-accent-gold/50"
          >
            ↻ Watch Intro
          </button>
        </div>

        {/* Footer note */}
        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            © {new Date().getFullYear()} Vijay Biradar · Master of Complexity
          </p>
        </div>
      </div>
    </footer>
  );
}
