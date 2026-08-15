export const SITE_URL = "https://iam-kira.github.io/vijaybiradar";
export const BASE_PATH = "/vijaybiradar";

export const SOUND_FILES = {
  introAmbient: "/audio/background/Dark%20Symphony%20for%20a%20Genius%20Villain%20%20The%20Art%20of%20Revenge%20-%20Villainous%20Symphony.mp3",
  whoosh: "/audio/mixkit-cinematic-suspense-swell-786.wav",
  achievementUnlock: "/audio/mixkit-trumpet-fanfare-2293.wav",
  nodeClick: "/audio/mixkit-cinematic-action-suspense-688.wav",
  securityAlert: "/audio/mixkit-eerie-trailer-horn-transition-2291.wav",
  violinNote: "/audio/violin-note.wav",
  engineStart: "/audio/mixkit-futuristic-space-war-percussion-2787.wav",
  keyboardType: "/audio/mixkit-cinematic-mystery-heartbeat-transition-492.wav",
  defenderHit: "/audio/minigame/defender-hit.wav",
  defenderFail: "/audio/minigame/defender-fail.wav",
  hunterFound: "/audio/minigame/hunter-found.wav",
  cortexCollect: "/audio/minigame/cortex-collect.wav",
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

export const CAMPAIGN_LINKS = [
  { href: "/", label: "The Rise", scene: "Campaign" },
  { href: "/about", label: "Meditations", scene: "Campaign" },
  { href: "/command-center", label: "The Praetorium", scene: "Campaign" },
  { href: "/architecture", label: "The Aqueducts", scene: "Campaign" },
  { href: "/victories", label: "Triumphs", scene: "Campaign" },
  { href: "/cybersecurity", label: "The Praetorian Guard", scene: "Campaign" },
  { href: "/resume", label: "Cursus Honorum", scene: "Campaign" },
  { href: "/contact", label: "The Forum", scene: "Campaign" },
];

export const OFF_DUTY_LINKS = [
  { href: "/reading-room", label: "Reading Room", scene: "Off Duty" },
  { href: "/gaming-arena", label: "Gaming Arena", scene: "Off Duty" },
  { href: "/violin-corner", label: "Violin Corner", scene: "Off Duty" },
  { href: "/riding-logs", label: "Riding Logs", scene: "Off Duty" },
  { href: "/anime-zone", label: "Anime Zone", scene: "Off Duty" },
  { href: "/gallery", label: "Gallery", scene: "Off Duty" },
];

export const NAV_LINKS = [...CAMPAIGN_LINKS, ...OFF_DUTY_LINKS];

/**
 * JS-side mirror of the dark-theme tokens for contexts that can't read CSS
 * custom properties (canvas 2D, inline SVG stroke/fill computed in JS).
 * The CSS custom properties in src/styles/globals.css are the source of
 * truth — keep these in sync with the `:root` block there.
 */
export const PALETTE = {
  bgPrimary: "#0b0906",
  bgSecondary: "#14100a",
  bgCard: "#1a140d",
  gold: "#c9a227",
  bronze: "#a8703f",
  purple: "#5b3a6e",
  oxblood: "#7a2e2e",
  textPrimary: "#f2ead9",
  textSecondary: "#cbbfa3",
} as const;
