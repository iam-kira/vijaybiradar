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

export const STORY_THEMES: Record<StoryThemeId, StoryTheme> = {
  default: {
    id: "default",
    name: "Nord Noir",
    palette: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      glow: "#6366f1",
      panel: "rgba(15, 23, 42, 0.62)",
      background: "#09090d",
      ghost: "rgba(148, 163, 184, 0.14)",
    },
    motion: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.12,
    },
  },
  home: {
    id: "home",
    name: "Conquest",
    palette: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      glow: "#60a5fa",
      panel: "rgba(11, 18, 30, 0.72)",
      background: "#07080d",
      ghost: "rgba(96, 165, 250, 0.16)",
    },
    motion: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.12,
    },
  },
  about: {
    id: "about",
    name: "Mission",
    palette: {
      primary: "#8b5cf6",
      secondary: "#3b82f6",
      accent: "#22d3ee",
      glow: "#a78bfa",
      panel: "rgba(15, 13, 29, 0.7)",
      background: "#090912",
      ghost: "rgba(167, 139, 250, 0.14)",
    },
    motion: {
      duration: 0.82,
      ease: [0.2, 0.9, 0.2, 1],
      panelDelay: 0.14,
    },
  },
  architecture: {
    id: "architecture",
    name: "System",
    palette: {
      primary: "#22d3ee",
      secondary: "#3b82f6",
      accent: "#f59e0b",
      glow: "#67e8f9",
      panel: "rgba(7, 20, 30, 0.68)",
      background: "#050d14",
      ghost: "rgba(103, 232, 249, 0.12)",
    },
    motion: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      panelDelay: 0.1,
    },
  },
  command: {
    id: "command",
    name: "Command",
    palette: {
      primary: "#22c55e",
      secondary: "#0ea5e9",
      accent: "#a3e635",
      glow: "#4ade80",
      panel: "rgba(10, 22, 18, 0.7)",
      background: "#060d0a",
      ghost: "rgba(74, 222, 128, 0.12)",
    },
    motion: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.1,
    },
  },
  gaming: {
    id: "gaming",
    name: "Arena",
    palette: {
      primary: "#f97316",
      secondary: "#a855f7",
      accent: "#facc15",
      glow: "#fb923c",
      panel: "rgba(32, 17, 11, 0.7)",
      background: "#120a08",
      ghost: "rgba(251, 146, 60, 0.14)",
    },
    motion: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.16,
    },
  },
  cyber: {
    id: "cyber",
    name: "Edge",
    palette: {
      primary: "#ef4444",
      secondary: "#8b5cf6",
      accent: "#facc15",
      glow: "#f87171",
      panel: "rgba(27, 10, 12, 0.72)",
      background: "#0b0608",
      ghost: "rgba(248, 113, 113, 0.12)",
    },
    motion: {
      duration: 0.88,
      ease: [0.18, 1, 0.3, 1],
      panelDelay: 0.15,
    },
  },
  reading: {
    id: "reading",
    name: "Mind",
    palette: {
      primary: "#a855f7",
      secondary: "#ec4899",
      accent: "#f59e0b",
      glow: "#d946ef",
      panel: "rgba(21, 14, 26, 0.7)",
      background: "#0a0910",
      ghost: "rgba(217, 70, 239, 0.12)",
    },
    motion: {
      duration: 0.8,
      ease: [0.25, 1, 0.4, 1],
      panelDelay: 0.12,
    },
  },
  anime: {
    id: "anime",
    name: "Anime",
    palette: {
      primary: "#a855f7",
      secondary: "#ec4899",
      accent: "#f472b6",
      glow: "#c084fc",
      panel: "rgba(24, 12, 32, 0.72)",
      background: "#100912",
      ghost: "rgba(192, 132, 252, 0.12)",
    },
    motion: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.12,
    },
  },
  violin: {
    id: "violin",
    name: "Violin",
    palette: {
      primary: "#8b5cf6",
      secondary: "#c084fc",
      accent: "#f9a8d4",
      glow: "#d8b4fe",
      panel: "rgba(18, 12, 24, 0.7)",
      background: "#0a0912",
      ghost: "rgba(216, 180, 254, 0.12)",
    },
    motion: {
      duration: 0.8,
      ease: [0.2, 0.9, 0.3, 1],
      panelDelay: 0.15,
    },
  },
  victories: {
    id: "victories",
    name: "Victories",
    palette: {
      primary: "#f59e0b",
      secondary: "#8b5cf6",
      accent: "#facc15",
      glow: "#fbbf24",
      panel: "rgba(25, 18, 7, 0.72)",
      background: "#120d08",
      ghost: "rgba(251, 191, 36, 0.12)",
    },
    motion: {
      duration: 0.88,
      ease: [0.2, 1, 0.35, 1],
      panelDelay: 0.12,
    },
  },
  resume: {
    id: "resume",
    name: "Record",
    palette: {
      primary: "#f59e0b",
      secondary: "#fb7185",
      accent: "#22d3ee",
      glow: "#fbbf24",
      panel: "rgba(20, 16, 11, 0.72)",
      background: "#0d0907",
      ghost: "rgba(251, 191, 36, 0.12)",
    },
    motion: {
      duration: 0.8,
      ease: [0.2, 1, 0.35, 1],
      panelDelay: 0.1,
    },
  },
  contact: {
    id: "contact",
    name: "Call",
    palette: {
      primary: "#3b82f6",
      secondary: "#f59e0b",
      accent: "#a78bfa",
      glow: "#60a5fa",
      panel: "rgba(11, 18, 32, 0.7)",
      background: "#070d16",
      ghost: "rgba(96, 165, 250, 0.12)",
    },
    motion: {
      duration: 0.82,
      ease: [0.22, 1, 0.36, 1],
      panelDelay: 0.12,
    },
  },
  gallery: {
    id: "gallery",
    name: "Archive",
    palette: {
      primary: "#60a5fa",
      secondary: "#a78bfa",
      accent: "#fbbf24",
      glow: "#93c5fd",
      panel: "rgba(11, 18, 28, 0.72)",
      background: "#081018",
      ghost: "rgba(96, 165, 250, 0.12)",
    },
    motion: {
      duration: 0.82,
      ease: [0.2, 0.9, 0.25, 1],
      panelDelay: 0.12,
    },
  },
};

export const STORY_THEME_KEYS = Object.keys(STORY_THEMES) as StoryThemeId[];

export function getStoryTheme(themeId?: StoryThemeId): StoryTheme {
  return STORY_THEMES[themeId ?? "default"] ?? STORY_THEMES.default;
}
