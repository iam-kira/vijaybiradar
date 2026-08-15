"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const base = "/vijaybiradar";
    const normalizedPathname = pathname.replace(base, "") || "/";
    const normalizedHref = href;
    return normalizedPathname === normalizedHref ||
      (href !== "/" && normalizedPathname.startsWith(href));
  };

  return (
    <nav className="fixed top-2 left-0 right-0 z-[1000] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-bg-primary/60 via-bg-primary/40 to-bg-primary/60 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(59,130,246,0.08)]">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-display font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            VB
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-accent-glow/20 text-accent-blue border border-accent-blue/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-white/20 mx-1" />
            {NAV_LINKS.slice(8).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-accent-glow/20 text-accent-blue border border-accent-blue/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Command palette hint + mobile toggle */}
          <div className="flex items-center gap-2">
            <kbd className="hidden md:flex items-center gap-1 text-xs text-text-muted border border-white/20 rounded px-2 py-1">
              <span>⌘</span>K
            </kbd>
            <button
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="lg:hidden mt-1 rounded-xl border border-white/10 bg-bg-card/95 backdrop-blur-md overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-1 p-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(link.href)
                        ? "bg-accent-glow/20 text-accent-blue"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
