"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { EnterButton } from "./EnterButton";

const INTRO_WALLPAPER = "/images/wallpaper/Conqure.jpg";

const SEQUENCE = [
  { text: "VIJAY BIRADAR", class: "text-5xl md:text-7xl font-display font-bold text-glow-blue text-white tracking-widest", delay: 1200 },
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
    addTimer(() => setPhase(0), SEQUENCE[0].delay);         // VIJAY BIRADAR
    addTimer(() => setShowRoles(true), 4000);               // Role list (faster reveal)
    addTimer(() => setShowButton(true), 8500);              // Enter button (faster)

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
    playSfx("achievementUnlock");
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
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("${INTRO_WALLPAPER}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
            {SEQUENCE[0].text}
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

export default CinematicIntro;
