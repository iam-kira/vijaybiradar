"use client";

import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import type { ArchitectureNode, ArchitectureEdge } from "@/data/projects";

const TYPE_COLORS: Record<string, string> = {
  input: "#3b82f6",
  output: "#22c55e",
  process: "#8b5cf6",
  ai: "#f59e0b",
  storage: "#22d3ee",
};

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  onNodeClick: (node: ArchitectureNode) => void;
}

export function ArchitectureDiagram({ nodes, edges, onNodeClick }: ArchitectureDiagramProps) {
  const rfNodes: Node[] = nodes.map((n) => ({
    id: n.id,
    position: n.position,
    data: { label: n.label },
    style: {
      background: "rgba(18,18,31,0.95)",
      border: `1px solid ${TYPE_COLORS[n.type ?? "process"] ?? "#6366f1"}`,
      borderRadius: "8px",
      color: "#f1f5f9",
      fontSize: "11px",
      fontFamily: "monospace",
      padding: "8px 12px",
      cursor: "pointer",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "80px",
      boxShadow: `0 0 10px ${TYPE_COLORS[n.type ?? "process"] ?? "#6366f1"}33`,
    },
  }));

  const rfEdges: Edge[] = edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: e.animated ?? false,
    style: { stroke: "rgba(99,102,241,0.6)", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(99,102,241,0.6)" },
  }));

  return (
    <div className="h-80 rounded-lg overflow-hidden border border-white/10" style={{ background: "rgba(10,10,15,0.6)" }}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodeClick={(_, node) => {
          const original = nodes.find((n) => n.id === node.id);
          if (original) onNodeClick(original);
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(99,102,241,0.1)" gap={20} />
        <Controls showInteractive={false} style={{ background: "rgba(18,18,31,0.8)", border: "1px solid rgba(255,255,255,0.1)" }} />
      </ReactFlow>
    </div>
  );
}
