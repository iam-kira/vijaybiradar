"use client";

import { motion } from "framer-motion";
import type { ArchitectureNode } from "@/data/projects";

interface NodeDetailModalProps {
  node: ArchitectureNode;
  onClose: () => void;
}

export function NodeDetailModal({ node, onClose }: NodeDetailModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[8500] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-md w-full mx-4 card-base p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-accent-blue status-pulse" />
          <p className="text-xs font-mono text-accent-blue uppercase tracking-widest">Node Detail</p>
        </div>
        <h4 className="text-lg font-display font-bold text-text-primary mb-3 whitespace-pre-line">
          {node.label}
        </h4>
        <p className="text-text-secondary text-sm leading-relaxed">{node.detail}</p>
      </motion.div>
    </motion.div>
  );
}
