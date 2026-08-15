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
        // Imperium palette — all values resolve through CSS custom properties
        // (src/styles/globals.css :root / [data-theme="light"]) so no component
        // ever hardcodes a hex outside the token system.
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
          overlay: "var(--bg-overlay)",
        },
        gold: "var(--gold)",
        "gold-text": "var(--gold-text)",
        bronze: "var(--bronze)",
        purple: "var(--purple)",
        oxblood: "var(--oxblood)",
        border: "var(--border)",
        accent: {
          blue: "var(--accent-blue)",
          purple: "var(--accent-purple)",
          glow: "var(--accent-glow)",
          cyan: "var(--accent-cyan)",
          gold: "var(--accent-gold)",
          red: "var(--accent-red)",
          green: "var(--accent-green)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "'Fira Code'", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "'Inter'", "sans-serif"],
        chapter: ["var(--font-cinzel)", "serif"],
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
