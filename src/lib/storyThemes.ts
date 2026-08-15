export type StoryThemeId =
  | "home"
  | "about"
  | "architecture"
  | "command"
  | "gaming"
  | "cyber"
  | "reading"
  | "anime"
  | "violin"
  | "victories"
  | "gallery"
  | "resume"
  | "contact"
  | "default";

export type StoryTheme = {
  id: StoryThemeId;
  name: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    panel: string;
    background: string;
    ghost: string;
  };
  motion: {
    duration: number;
    ease: [number, number, number, number];
    panelDelay: number;
  };
};

/**
 * Every page theme is built from the same four Imperium tokens
 * (gold #c9a227, bronze #a8703f, purple #5b3a6e, oxblood #7a2e2e) —
 * only the emphasis and background tint shift per chapter, never the hue.
 * Restraint is the brand: no rainbow-per-page palette.
 */
const GOLD = "#c9a227";
const BRONZE = "#a8703f";
const PURPLE = "#5b3a6e";
const OXBLOOD = "#7a2e2e";

function theme(
  id: StoryThemeId,
  name: string,
  primary: string,
  secondary: string,
  accent: string,
  glow: string,
  bgTint: string,
  panelDelay = 0.12
): StoryTheme {
  return {
    id,
    name,
    palette: {
      primary,
      secondary,
      accent,
      glow,
      panel: `rgba(20, 16, 11, 0.72)`,
      background: bgTint,
      ghost: "rgba(201, 162, 39, 0.12)",
    },
    motion: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      panelDelay,
    },
  };
}

export const STORY_THEMES: Record<StoryThemeId, StoryTheme> = {
  default: theme("default", "Imperium", GOLD, BRONZE, PURPLE, GOLD, "#0b0906"),
  home: theme("home", "Conquest", GOLD, BRONZE, PURPLE, GOLD, "#0b0906"),
  about: theme("about", "Meditations", PURPLE, GOLD, BRONZE, PURPLE, "#0d0910"),
  architecture: theme("architecture", "The Aqueducts", BRONZE, GOLD, PURPLE, BRONZE, "#0b0a08"),
  command: theme("command", "The Praetorium", GOLD, OXBLOOD, BRONZE, GOLD, "#0b0906"),
  gaming: theme("gaming", "Off Duty · Arena", BRONZE, PURPLE, GOLD, BRONZE, "#0c0907"),
  cyber: theme("cyber", "The Praetorian Guard", OXBLOOD, GOLD, BRONZE, OXBLOOD, "#0d0807"),
  reading: theme("reading", "Off Duty · Reading Room", PURPLE, BRONZE, GOLD, PURPLE, "#0c0910"),
  anime: theme("anime", "Off Duty · Anime Zone", PURPLE, OXBLOOD, GOLD, PURPLE, "#0d090f"),
  violin: theme("violin", "Off Duty · Violin Corner", PURPLE, GOLD, BRONZE, PURPLE, "#0c0910"),
  victories: theme("victories", "Triumphs", GOLD, PURPLE, BRONZE, GOLD, "#0c0a06"),
  resume: theme("resume", "Cursus Honorum", GOLD, BRONZE, OXBLOOD, GOLD, "#0b0906"),
  contact: theme("contact", "The Forum", BRONZE, GOLD, PURPLE, BRONZE, "#0b0906"),
  gallery: theme("gallery", "Off Duty · Gallery", BRONZE, PURPLE, GOLD, BRONZE, "#0b0907"),
};

export const STORY_THEME_KEYS = Object.keys(STORY_THEMES) as StoryThemeId[];

export function getStoryTheme(themeId?: StoryThemeId): StoryTheme {
  return STORY_THEMES[themeId ?? "default"] ?? STORY_THEMES.default;
}
