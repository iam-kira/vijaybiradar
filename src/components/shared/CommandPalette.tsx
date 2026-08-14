"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { TERMINAL_COMMANDS } from "@/data/easterEggs";
import { TerminalOverlay } from "./TerminalOverlay";

const ALL_COMMANDS = [
  ...NAV_LINKS.map((l) => ({
    label: l.label,
    description: l.scene,
    action: "navigate" as const,
    href: l.href,
  })),
  ...Object.keys(TERMINAL_COMMANDS).map((cmd) => ({
    label: cmd,
    description: "Terminal command",
    action: "terminal" as const,
    href: cmd,
  })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [termCmd, setTermCmd] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = ALL_COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) { closePalette(); } else { openPalette(); }
      }
      if (e.key === "Escape") closePalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openPalette, closePalette]);

  const execute = useCallback(
    (cmd: (typeof ALL_COMMANDS)[0]) => {
      closePalette();
      if (cmd.action === "navigate") {
        router.push(cmd.href);
      } else {
        setTermCmd(cmd.href);
      }
    },
    [closePalette, router]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    if (e.key === "ArrowUp") setActiveIndex((i) => Math.max(i - 1, 0));
    if (e.key === "Enter" && filtered[activeIndex]) execute(filtered[activeIndex]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
          >
            <motion.div
              className="w-full max-w-lg mx-4 rounded-xl border border-accent-glow/30 bg-bg-card/95 shadow-glow overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <span className="text-accent-blue">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                  onKeyDown={handleKey}
                  placeholder="Navigate to... or type a command"
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-sm"
                />
                <kbd className="text-text-muted text-xs border border-white/20 rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-text-muted text-sm">No results</p>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={cmd.label}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        i === activeIndex
                          ? "bg-accent-glow/20 text-text-primary"
                          : "text-text-secondary hover:bg-white/5"
                      }`}
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <span className="text-lg">
                        {cmd.action === "navigate" ? "→" : ">_"}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{cmd.label}</p>
                        <p className="text-xs text-text-muted">{cmd.description}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-white/10 flex gap-4 text-xs text-text-muted">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
                <span className="ml-auto">Ctrl+K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalOverlay
        command={termCmd}
        onClose={() => setTermCmd(null)}
      />
    </>
  );
}
