"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { galleryItems, galleryCategories, galleryYears, type GalleryCategory } from "@/data/gallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = galleryItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedYear === "all" || item.year === selectedYear)
  );

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Photo Gallery"
          subtitle="Every photograph captures a chapter. Some are milestones. Some are memories. Some are roads worth remembering."
          accent="blue"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${selectedCategory === "all" ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/40" : "text-text-muted border border-white/10 hover:border-white/30"}`}
          >
            All
          </button>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all ${selectedCategory === cat ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/40" : "text-text-muted border border-white/10 hover:border-white/30"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedYear("all")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${selectedYear === "all" ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/40" : "text-text-muted border border-white/10 hover:border-white/30"}`}
          >
            All Years
          </button>
          {galleryYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${selectedYear === year ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/40" : "text-text-muted border border-white/10 hover:border-white/30"}`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Gallery grid or placeholder */}
        {filtered.length === 0 ? (
          <div className="card-base border-dashed border-white/20 p-16 text-center">
            <div className="text-5xl mb-4">📷</div>
            <p className="text-text-muted font-mono text-sm">
              [YOU FILL] — Add images in{" "}
              <code className="text-accent-blue">public/images/gallery/&#123;category&#125;/</code>{" "}
              and entries in{" "}
              <code className="text-accent-blue">src/data/gallery.ts</code>
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(item)}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full object-cover rounded-xl group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-xl flex items-end p-3">
                  <p className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[9500] bg-black/90 flex items-center justify-center p-4"
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
                className="relative max-w-4xl w-full"
              >
                <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-xl" />
                <p className="mt-3 text-text-secondary text-sm text-center">{lightbox.caption}</p>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
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
