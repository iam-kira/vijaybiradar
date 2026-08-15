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
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full transition-transform duration-75 ease-out md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
