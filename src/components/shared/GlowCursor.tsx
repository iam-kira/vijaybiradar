"use client";

import { useEffect, useRef } from "react";

export function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0 transition-transform duration-75 ease-out"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
