"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { SoundMode, SoundName } from "@/lib/constants";
import { SOUND_FILES, SOUND_VOLUMES, CINEMATIC_ONLY } from "@/lib/constants";

interface SoundContextValue {
  mode: SoundMode;
  setMode: (mode: SoundMode) => void;
  volume: number;
  setVolume: (v: number) => void;
  muted: boolean;
  setMuted: (m: boolean) => void;
  playSfx: (name: SoundName) => void;
  playAmbient: () => void;
  stopAmbient: () => void;
  stopAll: () => void;
  unlocked: boolean;
  unlock: () => void;
}

export const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<SoundMode>("cinematic");
  const [volume, setVolumeState] = useState(0.7);
  const [muted, setMutedState] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Howler is loaded dynamically to avoid SSR issues
  const howlsRef = useRef<Record<string, import("howler").Howl>>({});
  const ambientRef = useRef<import("howler").Howl | null>(null);

  // Persist prefs
  useEffect(() => {
    const saved = localStorage.getItem("vjb-sound-prefs");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.mode) setModeState(p.mode);
        if (typeof p.volume === "number") setVolumeState(p.volume);
        if (typeof p.muted === "boolean") setMutedState(p.muted);
      } catch {}
    }
  }, []);

  const savePrefs = useCallback(
    (m: SoundMode, v: number, mu: boolean) => {
      localStorage.setItem("vjb-sound-prefs", JSON.stringify({ mode: m, volume: v, muted: mu }));
    },
    []
  );

  const setMode = (m: SoundMode) => {
    setModeState(m);
    savePrefs(m, volume, muted);
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    savePrefs(mode, v, muted);
    if (ambientRef.current) ambientRef.current.volume(v * SOUND_VOLUMES.introAmbient);
  };

  const setMuted = (m: boolean) => {
    setMutedState(m);
    savePrefs(mode, volume, m);
    if (ambientRef.current) {
      if (m) ambientRef.current.pause();
      else if (mode === "cinematic") ambientRef.current.play();
    }
  };

  const getHowl = useCallback(async (name: SoundName) => {
    if (howlsRef.current[name]) return howlsRef.current[name];
    const { Howl } = await import("howler");
    const h = new Howl({
      src: [SOUND_FILES[name]],
      volume: SOUND_VOLUMES[name],
      preload: true,
    });
    howlsRef.current[name] = h;
    return h;
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  const playSfx = useCallback(
    async (name: SoundName) => {
      if (!unlocked || muted || mode === "silent") return;
      if (CINEMATIC_ONLY.includes(name) && mode !== "cinematic") return;
      const h = await getHowl(name);
      h.volume((SOUND_VOLUMES[name] ?? 0.3) * volume);
      h.play();
    },
    [unlocked, muted, mode, volume, getHowl]
  );

  const playAmbient = useCallback(async () => {
    if (!unlocked || muted || mode !== "cinematic") return;
    if (!ambientRef.current) {
      const { Howl } = await import("howler");
      ambientRef.current = new Howl({
        src: [SOUND_FILES.introAmbient],
        volume: 0,
        loop: true,
      });
    }
    ambientRef.current.play();
    ambientRef.current.fade(0, SOUND_VOLUMES.introAmbient * volume, 800);
  }, [unlocked, muted, mode, volume]);

  const stopAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.fade(ambientRef.current.volume() as number, 0, 500);
      setTimeout(() => ambientRef.current?.pause(), 500);
    }
  }, []);

  const stopAll = useCallback(() => {
    stopAmbient();
    Object.values(howlsRef.current).forEach((h) => h.stop());
  }, [stopAmbient]);

  return (
    <SoundContext.Provider
      value={{
        mode,
        setMode,
        volume,
        setVolume,
        muted,
        setMuted,
        playSfx,
        playAmbient,
        stopAmbient,
        stopAll,
        unlocked,
        unlock,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
