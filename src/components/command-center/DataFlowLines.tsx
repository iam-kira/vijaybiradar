"use client";

import { useEffect, useRef } from "react";
import { PALETTE } from "@/lib/constants";

export function DataFlowLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>(".flow-path");
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      const animate = () => {
        path.style.transition = "none";
        path.style.strokeDashoffset = `${len}`;
        setTimeout(() => {
          path.style.transition = `stroke-dashoffset ${2 + i * 0.4}s ease-in-out`;
          path.style.strokeDashoffset = "0";
        }, i * 300 + 100);
      };

      animate();
      const interval = setInterval(animate, (2 + i * 0.4) * 1000 + i * 300 + 1200);
      return () => clearInterval(interval);
    });
  }, []);

  return (
    <div className="card-base p-6">
      <h3 className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-4">
        Data Flow — Source to Analytics
      </h3>
      <svg
        ref={svgRef}
        viewBox="0 0 800 120"
        className="w-full h-24"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flowGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={PALETTE.bronze} />
            <stop offset="100%" stopColor={PALETTE.purple} />
          </linearGradient>
          <linearGradient id="flowGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={PALETTE.gold} />
            <stop offset="100%" stopColor={PALETTE.bronze} />
          </linearGradient>
        </defs>

        {/* Node labels */}
        {["Source", "Bronze", "Silver", "Gold", "Analytics"].map((label, i) => (
          <g key={label}>
            <rect x={i * 180 + 20} y={40} width={80} height={30} rx={6} fill="rgba(201,162,39,0.15)" stroke="rgba(201,162,39,0.3)" strokeWidth="1" />
            <text x={i * 180 + 60} y={60} textAnchor="middle" fill={PALETTE.textSecondary} fontSize="11" fontFamily="monospace">{label}</text>
          </g>
        ))}

        {/* Flow paths */}
        <path className="flow-path" d="M100 55 C130 55 150 55 200 55" stroke="url(#flowGrad1)" strokeWidth="2" fill="none" />
        <path className="flow-path" d="M280 55 C310 55 330 55 380 55" stroke="url(#flowGrad1)" strokeWidth="2" fill="none" />
        <path className="flow-path" d="M460 55 C490 55 510 55 560 55" stroke="url(#flowGrad2)" strokeWidth="2" fill="none" />
        <path className="flow-path" d="M640 55 C670 55 690 55 740 55" stroke="url(#flowGrad2)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
