export interface QuoteEntry {
  id: string;
  quote: string;
  attribution?: string;
  theme: string;
  reflection?: string;
}

export const quotes: QuoteEntry[] = [
  {
    id: "veni-vidi-vici",
    quote: "Veni. Vidi. Vici.",
    attribution: "Julius Caesar",
    theme: "Decisive Action",
    reflection:
      "I came. I saw. I conquered. Not just as a battle cry — but as a philosophy. See the problem clearly, act decisively, and move forward.",
  },
  {
    id: "waste-no-time",
    quote: "Waste no more time arguing what a good man should be. Be one.",
    attribution: "Marcus Aurelius — Meditations",
    theme: "Character Through Action",
    reflection:
      "Stop debating integrity. Live it. The Stoics understood that virtue is not an argument — it's a daily practice.",
  },
  {
    id: "if-you-prick-us",
    quote: "If you prick us, do we not bleed?",
    attribution: "William Shakespeare — The Merchant of Venice",
    theme: "Humanity, Dignity & Fairness",
    reflection:
      "This quote reminds me that dignity, fairness, and empathy matter. The best response to being wronged is not blind revenge. It is strength, wisdom, and justice.",
  },
  // [YOU FILL] — add 3–5 more books/quotes that are genuinely yours
  // Schema: { id, quote, attribution, theme, reflection }
];
