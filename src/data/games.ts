export interface GameEntry {
  id: string;
  title: string;
  mostLoved?: boolean;
  ignOrTag?: string;
  role?: string;
  rank?: string;
  note?: string;
  keyArtSrc?: string;
}

export const gamesList: GameEntry[] = [
  {
    id: "valorant",
    title: "Valorant",
    keyArtSrc: "/vijaybiradar/images/games/valorant.jpg",
    ignOrTag: "[YOU FILL — e.g. VijayB#XXXX]",
    role: "[YOU FILL — main agent/role, e.g. Sentinel / Reyna]",
    rank: "[YOU FILL — optional current rank]",
  },
  {
    id: "cod-ghosts",
    title: "Call of Duty: Ghosts",
    mostLoved: true,
    keyArtSrc: "/vijaybiradar/images/games/cod-ghosts.jpg",
    note: "[YOU FILL — favorite mode/map/loadout, or one-line why this is the most loved game]",
  },
  // [YOU FILL] — add more game entries here using the same shape
];
