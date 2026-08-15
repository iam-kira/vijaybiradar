"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SoundContext } from "@/components/shared/SoundProvider";

export function CinematicIntro({ onComplete }: { onComplete?: () => void }) {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const sound = useContext(SoundContext);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 900));
    timers.push(window.setTimeout(() => setPhase(2), 2000));
    timers.push(window.setTimeout(() => setPhase(3), 3200));
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const handleEnter = () => {
    sound?.unlock();
    sound?.playAmbient();
    sound?.playSfx("whoosh");
    setTimeout(() => {
      // small fade-out before navigating
      sound?.stopAmbient();
      onComplete?.();
      router.push("/");
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 text-white">
      <div className="relative max-w-4xl px-6 text-center">
        <div className="mb-6">
          <div className={`text-6xl md:text-8xl font-display tracking-widest transition-opacity duration-700 ${phase > 0 ? "opacity-100" : "opacity-0"}`}>
            V I J A Y
          </div>
          <div className={`mt-6 text-4xl md:text-6xl font-bold transition-transform duration-700 ${phase > 1 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            CONQUEROR
          </div>
        </div>

        <p className={`text-text-muted max-w-2xl mx-auto transition-opacity duration-700 ${phase > 2 ? "opacity-100" : "opacity-0"}`}>
          Conqueror by craft, curiosity, and code. Enter the Vijayverse.
        </p>

        <div className={`mt-10 transition-opacity duration-500 ${phase > 2 ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={handleEnter}
            className="px-6 py-3 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold hover:scale-105 transform-gpu"
          >
            Enter the VijayVerse
          </button>
        </div>
      </div>
    </div>
  );
}

export default CinematicIntro;
"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { EnterButton } from "./EnterButton";

const SEQUENCE = [
  { text: "VIJAY", class: "text-6xl md:text-8xl font-display font-bold text-glow-blue text-white tracking-widest", delay: 1200 },
  { text: "Victory.", class: "text-2xl md:text-3xl font-display text-accent-blue", delay: 3000 },
  { text: "Success.", class: "text-2xl md:text-3xl font-display text-accent-purple", delay: 3800 },
  { text: "Conqueror.", class: "text-2xl md:text-3xl font-display text-accent-cyan", delay: 4600 },
  { text: "Veni. Vidi. Vici.", class: "text-xl md:text-2xl font-mono text-accent-gold italic", delay: 5800 },
];

const ROLES = [
  "Enterprise Data Engineer",
  "AI Platform Builder",
  "Cybersecurity Innovator",
  "Reader | Gamer | Rider | Violin Learner",
];

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<number>(-1);
  const [roleIndex, setRoleIndex] = useState(0);
  const [showRoles, setShowRoles] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const { unlock, playAmbient, playSfx } = useSound();
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => timerRefs.current.forEach(clearTimeout);

  const addTimer = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timerRefs.current.push(t);
  };

  useEffect(() => {
    // Phase sequence
    addTimer(() => setPhase(0), SEQUENCE[0].delay);         // VIJAY
    addTimer(() => setPhase(1), SEQUENCE[1].delay);         // Victory.
    addTimer(() => setPhase(2), SEQUENCE[2].delay);         // Success.
    addTimer(() => setPhase(3), SEQUENCE[3].delay);         // Conqueror.
    addTimer(() => setPhase(4), SEQUENCE[4].delay);         // Veni. Vidi. Vici.
    addTimer(() => setShowRoles(true), 7200);               // Role list
    addTimer(() => setShowButton(true), 11500);             // Enter button

    // Role cycling
    let ri = 0;
    const roleTimer = setInterval(() => {
      ri = (ri + 1) % ROLES.length;
      setRoleIndex(ri);
    }, 1100);
    timerRefs.current.push(roleTimer as unknown as NodeJS.Timeout);

    return clearTimers;
  }, []);

  const handleEnter = () => {
    unlock();
    playAmbient();
    playSfx("whoosh");
    sessionStorage.setItem("vjb-intro-seen", "1");
    onComplete();
  };

  const handleSkip = () => {
    clearTimers();
    setSkipped(true);
    sessionStorage.setItem("vjb-intro-seen", "1");
    onComplete();
  };

  if (skipped) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
      >
        Skip Intro
      </button>

      <div className="text-center space-y-4 px-6">
        {/* Name */}
        {phase >= 0 && (
          <div
            className={`${SEQUENCE[0].class} transition-all duration-1000 animate-[fadeIn_1s_ease-in]`}
            style={{ animation: "fadeIn 1s ease-in forwards" }}
          >
            VIJAY
          </div>
        )}

        {/* Meaning lines */}
        <div className="flex gap-4 justify-center flex-wrap">
          {phase >= 1 && (
            <span className={`${SEQUENCE[1].class} animate-[fadeIn_0.8s_ease-in]`} style={{ animation: "fadeIn 0.8s ease-in forwards" }}>
              Victory.
            </span>
          )}
          {phase >= 2 && (
            <span className={`${SEQUENCE[2].class} animate-[fadeIn_0.8s_ease-in]`} style={{ animation: "fadeIn 0.8s ease-in forwards" }}>
              Success.
            </span>
          )}
          {phase >= 3 && (
            <span className={`${SEQUENCE[3].class} animate-[fadeIn_0.8s_ease-in]`} style={{ animation: "fadeIn 0.8s ease-in forwards" }}>
              Conqueror.
            </span>
          )}
        </div>

        {/* Veni Vidi Vici */}
        {phase >= 4 && (
          <div
            className={`${SEQUENCE[4].class} animate-pulse mt-2`}
            style={{ animation: "fadeIn 1s ease-in forwards, pulse-glow 3s ease-in-out infinite" }}
          >
            Veni. Vidi. Vici.
          </div>
        )}

        {/* Role typewriter */}
        {showRoles && (
          <div className="mt-6 h-8 flex items-center justify-center">
            <span className="text-text-secondary font-mono text-sm md:text-base terminal-cursor">
              {ROLES[roleIndex]}
            </span>
          </div>
        )}

        {/* Enter button */}
        {showButton && <EnterButton onEnter={handleEnter} />}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
