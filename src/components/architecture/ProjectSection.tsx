"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { NodeDetailModal } from "./NodeDetailModal";
import { useSound } from "@/hooks/useSound";

const ArchitectureDiagram = dynamic(
  () => import("./ArchitectureDiagram").then((m) => m.ArchitectureDiagram),
  { ssr: false, loading: () => <div className="h-80 flex items-center justify-center text-text-muted text-sm">Loading diagram…</div> }
);

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export function ProjectSection({ project, index }: ProjectSectionProps) {
  const [selectedNode, setSelectedNode] = useState<(typeof project.nodes)[0] | null>(null);
  const { playSfx } = useSound();

  const handleNodeClick = (node: (typeof project.nodes)[0]) => {
    playSfx("nodeClick");
    setSelectedNode(node);
    window.dispatchEvent(
      new CustomEvent("vjb-arch-node-click", { detail: { type: "architecture-node-click", nodeId: `${project.slug}-${node.id}` } })
    );
  };

  return (
    <motion.div
      className="card-base p-6 md:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">
              {project.title}
            </h3>
            <p className="text-accent-blue mt-1 text-sm font-mono">{project.tagline}</p>
          </div>
          <span className="text-text-muted text-xs font-mono border border-white/10 rounded px-2 py-1">
            Project {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {project.humorLine && (
          <p className="mt-3 text-text-muted text-xs italic font-mono border-l-2 border-accent-purple/40 pl-3">
            {project.humorLine}
          </p>
        )}
      </div>

      <div className="mt-4 text-xs text-text-muted mb-2 font-mono">
        Click any node for details →
      </div>

      <ArchitectureDiagram nodes={project.nodes} edges={project.edges} onNodeClick={handleNodeClick} />

      <AnimatePresence>
        {selectedNode && (
          <NodeDetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
