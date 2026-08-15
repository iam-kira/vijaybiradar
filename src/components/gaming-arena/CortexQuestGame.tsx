"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { PALETTE } from "@/lib/constants";
import { TrophyIcon } from "@/components/icons";

const TOKENS = [
  { label: "GitHub", color: PALETTE.bronze },
  { label: "Jira", color: PALETTE.purple },
  { label: "Confluence", color: PALETTE.gold },
  { label: "SQL", color: PALETTE.gold },
  { label: "Talend", color: PALETTE.oxblood },
];

const W = 380;
const H = 260;

interface Token { x: number; y: number; vx: number; vy: number; label: string; color: string; id: number }

export function CortexQuestGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    running: false,
    power: 0,
    tokens: [] as Token[],
    playerX: W / 2,
    playerY: H - 30,
    frame: 0,
    nextId: 0,
    collected: 0,
  });
  const [display, setDisplay] = useState({ power: 0, running: false, collected: 0, gameOver: false });
  const { playSfx } = useSound();
  const animRef = useRef<number>(0);

  const getHiScore = () => parseInt(localStorage.getItem("vjb-cq-hi") ?? "0");
  const saveHiScore = (s: number) => { if (s > getHiScore()) localStorage.setItem("vjb-cq-hi", String(s)); };

  const startGame = () => {
    const s = stateRef.current;
    s.running = true;
    s.power = 0;
    s.tokens = [];
    s.frame = 0;
    s.collected = 0;
    setDisplay({ power: 0, running: true, collected: 0, gameOver: false });
    loop();
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;
    if (!s.running) return;

    s.frame++;

    // Spawn
    if (s.frame % 80 === 0) {
      const t = TOKENS[Math.floor(Math.random() * TOKENS.length)];
      s.tokens.push({
        x: Math.random() * (W - 60) + 10,
        y: -20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.2 + s.power * 0.01,
        ...t,
        id: s.nextId++,
      });
    }

    s.tokens = s.tokens.filter((t) => {
      t.x += t.vx;
      t.y += t.vy;
      if (t.y > H + 20) return false;

      // Collect
      if (Math.abs(t.x - s.playerX) < 30 && Math.abs(t.y - s.playerY) < 30) {
        s.power = Math.min(100, s.power + 8);
        s.collected++;
        playSfx("cortexCollect");
        setDisplay((d) => ({ ...d, power: s.power, collected: s.collected }));
        if (s.power >= 100) {
          s.running = false;
          saveHiScore(s.collected);
          setDisplay((d) => ({ ...d, running: false, gameOver: true, power: 100 }));
        }
        return false;
      }
      return true;
    });

    // Draw
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(10,10,15,0.9)";
    ctx.fillRect(0, 0, W, H);

    // Power bar
    ctx.fillStyle = "rgba(30,30,50,0.8)";
    ctx.fillRect(10, 10, W - 20, 8);
    const grad = ctx.createLinearGradient(10, 0, W - 10, 0);
    grad.addColorStop(0, PALETTE.bronze);
    grad.addColorStop(1, PALETTE.gold);
    ctx.fillStyle = grad;
    ctx.fillRect(10, 10, ((W - 20) * s.power) / 100, 8);

    // Tokens
    s.tokens.forEach((t) => {
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.label, t.x, t.y);
    });

    // Player (Cortex)
    ctx.fillStyle = PALETTE.gold;
    ctx.beginPath();
    ctx.roundRect(s.playerX - 35, s.playerY - 15, 70, 28, 8);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CORTEX", s.playerX, s.playerY);

    animRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.playerX = e.clientX - rect.left;
    };
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.playerX = e.touches[0].clientX - rect.left;
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
        <span>DFL Cortex Quest</span>
        <span>Hi: {getHiScore()} tokens</span>
      </div>
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-accent-gold">Collected: {display.collected}</span>
        <span className="text-accent-blue ml-auto">Power: {display.power}%</span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="rounded-lg border border-white/10 cursor-crosshair" />
      {!display.running && (
        <button
          onClick={startGame}
          className="px-4 py-2 rounded-lg bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-sm font-mono hover:bg-accent-gold/20 transition-all"
        >
          {display.gameOver ? "▶ Play Again" : "▶ Start"}
        </button>
      )}
      {display.gameOver && (
        <p className="flex items-center gap-1 text-xs text-accent-green font-mono"><TrophyIcon aria-hidden="true" /> Cortex Powered! Collected: {display.collected} tokens</p>
      )}
      <p className="text-[10px] text-text-muted text-center">Catch GitHub/Jira/Confluence/SQL/Talend tokens to power DFL Cortex</p>
    </div>
  );
}
