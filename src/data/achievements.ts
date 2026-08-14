export type AchievementCategory = "platform" | "reliability" | "leadership" | "award";

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
  description: string;
  year?: number;
  category: AchievementCategory;
  detail?: string;
}

export const achievements: Achievement[] = [
  {
    id: "reliability-guardian",
    title: "Reliability Guardian",
    emoji: "🏆",
    category: "reliability",
    description: "Managed and supported 800+ ETL pipelines across manufacturing operations.",
    detail:
      "Owned end-to-end reliability for 800+ ETL pipelines running across German and Indian manufacturing plants — the backbone of critical business data flows.",
  },
  {
    id: "platform-builder",
    title: "Platform Builder",
    emoji: "🏆",
    category: "platform",
    description: "Created DFL Cortex — an enterprise AI engineering intelligence platform.",
    detail:
      "Designed and delivered DFL Cortex from scratch: five MCP servers, 30+ repository integrations, AI-assisted analytics, and full governance visibility.",
  },
  {
    id: "observability-champion",
    title: "Observability Champion",
    emoji: "🏆",
    category: "reliability",
    description: "Reduced manual monitoring effort by ~75% through an enterprise observability platform.",
    detail:
      "Built an automated observability platform that replaced manual dashboard-watching with intelligent health checks and alerting — freeing the team for higher-value work.",
  },
  {
    id: "self-healing-architect",
    title: "Self-Healing Architect",
    emoji: "🏆",
    category: "reliability",
    description: "Automated recovery for recurring pipeline failures — 3–5 executions saved daily.",
    detail:
      "Designed a configurable self-healing framework that classifies failures, retries intelligently, and validates outputs — zero manual intervention for the majority of failures.",
  },
  {
    id: "migration-commander",
    title: "Migration Commander",
    emoji: "🏆",
    category: "platform",
    description: "Led the data engineering workstream for SAP S/4HANA migration — zero failures.",
    detail:
      "Orchestrated the full data engineering workstream for a major SAP S/4HANA migration with zero pipeline failures and zero business disruption throughout the transition.",
  },
  {
    id: "ai-evangelist",
    title: "AI Evangelist",
    emoji: "🏆",
    category: "leadership",
    description: "Delivered AI adoption workshops for 80+ stakeholders across the enterprise.",
    detail:
      "Ran AI enablement sessions for 80+ participants — managers, architects, senior managers, product owners, and technical leads — translating AI capabilities into business value.",
  },
  {
    id: "integrity-award",
    title: "Integrity Award",
    emoji: "🏆",
    category: "award",
    year: 2025,
    description: "Recognized for consistent integrity across all engineering engagements.",
    detail:
      "Awarded in 2025 for demonstrating unwavering reliability, transparency, and trustworthiness in every technical and collaborative context.",
  },
  {
    id: "curious-scholar",
    title: "Curious Scholar Award",
    emoji: "🏆",
    category: "award",
    year: 2025,
    description: "Awarded for continuous curiosity-driven learning and bringing insights to the team.",
    detail:
      "Recognized in 2025 for exploring new technologies with genuine curiosity and consistently sharing learnings that elevated the team's capabilities.",
  },
  {
    id: "continuous-effort",
    title: "Continuous Effort Reliability Award",
    emoji: "🏆",
    category: "award",
    year: 2024,
    description: "Recognized for sustained reliability and consistent effort in delivery.",
    detail:
      "Awarded in 2024 for showing up with consistent effort and dependable delivery across all data engineering commitments throughout the year.",
  },
];
