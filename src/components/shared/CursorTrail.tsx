"use client";

import { useEffect, useRef } from "react";

interface CursorTrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<CursorTrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const idRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: idRef.current++,
      });

      // Limit trail length
      if (pointsRef.current.length > 50) {
        pointsRef.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      pointsRef.current.forEach((point, index) => {
        const opacity = (index + 1) / pointsRef.current.length;
        const size = 2 + (index + 1) * 0.5;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-40"
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
}
