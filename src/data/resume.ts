export interface ExperienceEntry {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Award {
  title: string;
  year: number;
  description?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface AdditionalProject {
  title: string;
  period: string;
  description: string;
  highlight?: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Daimler Truck Innovation Center India",
    title: "Engineer — Data Engineering & AI Platforms",
    period: "Feb 2023 – Present",
    location: "Bengaluru, India",
    bullets: [
      "Owned and managed 800+ ETL pipelines across manufacturing plant operations in Germany and India, ensuring data reliability for critical business processes.",
      "Built and delivered 30+ enterprise data products consumed by stakeholders across engineering, manufacturing, and business teams.",
      "Designed and implemented an enterprise observability platform for ETL monitoring, reducing manual monitoring effort by ~75% through automated health checks, alerting, and centralized dashboards.",
      "Developed a configurable self-healing framework that automatically classifies errors, retries failed pipeline executions, and validates outputs — recovering 3–5 failed executions per day without manual intervention.",
      "Led the data engineering workstream for SAP S/4HANA migration — zero pipeline failures and zero business disruption during transition.",
      "Created DFL Cortex: an enterprise engineering platform integrating five MCP servers, enterprise APIs, databases, and 30+ repositories — providing data lineage, governance visibility, technical documentation, and developer productivity tooling, with an AI-assisted analytics layer (LibreChat, MCP, OpenAI APIs, Ollama).",
      "Delivered AI adoption workshops and enablement sessions for 80+ stakeholders including managers, architects, senior managers, product owners, and technical leads.",
      "Acted as a trusted technical advisor across teams, frequently the first point of contact for critical production issues and security-related debugging outside direct ownership.",
      "Designed and implemented a medallion (bronze/silver/gold) data architecture with MCP integration enabling AI-assisted analytics for business stakeholders (WCM Cost Deployment).",
      "Applied security engineering practices across the data platform — initiated an AI-assisted code security review approach for detecting secrets, risky dependencies, and compliance gaps in data pipeline repositories.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "SQL", "Bash/Shell", "Java (basics)"],
  },
  {
    group: "Data Engineering",
    items: [
      "Talend",
      "Apache Airflow",
      "ETL Pipeline Design",
      "Data Modeling",
      "Medallion Architecture (Bronze/Silver/Gold)",
      "Data Lineage & Governance",
    ],
  },
  {
    group: "Data Platforms",
    items: [
      "Microsoft SQL Server",
      "SAP HANA",
      "Delta Lake",
      "Confluence",
      "Jira",
      "GitHub",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "Microsoft Azure",
      "Azure Databricks",
      "Azure Data Factory",
      "Docker",
      "GitHub Actions",
      "CI/CD Pipelines",
    ],
  },
  {
    group: "AI Engineering",
    items: [
      "OpenAI APIs",
      "Ollama",
      "LibreChat",
      "MCP (Model Context Protocol)",
      "LLM Integration",
      "RAG Patterns",
      "AI Platform Design",
    ],
  },
  {
    group: "Observability",
    items: [
      "Pipeline Health Monitoring",
      "Automated Alerting",
      "Self-Healing Frameworks",
      "Centralized Dashboards",
      "Root Cause Analysis",
    ],
  },
];

export const awards: Award[] = [
  {
    title: "Integrity Award",
    year: 2025,
    description:
      "Recognized for consistent integrity, reliability, and trustworthiness across all engineering engagements.",
  },
  {
    title: "Curious Scholar Award",
    year: 2025,
    description:
      "Awarded for continuous curiosity-driven learning, exploring new technologies, and bringing insights back to the team.",
  },
  {
    title: "Continuous Effort Reliability Award",
    year: 2024,
    description:
      "Recognized for sustained reliability and consistent effort in delivering high-quality data engineering outcomes.",
  },
];

export const education: EducationEntry[] = [
  {
    degree: "B.E., Computer Science & Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    period: "Mar 2019 – Aug 2023",
    location: "Mysuru, Karnataka, India",
  },
];

export const languages = [
  { language: "English", proficiency: "Full Professional Proficiency" },
  { language: "German", proficiency: "A2 — Actively Learning" },
  { language: "Kannada", proficiency: "Native" },
];

export const volunteering = {
  role: "Volunteer Lead",
  organization: "Women and Children Welfare Association (NGO)",
  period: "Jul 2017 – Present",
  highlights: [
    "Organized vaccination drives, health camps, and welfare programs serving 100+ individuals annually.",
    "Introduced digital coordination tools, reducing logistical overhead by ~80%.",
    "Led awareness campaigns on health, hygiene, and education for underserved communities.",
  ],
};

export const additionalProjects: AdditionalProject[] = [
  {
    title: "PCOS/PCOD Detection System",
    period: "2021 – 2023",
    description:
      "Built a machine learning system for PCOS/PCOD detection achieving ~82% classification accuracy. Applied feature engineering on clinical data and implemented multiple ML models for comparative evaluation.",
    highlight: "~82% accuracy",
  },
  {
    title: "Plant Disease Detection — MS Azure Hackathon 2022",
    period: "2022",
    description:
      "Top 5 of 100+ teams at the Microsoft Azure Hackathon. Built a CNN-based plant disease detection model trained on 1,000+ labeled images, achieving ~87% accuracy and reducing misclassification by ~20% compared to baseline.",
    highlight: "Top 5 of 100+ teams · ~87% CNN accuracy",
  },
];
