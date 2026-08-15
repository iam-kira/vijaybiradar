"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CAMPAIGN_LINKS, OFF_DUTY_LINKS } from "@/lib/constants";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isVisible } = useNavbarVisibility();

  const isActive = (href: string) => {
    const base = "/vijaybiradar";
    const normalizedPathname = pathname.replace(base, "") || "/";
    const normalizedHref = href;
    return normalizedPathname === normalizedHref ||
      (href !== "/" && normalizedPathname.startsWith(href));
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.nav
          className="fixed left-0 right-0 top-2 z-[1000] px-3 md:px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.28)] md:px-4 md:py-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-display font-bold tracking-[0.15em] text-gold-text transition-opacity hover:opacity-80"
          >
            VB
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="mr-1 text-[9px] uppercase tracking-[0.3em] text-text-muted">Campaign</span>
              {CAMPAIGN_LINKS.map((link) => (
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
            <div className="w-px h-4 bg-white/20 mx-1" />
            <div className="flex items-center gap-1">
              <span className="mr-1 text-[9px] uppercase tracking-[0.3em] text-text-muted">Off Duty</span>
              {OFF_DUTY_LINKS.map((link) => (
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
          </div>

          {/* Command palette hint + theme toggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <kbd className="hidden md:flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs text-text-muted">
              <span>⌘</span>K
            </kbd>
            <ThemeToggle />
            <button
              className="rounded-full border border-white/10 bg-white/5 p-2 text-text-secondary transition-colors hover:text-text-primary lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="mb-1 block h-0.5 w-5 bg-current" />
              <span className="mb-1 block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mt-2 overflow-hidden rounded-[18px] border border-white/10 bg-black/55 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="p-2">
                <p className="px-3 pt-1 text-[10px] uppercase tracking-[0.3em] text-text-muted">Campaign</p>
                <div className="grid grid-cols-2 gap-1 pb-2 pt-1">
                  {CAMPAIGN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
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
                <p className="px-3 pt-1 text-[10px] uppercase tracking-[0.3em] text-text-muted">Off Duty</p>
                <div className="grid grid-cols-2 gap-1 pb-1 pt-1">
                  {OFF_DUTY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
