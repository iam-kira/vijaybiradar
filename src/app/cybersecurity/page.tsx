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
          title="Cybersecurity Mission"
          subtitle="Simple security. Faster response. Stronger protection."
          accent="purple"
        />

        {/* Narrative */}
        <div className="card-base p-6 mb-10 space-y-4 text-text-secondary leading-relaxed">
          <p>
            As the enterprise&apos;s trusted go-to on production security and debugging topics —
            frequently the first point of contact for critical production issues outside
            direct ownership — security became a natural extension of my platform engineering work.
          </p>
          <p>
            I initiated an applied security engineering approach: bringing AI-assisted code review
            into the data platform CI/CD flow to detect secrets, risky dependencies, vulnerabilities,
            and compliance gaps — reducing the window between introduction and detection.
          </p>
          <p className="text-xs font-mono text-accent-red border-l-2 border-accent-red/40 pl-3">
            ⚠️ This is framed as an applied initiative and design. Security engineering scope is
            anchored to the SPOC and trusted advisor role per professional experience.
          </p>
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
