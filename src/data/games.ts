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
    keyArtSrc: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    ignOrTag: "[YOU FILL — e.g. VijayB#XXXX]",
    role: "[YOU FILL — main agent/role, e.g. Sentinel / Reyna]",
    rank: "[YOU FILL — optional current rank]",
  },
  {
    id: "cod-ghosts",
    title: "Call of Duty: Ghosts",
    mostLoved: true,
    keyArtSrc: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    note: "[YOU FILL — favorite mode/map/loadout, or one-line why this is the most loved game]",
  },
  // [YOU FILL] — add more game entries here using the same shape
];
