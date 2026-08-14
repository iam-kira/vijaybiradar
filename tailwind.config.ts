import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic dark palette
        bg: {
          primary: "#0a0a0f",
          secondary: "#0f0f1a",
          card: "#12121f",
          overlay: "#1a1a2e",
        },
        accent: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          glow: "#6366f1",
          cyan: "#22d3ee",
          gold: "#f59e0b",
          red: "#ef4444",
          green: "#22c55e",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#475569",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.5)",
        "glow-purple": "0 0 30px rgba(139, 92, 246, 0.5)",
        "glow-gold": "0 0 20px rgba(245, 158, 11, 0.4)",
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cinematic":
          "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #1a0a2e 100%)",
        "gradient-blue-purple":
          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink-caret": "blink-caret .75s step-end infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.6", filter: "brightness(1.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "#3b82f6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
