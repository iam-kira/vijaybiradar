"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { StatusPanel } from "@/components/command-center/StatusPanel";
import { DataFlowLines } from "@/components/command-center/DataFlowLines";

const METRICS = [
  { value: 800, suffix: "+", label: "ETL Pipelines Owned", sublabel: "Across Germany & India" },
  { value: 30, suffix: "+", label: "Enterprise Data Products", sublabel: "Built and delivered" },
  { value: 75, suffix: "%", prefix: "~", label: "Manual Monitoring Reduced", sublabel: "Via observability platform" },
  { value: 80, suffix: "+", label: "AI Workshop Participants", sublabel: "Managers, architects, POs, tech leads" },
  { value: 3, suffix: "+", label: "Years at Daimler Truck", sublabel: "Innovation Center India" },
  { value: 5, suffix: "", prefix: "3–", label: "Auto-Recoveries Daily", sublabel: "Self-healing framework" },
];

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Engineering Command Center"
          subtitle="Manufacturing plants across Germany and India. One dashboard."
          accent="green"
        />

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {METRICS.map(({ value, suffix, prefix, label, sublabel }) => (
            <div
              key={label}
              className="card-base card-glow p-6 relative overflow-hidden group"
            >
              {/* Pulse dot */}
              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-accent-green status-pulse" />

              <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-transparent">
                <AnimatedCounter
                  target={value}
                  suffix={suffix}
                  prefix={prefix ?? ""}
                />
              </div>
              <p className="mt-2 text-text-primary font-semibold">{label}</p>
              <p className="text-xs text-text-muted mt-1">{sublabel}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green/0 via-accent-green/50 to-accent-green/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Status panels */}
        <StatusPanel />

        {/* Data flow visualization */}
        <DataFlowLines />
      </div>
    </div>
  );
}
