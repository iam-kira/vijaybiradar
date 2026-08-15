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

export const galleryYears = [2024, 2025, 2026];

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch("/images/gallery-manifest.json", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.files) ? data.files as GalleryItem[] : [];
  } catch {
    return [];
  }
}
