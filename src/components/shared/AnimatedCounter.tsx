"use client";

import { useEffect, useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useMotion } from "./MotionProvider";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useScrollTrigger();
  const { reducedMotion } = useMotion();
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !valueRef.current) return;
    if (reducedMotion) {
      valueRef.current.textContent = `${prefix}${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      if (valueRef.current) {
        valueRef.current.textContent = `${prefix}${current}${suffix}`;
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, suffix, prefix, duration, reducedMotion]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      <span ref={valueRef}>{prefix}0{suffix}</span>
    </span>
  );
}
