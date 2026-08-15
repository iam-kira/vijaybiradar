export type ArmillaryChapter = {
  id: "data" | "ai" | "security" | "personal";
  numeral: string;
  title: string;
  body: string;
  stat: { value: string; label: string };
};

export const ARMILLARY_CHAPTERS: ArmillaryChapter[] = [
  {
    id: "data",
    numeral: "I",
    title: "The Aqueducts",
    body: "Enterprise data pipelines, built to carry what a business runs on — steady, load-bearing, unglamorous by design.",
    stat: { value: "800+", label: "ETL pipelines" },
  },
  {
    id: "ai",
    numeral: "II",
    title: "The Oracle",
    body: "LLMs, MCP, RAG — new instruments pressed into old discipline. Adoption led with judgment, not hype.",
    stat: { value: "80+", label: "AI workshop participants" },
  },
  {
    id: "security",
    numeral: "III",
    title: "The Praetorian Guard",
    body: "Trusted advisor for production security. The watch that lets everyone else build without looking over their shoulder.",
    stat: { value: "SPOC", label: "Cybersecurity" },
  },
  {
    id: "personal",
    numeral: "IV",
    title: "Off Duty",
    body: "Books, the road, a violin still being learned, a few games played well. A mind kept sharp off the clock stays sharp on it.",
    stat: { value: "4", label: "disciplines, one temperament" },
  },
];
