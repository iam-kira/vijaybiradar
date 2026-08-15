"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-secondary/50 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-text-primary font-display font-semibold">Vijay Biradar</p>
          <p className="text-text-muted text-sm mt-0.5">
            Enterprise Data Engineer · AI Platform Builder
          </p>
          <p className="text-text-muted text-xs mt-1 italic">Veni. Vidi. Vici.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
          <a
            href="mailto:vijaybiradar.work@gmail.com"
            className="hover:text-accent-blue transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/vijay-biradar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/iam-kira"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/"
            className="hover:text-accent-purple transition-colors text-text-muted text-xs"
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("vjb-intro-seen");
              }
            }}
          >
            Watch Intro
          </Link>
        </div>

        <p className="text-text-muted text-xs">
          © {new Date().getFullYear()} Vijay Biradar
        </p>
      </div>
    </footer>
  );
}
