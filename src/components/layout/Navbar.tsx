"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";

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
            className="text-lg font-display font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent transition-opacity hover:opacity-80"
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
            <kbd className="hidden md:flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs text-text-muted">
              <span>⌘</span>K
            </kbd>
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
              <div className="grid grid-cols-2 gap-1 p-2">
                {NAV_LINKS.map((link) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
