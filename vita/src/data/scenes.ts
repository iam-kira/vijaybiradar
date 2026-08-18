export type Theme = 'light' | 'dark';

export interface SceneData {
  id: string;
  title: string;
  subtitle: string;
  quote?: { text: string; author: string };
}

export const scenes: SceneData[] = [
  {
    id: 'introduction',
    title: 'INTRODUCTION',
    subtitle: 'Every hall was empty once.',
  },
  {
    id: 'journey',
    title: 'JOURNEY',
    subtitle: 'What shaped him — challenge, learning, growth.',
    quote: {
      text: 'Midway upon the journey of our life, I found myself within a dark wood.',
      author: 'Dante',
    },
  },
  {
    id: 'build',
    title: 'BUILD',
    subtitle: "I don't just use technology. I build systems with it.",
  },
  {
    id: 'impact',
    title: 'IMPACT',
    subtitle: 'Scale, results, and the weight of a decision.',
  },
  {
    id: 'person',
    title: 'PERSON',
    subtitle: 'Who he is when no one is watching.',
    quote: {
      text: 'Difficulties strengthen the mind, as labor does the body.',
      author: 'Seneca',
    },
  },
  {
    id: 'vision',
    title: 'VISION',
    subtitle: 'There is still a much larger map ahead.',
    quote: {
      text: 'You have power over your mind — not outside events.',
      author: 'Marcus Aurelius',
    },
  },
];

/* ── The hall ──────────────────────────────────────────────────────────────────
 * One continuous interior. Chapter `i` sits at z = -i * SPACING, and everything
 * else — arches, columns, statues — is placed relative to that, so adding a
 * chapter to the list above lengthens the hall rather than crowding it.
 */

/** Distance between chapter centres, along -Z. */
export const SPACING = 26;
/** How far in front of a chapter centre the camera sits when that chapter is framed. */
export const CAMERA_OFFSET = 9;
/** Total camera travel from the first chapter to the last. */
export const TRAVEL = (scenes.length - 1) * SPACING;

export const FLOOR_Y = -4.5;
/** Side walls; the colonnade stands just inside them. */
export const HALL_HALF_WIDTH = 11;
export const WALL_HEIGHT = 26;

/** Arches straddle the boundary between two chapters, so the camera flies through them. */
export const archZ = (i: number) => -(i + 0.5) * SPACING;
export const sceneZ = (i: number) => -i * SPACING;

/**
 * Unlit palette. Nothing here is a light colour in the physical sense — every value is
 * multiplied straight onto a base-colour texture, so these are pigment choices. Warm
 * and desaturated in both themes; the difference is candlelight versus daylight.
 */
export interface Palette {
  backdrop: string;
  floor: string;
  wall: string;
  stone: string;
  marble: string;
  /** Braziers, shafts, and anything that should read as a light source. */
  glow: string;
  /** The cursor trail. Mixed into the frame, so it is a pigment, not a light. */
  trail: string;
  fogNear: number;
  fogFar: number;
}

export const PALETTES: Record<Theme, Palette> = {
  dark: {
    backdrop: '#0a0705',
    floor: '#241c14',
    wall: '#150f0a',
    stone: '#8a7454',
    marble: '#a18b69',
    glow: '#f2cf94',
    trail: '#f2cf94',
    fogNear: 14,
    fogFar: 96,
  },
  light: {
    backdrop: '#efe5d2',
    floor: '#b9a684',
    wall: '#e0d3b6',
    stone: '#d4c2a0',
    marble: '#e6dcc6',
    glow: '#fff3d6',
    trail: '#6b4f2a',
    fogNear: 20,
    fogFar: 130,
  },
};
