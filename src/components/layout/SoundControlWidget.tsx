"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import type { SoundMode } from "@/lib/constants";
import { ClapperIcon, TargetIcon, MuteIcon, type IconProps } from "@/components/icons";
import type { ComponentType } from "react";

const MODES: { value: SoundMode; label: string; icon: ComponentType<IconProps> }[] = [
  { value: "cinematic", label: "Cinematic", icon: ClapperIcon },
  { value: "focus", label: "Focus", icon: TargetIcon },
  { value: "silent", label: "Silent", icon: MuteIcon },
];

export function SoundControlWidget() {
  const { mode, setMode, volume, setVolume, muted, setMuted, unlocked } = useSound();
  const [expanded, setExpanded] = useState(false);

  if (!unlocked) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="card-base p-4 flex flex-col gap-4 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
          >
            {/* Volume */}
            <div>
              <label className="text-xs text-text-muted mb-2 block">Volume</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-accent-blue"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="text-xs text-text-muted mb-2 block">Sound Mode</label>
              <div className="grid grid-cols-3 gap-1">
                {MODES.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                      mode === m.value
                        ? "bg-accent-glow/20 text-accent-blue border border-accent-blue/30"
                        : "text-text-muted hover:text-text-secondary hover:bg-white/5"
                    }`}
                  >
                    <m.icon aria-hidden="true" />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => {
          if (expanded) {
            setExpanded(false);
          } else {
            setExpanded(true);
          }
        }}
        onDoubleClick={() => setMuted(!muted)}
        className="w-10 h-10 rounded-full border border-white/20 bg-bg-card/80 backdrop-blur flex items-center justify-center text-lg hover:border-accent-blue/40 transition-all shadow-glow"
        title={muted ? "Unmute (dbl-click to toggle mute)" : "Sound settings"}
        aria-label="Sound settings"
      >
        {muted || mode === "silent" ? <MuteIcon aria-hidden="true" /> : mode === "focus" ? <TargetIcon aria-hidden="true" /> : <ClapperIcon aria-hidden="true" />}
      </button>
    </div>
  );
}
