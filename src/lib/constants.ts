export const SITE_URL = "https://iam-kira.github.io/vijaybiradar";
export const BASE_PATH = "/vijaybiradar";

export const SOUND_FILES = {
  introAmbient: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
  whoosh: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  achievementUnlock: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  nodeClick: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  securityAlert: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  violinNote: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  engineStart: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  keyboardType: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  defenderHit: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  defenderFail: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  hunterFound: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
  cortexCollect: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
} as const;

export type SoundName = keyof typeof SOUND_FILES;

export const SOUND_VOLUMES: Record<SoundName, number> = {
  introAmbient: 0.4,
  whoosh: 0.25,
  achievementUnlock: 0.5,
  nodeClick: 0.3,
  securityAlert: 0.4,
  violinNote: 0.5,
  engineStart: 0.3,
  keyboardType: 0.15,
  defenderHit: 0.4,
  defenderFail: 0.4,
  hunterFound: 0.4,
  cortexCollect: 0.4,
};

export type SoundMode = "cinematic" | "focus" | "silent";

// Sounds only available in Cinematic mode
export const CINEMATIC_ONLY: SoundName[] = ["introAmbient", "violinNote", "keyboardType"];

// Sounds available in Cinematic + Focus
export const CINEMATIC_FOCUS: SoundName[] = ["whoosh", "achievementUnlock"];

export const NAV_LINKS = [
  { href: "/", label: "Home", scene: "Scene 1" },
  { href: "/about", label: "About", scene: "Scene 2" },
  { href: "/command-center", label: "Command Center", scene: "Scene 3" },
  { href: "/architecture", label: "Architecture", scene: "Scene 4" },
  { href: "/victories", label: "Victories", scene: "Scene 5" },
  { href: "/cybersecurity", label: "Cybersecurity", scene: "Scene 6" },
  { href: "/reading-room", label: "Reading Room", scene: "Scene 7" },
  { href: "/gaming-arena", label: "Gaming Arena", scene: "Scene 8" },
  { href: "/anime-zone", label: "Anime Zone", scene: "Scene 9" },
  { href: "/violin-corner", label: "Violin Corner", scene: "Scene 10" },
  { href: "/riding-logs", label: "Riding Logs", scene: "Scene 11" },
  { href: "/gallery", label: "Gallery", scene: "Scene 12" },
  { href: "/resume", label: "Resume", scene: "Scene 13" },
  { href: "/contact", label: "Contact", scene: "Scene 14" },
];

export const PALETTE = {
  bgPrimary: "#0a0a0f",
  bgSecondary: "#0f0f1a",
  bgCard: "#12121f",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  glow: "#6366f1",
  cyan: "#22d3ee",
  gold: "#f59e0b",
  green: "#22c55e",
  red: "#ef4444",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
} as const;
