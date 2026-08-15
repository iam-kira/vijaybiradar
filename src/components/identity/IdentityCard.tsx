"use client";

import { useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import type { IconProps } from "@/components/icons";

interface IdentityCardProps {
  icon: ComponentType<IconProps>;
  label: string;
  detail: string;
}

export function IdentityCard({ icon: Icon, label, detail }: IdentityCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 cursor-pointer h-28"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 card-base card-glow flex flex-col items-center justify-center gap-2 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon className="text-2xl text-gold-text" aria-hidden="true" />
          <span className="text-xs font-mono text-text-secondary text-center">{label}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 card-base bg-accent-glow/10 border-accent-purple/30 flex items-center justify-center p-3 backface-hidden rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-xs text-text-secondary text-center leading-snug">{detail}</p>
        </div>
      </motion.div>
    </div>
  );
}
