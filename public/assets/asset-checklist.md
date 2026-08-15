# Asset Download Checklist — Cinematic Conqueror Portfolio

Place files into the matching folders under `public/` exactly as named.

## Images (place in `public/images/`)
- `og-image.jpg` — Social preview (1200x630). Source: Unsplash (search: "cyberpunk hero")
  - Example: https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80
- `hero-bg.jpg` — Home hero wallpaper (1600x900). Source: Unsplash ("neon city")

## Anime posters (place in `public/images/anime/`)
- `death-note.jpg`
- `sao.jpg`
- `parasyte.jpg`
- `aot.jpg`
- `shield-hero.jpg`
- `solo-leveling.jpg`

(Sources: Wikimedia Commons for official posters OR Unsplash/Pexels stylized stand-ins.)

## Game art (place in `public/images/games/`)
- `valorant.jpg`
- `cod-ghosts.jpg`

(Use official wallpapers only if you have rights; otherwise use high-quality Unsplash gaming art.)

## Gallery images (place in `public/images/gallery/{category}/`)
- `gallery-1.jpg` ... `gallery-8.jpg` (your personal photos or curated Unsplash shots)

## Audio (place in `public/audio/`)
- `intro-ambient.mp3` — cinematic ambient loop, ~30s (Mixkit / Pixabay Music)
  - Example Mixkit track: https://mixkit.co/free-music/cinematic/
- `whoosh.mp3` — short whoosh SFX (Mixkit)
- `achievement-unlock.mp3` — UI success chime (Mixkit)
- `node-click.mp3` — small click (Mixkit)
- `security-alert.mp3` — short alert (Mixkit)
- `violin-note.mp3` — short violin motif (Pixabay Music or record)
- `engine-start.mp3` — short engine/rumble (Mixkit)
- `keyboard-type.mp3` — typing loop (Freesound)

## Mini-game SFX (place in `public/audio/minigame/`)
- `defender-hit.mp3`
- `defender-fail.mp3`
- `hunter-found.mp3`
- `cortex-collect.mp3`

(Sources: Mixkit game SFX pack, Freesound.)

## Notes & recommendations
- Prefer Unsplash / Pexels / Pixabay for images (no attribution required) to avoid license issues. For anime/game posters, verify reuse rights or use stylized stand-ins.
- Optimize images to reasonable widths (900–1600px) and convert to WebP where possible to reduce size.
- Keep audio loops under 1–2 MB each; prefer short SFX (sub-1s to 4s) for UI events.
- After adding files, run `npm run build` to confirm no broken references.

## Quick copy checklist to remove placeholders
- Update any `YOU FILL` strings in `src/data/games.ts`, `src/data/gallery.ts`, `src/data/rides.ts` and `src/data/anime.ts` with the actual captions/file names.
- Ensure `src/lib/constants.ts` points to the correct audio file paths (e.g., `/vijaybiradar/audio/intro-ambient.mp3`).

---

If you want, I can fetch a small set of royalty-free example links (12 images + 8 SFX) and paste them here so you can download. Tell me "send examples" and I'll add direct URLs.