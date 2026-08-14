export type GalleryCategory =
  | "professional"
  | "workshops"
  | "projects"
  | "travel"
  | "riding"
  | "friends"
  | "events"
  | "nature"
  | "personal";

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
  year: number;
  width?: number;
  height?: number;
}

// [YOU FILL] — add your actual images here
// Place image files in public/images/gallery/{category}/
// Example entry:
// {
//   id: "conf-2025-01",
//   src: "/vijaybiradar/images/gallery/professional/team-2025.jpg",
//   caption: "Team photo at the 2025 innovation summit",
//   category: "professional",
//   year: 2025,
// }

export const galleryItems: GalleryItem[] = [
  // [YOU FILL]
];

export const galleryYears = [2024, 2025, 2026];
export const galleryCategories: GalleryCategory[] = [
  "professional",
  "workshops",
  "projects",
  "travel",
  "riding",
  "friends",
  "events",
  "nature",
  "personal",
];
