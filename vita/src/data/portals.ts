/**
 * What is behind the two portals, drawn from Vijay_Biradar_Resume.pdf.
 *
 * JOURNEY is chronological — the things that shaped him, in the order they happened.
 * BUILD is the work itself, strongest first. Both are read by the DOM overlay in
 * PortalOverlay and by the 3D interiors in Portal.tsx, so the count here decides how
 * long the timeline runs and how wide the project grid is.
 */

export interface Milestone {
  year: string;
  title: string;
  where: string;
  detail: string;
}

export const milestones: Milestone[] = [
  {
    year: '2017',
    title: 'Volunteer Lead',
    where: 'Women and Children Welfare Association',
    detail:
      'Took over a family-founded initiative: vaccination drives, health camps and welfare programs reaching 100+ people a year across rural communities. Digital coordination cut the logistics overhead by about 80%.',
  },
  {
    year: '2019',
    title: 'B.E., Computer Science & Engineering',
    where: 'Visvesvaraya Technological University, Mysuru',
    detail:
      'Four years to August 2023. Along the way, a PCOS/PCOD screening classifier that reached roughly 82% accuracy on health questionnaire data.',
  },
  {
    year: '2022',
    title: 'Top 5 of 100+ teams',
    where: 'Microsoft Azure Hackathon',
    detail:
      'A CNN for plant disease detection: about 87% accuracy over 1,000+ labelled leaf images, with tuning that cut misclassification by around 20%.',
  },
  {
    year: '2023',
    title: 'Data Engineer',
    where: 'Daimler Truck Innovation Center India',
    detail:
      'Joined in February. Ownership of 800+ ETL pipelines and 30+ enterprise data products across manufacturing plants in Germany and India — architecture through to production support.',
  },
  {
    year: '2024',
    title: 'Continuous Effort Reliability Award',
    where: 'Daimler Truck',
    detail:
      'For reliability work across the pipeline estate — observability, self-healing recovery, and the incident response behind both.',
  },
  {
    year: '2025',
    title: 'Integrity Award · Curious Scholar Award',
    where: 'Daimler Truck',
    detail:
      'The same year as the enterprise AI adoption workshops: one day in 2025 for 80+ managers, architects and technical leads, expanded to three days in 2026.',
  },
];

export interface Project {
  title: string;
  kind: string;
  detail: string;
  /** The one number that says why it mattered. */
  result: string;
}

export const projects: Project[] = [
  {
    title: 'DFL Cortex',
    kind: 'Enterprise engineering platform',
    detail:
      'Built to answer fragmented engineering knowledge, governance and tooling across teams. Integrates five MCP servers, enterprise APIs, databases and 30+ repositories, exposing data lineage, governance visibility and documentation — with an AI-assisted analytics layer over LibreChat, MCP, OpenAI APIs and Ollama.',
    result: '30+ repositories under one platform',
  },
  {
    title: 'Enterprise Observability',
    kind: 'Monitoring capability',
    detail:
      'Manual, reactive monitoring across 800+ pipelines was a scaling risk long before it became an incident. Centralised dashboards, proactive health checks and automated alerting, standardised enterprise-wide.',
    result: '~75% less daily manual monitoring',
  },
  {
    title: 'Self-Healing Retry Framework',
    kind: 'Reliability pattern',
    detail:
      'A configurable retry layer that removed repetitive manual recovery of pipeline failures. Now a reusable pattern adopted across the pipeline estate.',
    result: '3–5 failed executions recovered daily',
  },
  {
    title: 'SAP S/4HANA Migration',
    kind: 'Enterprise migration',
    detail:
      'Led the data engineering workstream for the server migration — planning and executing the transition of production ETL pipelines so manufacturing data stayed available straight through cutover.',
    result: 'Zero pipeline failures at cutover',
  },
  {
    title: 'WCM Cost Deployment',
    kind: 'Data product',
    detail:
      'Pipelines on a medallion bronze/silver/gold architecture, with MCP integrated so business stakeholders could ask questions of the data directly — extending the platform out of engineering and into decision support.',
    result: 'Bronze / silver / gold, AI-queryable',
  },
  {
    title: 'Shopfloor Digitalisation',
    kind: 'Conceived and led',
    detail:
      'Manual paper printouts on the shopfloor replaced with a web-based capture system feeding a structured database, which made real-time production dashboards possible for the first time.',
    result: 'Paper eliminated, dashboards live',
  },
];
