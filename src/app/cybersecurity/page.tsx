"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import dynamic from "next/dynamic";
import { useSound } from "@/hooks/useSound";

const ArchitectureDiagram = dynamic(
  () => import("@/components/architecture/ArchitectureDiagram").then((m) => m.ArchitectureDiagram),
  { ssr: false }
);
import { NodeDetailModal } from "@/components/architecture/NodeDetailModal";
import { projects } from "@/data/projects";
import type { ArchitectureNode } from "@/data/projects";

const cyberProject = projects.find((p) => p.slug === "cybersecurity-ai-agent")!;

export default function CybersecurityPage() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const { playSfx } = useSound();

  const handleNodeClick = (node: ArchitectureNode) => {
    playSfx("nodeClick");
    setSelectedNode(node);
  };

  const triggerAlert = () => {
    playSfx("securityAlert");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3500);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="The Edge"
          subtitle="Great systems perform. Exceptional systems endure."
          accent="purple"
        />

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-base p-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-red">Chapter 05 · The Edge</p>
            <h3 className="mb-4 font-display text-3xl md:text-5xl text-white">
              The Guardian mindset is built into how Vijay works.
            </h3>
            <div className="space-y-4 text-base leading-8 text-text-secondary">
              <p>
                Vijay does not treat cybersecurity as a checklist. He treats it as a shared
                responsibility to protect the people, systems, and platforms that others depend on.
              </p>
              <p>
                From production support to secure engineering culture, his work is shaped by the idea
                that strong systems are resilient systems. They are designed with visibility,
                discipline, and trust from the beginning.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-accent-red/30 bg-gradient-to-br from-accent-red/10 via-transparent to-accent-purple/10 p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-accent-cyan">Core principles</p>
            <div className="space-y-3">
              {[
                "Security awareness across engineering teams",
                "Vulnerability detection before escalation",
                "AI-assisted review for risky patterns",
                "Operational resilience under pressure",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security agent diagram */}
        <div className="card-base p-6 mb-10">
          <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
            AI Security Agent — Architecture
          </h3>
          <ArchitectureDiagram
            nodes={cyberProject.nodes}
            edges={cyberProject.edges}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* Mock alert trigger */}
        <div className="card-base p-6 mb-10">
          <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
            Demo — Security Alert
          </h3>
          <button
            onClick={triggerAlert}
            className="px-5 py-2.5 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm font-mono hover:bg-accent-red/20 transition-all"
          >
            🔴 Simulate Security Alert
          </button>
        </div>

        {/* Risk scan visualization */}
        <div className="card-base p-6">
          <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
            Code Scan Results — Resolved
          </h3>
          <div className="space-y-3">
            {[
              { issue: "Hardcoded API key detected in pipeline config", status: "resolved" },
              { issue: "Vulnerable dependency: lodash@4.17.15 (CVE-2021-23337)", status: "resolved" },
              { issue: "SQL connection string in commit message", status: "resolved" },
              { issue: "Missing authentication on data endpoint", status: "resolved" },
            ].map(({ issue }) => (
              <div key={issue} className="flex items-center gap-3 text-sm">
                <span className="text-accent-green">✓</span>
                <span className="text-text-secondary line-through decoration-accent-green/50">{issue}</span>
                <span className="ml-auto text-xs text-accent-green font-mono">resolved</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Teams alert popup */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              className="fixed bottom-24 right-6 z-[800] w-80 card-base border-accent-red/40 p-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <div>
                  <p className="text-sm font-bold text-accent-red">Security Alert</p>
                  <p className="text-xs text-text-secondary mt-1">
                    Hardcoded secret detected in data-pipeline-001. Repository owner notified.
                  </p>
                  <p className="text-xs text-text-muted mt-1 font-mono">AI Security Agent · just now</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedNode && (
            <NodeDetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
