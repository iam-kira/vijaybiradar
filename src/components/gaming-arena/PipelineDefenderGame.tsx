"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { HeartIcon } from "@/components/icons";
import { PALETTE } from "@/lib/constants";

const THREATS = ["SQL Deadlock", "Network Fail", "Bad Config", "Broken Schedule", "Timeout"];
const W = 380;
const H = 260;

interface Threat { x: number; y: number; label: string; speed: number; id: number }

export function PipelineDefenderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    running: false,
    score: 0,
    lives: 3,
    threats: [] as Threat[],
    defenderX: W / 2,
    frame: 0,
    nextId: 0,
  });
  const [display, setDisplay] = useState({ score: 0, lives: 3, running: false, gameOver: false });
  const { playSfx } = useSound();
  const animRef = useRef<number>(0);

  const getHiScore = () => parseInt(localStorage.getItem("vjb-pd-hi") ?? "0");
  const saveHiScore = (s: number) => {
    if (s > getHiScore()) localStorage.setItem("vjb-pd-hi", String(s));
  };

  const startGame = () => {
    const s = stateRef.current;
    s.running = true;
    s.score = 0;
    s.lives = 3;
    s.threats = [];
    s.frame = 0;
    setDisplay({ score: 0, lives: 3, running: true, gameOver: false });
    loop();
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    if (!s.running) return;

    s.frame++;

    // Spawn threats
    if (s.frame % 60 === 0) {
      s.threats.push({
        x: Math.random() * (W - 80) + 10,
        y: -20,
        label: THREATS[Math.floor(Math.random() * THREATS.length)],
        speed: 1 + s.score * 0.01,
        id: s.nextId++,
      });
    }

    // Move threats
    s.threats = s.threats.filter((t) => {
      t.y += t.speed;
      if (t.y > H) {
        s.lives--;
        playSfx("defenderFail");
        setDisplay((d) => ({ ...d, lives: s.lives }));
        if (s.lives <= 0) {
          s.running = false;
          saveHiScore(s.score);
          setDisplay((d) => ({ ...d, running: false, gameOver: true, lives: 0 }));
        }
        return false;
      }
      // Collision with defender (bottom bar)
      if (t.y > H - 30 && Math.abs(t.x - s.defenderX) < 50) {
        s.score += 10;
        playSfx("defenderHit");
        setDisplay((d) => ({ ...d, score: s.score }));
        return false;
      }
      return true;
    });

    // Draw
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(10,10,15,0.9)";
    ctx.fillRect(0, 0, W, H);

    // Threats
    s.threats.forEach((t) => {
      ctx.fillStyle = "rgba(122,46,46,0.85)";
      ctx.beginPath();
      ctx.roundRect(t.x, t.y, 90, 22, 4);
      ctx.fill();
      ctx.fillStyle = PALETTE.textPrimary;
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(t.label, t.x + 45, t.y + 15);
    });

    // Defender
    ctx.fillStyle = PALETTE.gold;
    ctx.beginPath();
    ctx.roundRect(s.defenderX - 45, H - 22, 90, 18, 6);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PIPELINE", s.defenderX, H - 9);

    animRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.defenderX = e.clientX - rect.left;
    };
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.defenderX = e.touches[0].clientX - rect.left;
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("touchmove", handleTouch);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="card-base p-4 flex flex-col items-center gap-3">
      <div className="flex justify-between w-full text-xs font-mono text-text-muted">
        <span>Pipeline Defender</span>
        <span>Hi: {getHiScore()}</span>
      </div>
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-accent-green">Score: {display.score}</span>
        <span className="flex items-center gap-1 text-accent-red">
          Lives:
          {Array.from({ length: Math.max(0, display.lives) }).map((_, i) => (
            <HeartIcon key={i} aria-hidden="true" />
          ))}
        </span>
      </div>

      <canvas ref={canvasRef} width={W} height={H} className="rounded-lg border border-white/10 cursor-crosshair" />

      {!display.running && (
        <button
          onClick={startGame}
          className="px-4 py-2 rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm font-mono hover:bg-accent-blue/20 transition-all"
        >
          {display.gameOver ? "▶ Play Again" : "▶ Start"}
        </button>
      )}
      {display.gameOver && (
        <p className="text-xs text-accent-red font-mono">Game Over — Score: {display.score}</p>
      )}
      <p className="text-[10px] text-text-muted text-center">Move mouse/touch to deflect SQL Deadlocks, Network Failures & more</p>
    </div>
  );
}
