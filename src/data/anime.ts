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
    posterSrc: "/vijaybiradar/images/anime/death-note.jpg",
  },
  {
    id: "sao",
    title: "Sword Art Online",
    lessonTag: "Growth",
    blurb: "Leveling up isn't just a game mechanic — it's a mindset.",
    posterSrc: "/vijaybiradar/images/anime/sao.jpg",
  },
  {
    id: "parasyte",
    title: "Parasyte -the maxim-",
    lessonTag: "Identity & Adaptation",
    blurb: "What makes us human is tested when everything changes.",
    posterSrc: "/vijaybiradar/images/anime/parasyte.jpg",
  },
  {
    id: "aot",
    title: "Attack on Titan",
    lessonTag: "Never Giving Up",
    blurb: "Walls fall. You rebuild, rethink, and keep fighting anyway.",
    posterSrc: "/vijaybiradar/images/anime/aot.jpg",
  },
  {
    id: "shield-hero",
    title: "The Rising of the Shield Hero",
    lessonTag: "Discipline",
    blurb: "Strength built quietly, one unglamorous defense at a time.",
    posterSrc: "/vijaybiradar/images/anime/shield-hero.jpg",
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    lessonTag: "Growth & Ambition",
    blurb: "From weakest to strongest — growth is a grind, not a shortcut.",
    posterSrc: "/vijaybiradar/images/anime/solo-leveling.jpg",
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
