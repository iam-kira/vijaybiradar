export interface ArchitectureNode {
  id: string;
  label: string;
  detail: string;
  type?: "input" | "output" | "process" | "ai" | "storage";
  position: { x: number; y: number };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  humorLine?: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export const projects: Project[] = [
  {
    slug: "dfl-cortex",
    title: "DFL Cortex",
    tagline: "Enterprise Engineering Intelligence Platform",
    description:
      "An enterprise engineering platform integrating five MCP servers, enterprise APIs, databases, and 30+ repositories — providing data lineage, governance visibility, technical documentation, and developer productivity tooling, with an AI-assisted analytics layer (LibreChat, MCP, OpenAI APIs, Ollama).",
    nodes: [
      { id: "github", label: "GitHub\n(30+ Repos)", detail: "Source control for all data engineering repositories, pipeline code, and documentation.", type: "input", position: { x: 0, y: 0 } },
      { id: "jira", label: "Jira", detail: "Project tracking and issue management integrated into the Cortex AI context.", type: "input", position: { x: 0, y: 120 } },
      { id: "confluence", label: "Confluence", detail: "Technical documentation hub — Cortex surfaces and generates documentation from here.", type: "input", position: { x: 0, y: 240 } },
      { id: "sql", label: "SQL Server", detail: "Enterprise data storage for pipeline outputs, metadata, and lineage records.", type: "storage", position: { x: 0, y: 360 } },
      { id: "talend", label: "Talend\n(800+ Pipelines)", detail: "ETL orchestration engine — Cortex provides lineage visibility across all jobs.", type: "process", position: { x: 0, y: 480 } },
      { id: "mcp", label: "MCP Layer\n(5 Servers)", detail: "Model Context Protocol servers bridging enterprise data sources with the AI layer.", type: "ai", position: { x: 250, y: 240 } },
      { id: "cortex", label: "DFL Cortex", detail: "The central engineering intelligence platform — orchestrates AI queries, lineage, and governance.", type: "ai", position: { x: 500, y: 240 } },
      { id: "ai", label: "AI Assistant\n(LibreChat + Ollama)", detail: "AI-assisted analytics powered by OpenAI APIs and Ollama — answers engineering questions using live enterprise context.", type: "ai", position: { x: 750, y: 240 } },
      { id: "users", label: "Engineering\nUsers", detail: "Data engineers, architects, and business stakeholders consuming DFL Cortex insights.", type: "output", position: { x: 1000, y: 240 } },
    ],
    edges: [
      { id: "e1", source: "github", target: "mcp", animated: true },
      { id: "e2", source: "jira", target: "mcp", animated: true },
      { id: "e3", source: "confluence", target: "mcp", animated: true },
      { id: "e4", source: "sql", target: "mcp", animated: true },
      { id: "e5", source: "talend", target: "mcp", animated: true },
      { id: "e6", source: "mcp", target: "cortex", animated: true },
      { id: "e7", source: "cortex", target: "ai", animated: true },
      { id: "e8", source: "ai", target: "users" },
    ],
  },
  {
    slug: "observability-platform",
    title: "Observability Platform",
    tagline: "800+ Pipelines. One Dashboard. Zero Guesswork.",
    humorLine: "Because staring at dashboards manually is not a career goal.",
    description:
      "A centralized observability platform that monitors 800+ ETL pipelines across manufacturing operations in Germany and India, providing automated health checks, centralized dashboards, and intelligent alerting — reducing manual monitoring effort by ~75%.",
    nodes: [
      { id: "pipelines", label: "800+ ETL\nPipelines", detail: "All data engineering pipelines across German and Indian manufacturing plants.", type: "input", position: { x: 0, y: 200 } },
      { id: "health", label: "Health\nChecks", detail: "Automated health check jobs that probe pipeline status, output validity, and SLA compliance.", type: "process", position: { x: 250, y: 200 } },
      { id: "dashboard", label: "Central\nDashboard", detail: "Unified dashboard providing real-time status across all pipeline categories and plants.", type: "ai", position: { x: 500, y: 200 } },
      { id: "alerts", label: "Automated\nAlerts", detail: "Intelligent alerting system notifying pipeline owners of failures, degradations, and anomalies.", type: "process", position: { x: 750, y: 100 } },
      { id: "result", label: "~75% Manual\nEffort Reduced", detail: "Quantified impact: manual monitoring effort reduced by approximately 75% across the team.", type: "output", position: { x: 750, y: 300 } },
    ],
    edges: [
      { id: "e1", source: "pipelines", target: "health", animated: true },
      { id: "e2", source: "health", target: "dashboard", animated: true },
      { id: "e3", source: "dashboard", target: "alerts", animated: true },
      { id: "e4", source: "dashboard", target: "result" },
    ],
  },
  {
    slug: "self-healing-framework",
    title: "Self-Healing Framework",
    tagline: "Pipelines That Fix Themselves.",
    humorLine: "Even pipelines deserve a second chance.",
    description:
      "A configurable retry framework that automatically classifies pipeline errors, retries failed executions with intelligent backoff, validates outputs post-retry, and either resolves the failure or escalates with full context — recovering 3–5 failed executions per day without manual intervention.",
    nodes: [
      { id: "failure", label: "Pipeline\nFailure", detail: "A pipeline execution fails — triggering the self-healing workflow.", type: "input", position: { x: 0, y: 200 } },
      { id: "classify", label: "Classify\nError", detail: "Error classification engine categorizes the failure type: network, schema, deadlock, schedule, config.", type: "process", position: { x: 220, y: 200 } },
      { id: "retry", label: "Auto\nRetry", detail: "Configurable retry logic with intelligent backoff — retries the failed execution automatically.", type: "process", position: { x: 440, y: 200 } },
      { id: "validate", label: "Validate\nOutput", detail: "Post-retry output validation ensures data quality before marking the execution as successful.", type: "process", position: { x: 660, y: 200 } },
      { id: "success", label: "Success", detail: "3–5 pipeline failures auto-recovered per day — zero manual intervention required.", type: "output", position: { x: 880, y: 100 } },
      { id: "escalate", label: "Escalation", detail: "If auto-recovery fails, the framework escalates with full diagnostic context to the pipeline owner.", type: "output", position: { x: 880, y: 300 } },
    ],
    edges: [
      { id: "e1", source: "failure", target: "classify", animated: true },
      { id: "e2", source: "classify", target: "retry", animated: true },
      { id: "e3", source: "retry", target: "validate", animated: true },
      { id: "e4", source: "validate", target: "success" },
      { id: "e5", source: "validate", target: "escalate" },
    ],
  },
  {
    slug: "cybersecurity-ai-agent",
    title: "Cybersecurity AI Agent",
    tagline: "Simple security. Faster response. Stronger protection.",
    description:
      "An applied security engineering initiative designed to bring AI-assisted code security review into the data platform CI/CD flow. The agent intercepts code commits, runs automated checks for secrets, risky dependencies, vulnerabilities, and compliance issues, and alerts repository owners — reducing the window between introduction and detection of security issues.",
    nodes: [
      { id: "commit", label: "Code\nCommit", detail: "A developer pushes code to a data pipeline or platform repository.", type: "input", position: { x: 0, y: 200 } },
      { id: "webhook", label: "GitHub\nWebhook", detail: "GitHub webhook triggers the security review pipeline on every push.", type: "process", position: { x: 220, y: 200 } },
      { id: "agent", label: "AI Security\nAgent", detail: "AI-powered agent orchestrates multiple security checks using LLM analysis and pattern matching.", type: "ai", position: { x: 440, y: 200 } },
      { id: "secrets", label: "Secret\nDetection", detail: "Scans for hardcoded credentials, API keys, tokens, and connection strings.", type: "process", position: { x: 660, y: 50 } },
      { id: "deps", label: "Dependency\nScan", detail: "Identifies known vulnerable dependencies and packages with security advisories.", type: "process", position: { x: 660, y: 170 } },
      { id: "vuln", label: "Vulnerability\nCheck", detail: "Static analysis for common vulnerability patterns: SQL injection, insecure configs, exposed endpoints.", type: "process", position: { x: 660, y: 290 } },
      { id: "compliance", label: "Compliance\nReview", detail: "Checks adherence to internal security policies and data governance standards.", type: "process", position: { x: 660, y: 410 } },
      { id: "alert", label: "Owner\nAlert", detail: "Automated alert sent to the repository owner with findings, severity, and recommended fixes.", type: "output", position: { x: 900, y: 230 } },
    ],
    edges: [
      { id: "e1", source: "commit", target: "webhook", animated: true },
      { id: "e2", source: "webhook", target: "agent", animated: true },
      { id: "e3", source: "agent", target: "secrets", animated: true },
      { id: "e4", source: "agent", target: "deps", animated: true },
      { id: "e5", source: "agent", target: "vuln", animated: true },
      { id: "e6", source: "agent", target: "compliance", animated: true },
      { id: "e7", source: "secrets", target: "alert" },
      { id: "e8", source: "deps", target: "alert" },
      { id: "e9", source: "vuln", target: "alert" },
      { id: "e10", source: "compliance", target: "alert" },
    ],
  },
  {
    slug: "wcm-cost-deployment",
    title: "WCM Cost Deployment",
    tagline: "Medallion Architecture with AI-Assisted Analytics.",
    description:
      "A medallion (bronze/silver/gold) data architecture designed for WCM cost data, with MCP integration enabling AI-assisted analytics for business stakeholders. Raw source data is progressively refined through three layers — from ingestion to business-ready insights.",
    nodes: [
      { id: "sources", label: "Source\nSystems", detail: "Raw data from manufacturing cost systems, ERP, and operational databases.", type: "input", position: { x: 0, y: 200 } },
      { id: "bronze", label: "Bronze\nLayer", detail: "Raw ingestion layer — data landed as-is with minimal transformation. Full historical audit trail.", type: "storage", position: { x: 220, y: 200 } },
      { id: "silver", label: "Silver\nLayer", detail: "Cleaned, validated, and conformed data — business rules applied, duplicates removed.", type: "storage", position: { x: 440, y: 200 } },
      { id: "gold", label: "Gold\nLayer", detail: "Business-ready aggregated data — optimized for reporting, KPIs, and analytical consumption.", type: "storage", position: { x: 660, y: 200 } },
      { id: "analytics", label: "Analytics &\nAI Insights", detail: "MCP-integrated AI analytics layer — business stakeholders query cost data using natural language via the AI assistant.", type: "ai", position: { x: 880, y: 200 } },
    ],
    edges: [
      { id: "e1", source: "sources", target: "bronze", animated: true },
      { id: "e2", source: "bronze", target: "silver", animated: true },
      { id: "e3", source: "silver", target: "gold", animated: true },
      { id: "e4", source: "gold", target: "analytics", animated: true },
    ],
  },
];
