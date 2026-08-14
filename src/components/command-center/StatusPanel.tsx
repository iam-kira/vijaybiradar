"use client";

const CATEGORIES = [
  { label: "Manufacturing Pipelines", count: "320+", color: "bg-accent-blue" },
  { label: "Financial Data Flows", count: "180+", color: "bg-accent-purple" },
  { label: "Supplier Integration", count: "140+", color: "bg-accent-cyan" },
  { label: "Observability Jobs", count: "80+", color: "bg-accent-green" },
  { label: "AI Platform Feeds", count: "60+", color: "bg-accent-gold" },
  { label: "Migration Pipelines", count: "20+", color: "bg-accent-red" },
];

export function StatusPanel() {
  return (
    <div className="card-base p-6 mb-8">
      <h3 className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-4">
        Pipeline Categories — All Systems Operational
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${color} status-pulse flex-shrink-0`} />
            <div>
              <p className="text-xs text-text-secondary">{label}</p>
              <p className="text-sm font-mono font-semibold text-text-primary">{count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
