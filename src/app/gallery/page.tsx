"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { galleryCategories, galleryYears, type GalleryCategory, type GalleryItem, getGalleryItems } from "@/data/gallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const galleryItems = await getGalleryItems();
      if (active) {
        setItems(galleryItems);
        setLoading(false);
      }
    };

    load();
    return () => { active = false; };
  }, []);

  const filtered = items.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedYear === "all" || item.year === selectedYear)
  );

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="The Archive"
          subtitle="Moments become memories. Memories become stories."
          accent="blue"
        />

        <div className="mb-10 rounded-3xl border border-accent-blue/25 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10 p-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 10 · The Archive</p>
          <p className="text-base leading-8 text-text-secondary">
            This is where the life behind the work becomes visible: personal memories, quiet moments,
            routes traveled, and chapters that shaped the person behind the systems.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${selectedCategory === "all" ? "border border-accent-blue/40 bg-accent-blue/20 text-accent-blue" : "border border-white/10 text-text-muted hover:border-white/30"}`}
          >
            All
          </button>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-mono capitalize transition-all ${selectedCategory === cat ? "border border-accent-blue/40 bg-accent-blue/20 text-accent-blue" : "border border-white/10 text-text-muted hover:border-white/30"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedYear("all")}
            className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${selectedYear === "all" ? "border border-accent-purple/40 bg-accent-purple/20 text-accent-purple" : "border border-white/10 text-text-muted hover:border-white/30"}`}
          >
            All Years
          </button>
          {galleryYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${selectedYear === year ? "border border-accent-purple/40 bg-accent-purple/20 text-accent-purple" : "border border-white/10 text-text-muted hover:border-white/30"}`}
            >
              {year}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card-base border-dashed border-white/20 p-16 text-center">
            <div className="mb-4 text-5xl">⏳</div>
            <p className="font-mono text-sm text-text-muted">Loading archive…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-base border-dashed border-white/20 p-16 text-center">
            <div className="mb-4 text-5xl">📷</div>
            <p className="font-mono text-sm text-text-muted">
              Drop images into <span className="text-accent-blue">public/images/gallery</span> and run the gallery generator to populate this archive.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(item)}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full rounded-xl object-cover transition-all group-hover:brightness-110"
                />
                <div className="absolute inset-0 flex items-end rounded-xl bg-black/0 p-3 transition-all group-hover:bg-black/30">
                  <p className="text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl"
              >
                <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-xl" />
                <p className="mt-3 text-center text-sm text-text-secondary">{lightbox.caption}</p>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  aria-label="Close lightbox"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
