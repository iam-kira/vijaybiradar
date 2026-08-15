export interface AnimeEntry {
  id: string;
  title: string;
  lessonTag: string;
  blurb: string;
  posterSrc?: string;
}

export const animeList: AnimeEntry[] = [
  {
    id: "death-note",
    title: "Death Note",
    lessonTag: "Strategy",
    blurb: "A war of intellect fought one calculated move at a time.",
    posterSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sao",
    title: "Sword Art Online",
    lessonTag: "Growth",
    blurb: "Leveling up isn't just a game mechanic — it's a mindset.",
    posterSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "parasyte",
    title: "Parasyte -the maxim-",
    lessonTag: "Identity & Adaptation",
    blurb: "What makes us human is tested when everything changes.",
    posterSrc: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aot",
    title: "Attack on Titan",
    lessonTag: "Never Giving Up",
    blurb: "Walls fall. You rebuild, rethink, and keep fighting anyway.",
    posterSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "shield-hero",
    title: "The Rising of the Shield Hero",
    lessonTag: "Discipline",
    blurb: "Strength built quietly, one unglamorous defense at a time.",
    posterSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    lessonTag: "Growth & Ambition",
    blurb: "From weakest to strongest — growth is a grind, not a shortcut.",
    posterSrc: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
  },
  // [YOU FILL] — add more anime entries here using the same shape
];

export const animeThemes = [
  "Persistence",
  "Strategy",
  "Discipline",
  "Friendship",
  "Growth",
  "Never Giving Up",
];
