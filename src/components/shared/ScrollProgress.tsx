"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? scrolled / max : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9998] bg-bg-secondary">
      <motion.div
        className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
        style={{ scaleX: progress, transformOrigin: "0%" }}
      />
    </div>
  );
}
