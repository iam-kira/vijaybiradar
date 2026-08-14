"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_COMMANDS, KONAMI_EASTER_EGG_MESSAGE } from "@/data/easterEggs";

interface TerminalOverlayProps {
  command: string | null;
  onClose: () => void;
  isKonami?: boolean;
}

export function TerminalOverlay({ command, onClose, isKonami }: TerminalOverlayProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawLines = isKonami
    ? KONAMI_EASTER_EGG_MESSAGE
    : command && TERMINAL_COMMANDS[command]
    ? TERMINAL_COMMANDS[command]
    : [];

  useEffect(() => {
    if (!command && !isKonami) return;
    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < rawLines.length) {
        setLines((prev) => [...prev, rawLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [command, isKonami]);

  // Blink cursor
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Close on Escape or click outside
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const open = !!command || !!isKonami;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-2xl mx-4 rounded-lg border border-accent-green/30 bg-bg-primary/95 p-6 shadow-glow-green font-mono text-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-text-muted text-xs">vijay@dflcortex ~ bash</span>
              <button
                onClick={onClose}
                className="ml-auto text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close terminal"
              >
                ✕
              </button>
            </div>

            {/* Output lines */}
            <div className="space-y-0.5 min-h-[200px]">
              {lines.map((line, i) => (
                <p key={i} className={`text-accent-green ${line.startsWith(">") ? "text-accent-blue" : ""}`}>
                  {line || <>&nbsp;</>}
                </p>
              ))}
              {cursor && lines.length === rawLines.length && (
                <span className="inline-block w-2 h-4 bg-accent-green opacity-80" />
              )}
            </div>

            <p className="mt-4 text-text-muted text-xs">Press Escape or click outside to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
