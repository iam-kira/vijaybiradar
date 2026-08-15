# Vijay Biradar — Portfolio Rebuild Plan
## Theme: Rome — The Stoic Strategist (Marcus Aurelius voice, Julius Caesar mode)

### Why Rome, backed by your Assessio results
- High stress tolerance, controlled emotional expression, confident-but-humble status orientation → not a showman. Rules out Solo Leveling's power-fantasy spectacle as the site's spine.
- High self-reflection + pragmatic (not idealistic) + autonomous (not compliant) → matches Aurelius's *Meditations* register: private discipline, not public performance.
- Driven, structured, analytical, industrious over joyful, prestige-oriented → matches Caesar's decisiveness and campaign language ("shipped" = "conquered").
- Independent but willing to fight for a cause, more empathetic than case-oriented, collaborative → the "trusted advisor" energy already in your Cybersecurity SPOC role, better served by Roman command structure (legions, Praetorian Guard) than an Assassin's-Creed secrecy metaphor.

Solo Leveling stays alive as a personal easter egg inside the Anime Zone page — it's authentic to you, just not the frame for an executive-facing portfolio.

---

## Chapter map (replaces "Scene 1–14" nav labels)

**Campaign (career-facing)**
| Old page | New chapter | Motif |
|---|---|---|
| Home | I · The Rise | Founding, origin story |
| About | II · Meditations | Aurelius voice — virtues instead of "mission pillars": Ratio (Architect), Ars (Builder), Custodia (Guardian), Consilium (Strategist) |
| Command Center | III · The Praetorium | Live command tent — real-time systems view |
| Architecture | IV · The Aqueducts | Infrastructure as engineering marvel — pipelines as aqueducts |
| Victories | V · Triumphs | Roman triumph parade of shipped wins |
| Cybersecurity | VI · The Praetorian Guard | Protection, vigilance |
| Resume | VII · Cursus Honorum | The traditional ladder of offices — career record |
| Contact | VIII · The Forum | Public square — where the conversation starts |

**Off Duty (personal, visually separated in nav — fixes the IA problem from the last review)**
Reading Room, Gaming Arena, Anime Zone, Violin Corner, Riding Logs, Gallery — grouped under one "Off Duty" dropdown instead of flat alongside career pages.

---

## Visual system
- Palette: marble white / stone grey / deep imperial purple, gold-laurel and bronze accents, kept on your existing dark base (not a light reskin — imperial-at-night, not daytime tourist-Rome).
- Type: a Roman-inscription-flavored display serif for headers (e.g. Cinzel or similar), keep Inter for body and JetBrains Mono for the technical/code-adjacent bits (skills, stats) you already use.
- Motifs: laurel wreath marks for achievements, column/aqueduct line art for architecture diagrams, marble texture instead of the current sci-fi scan-line/particle field.

## Tech stack additions
- `three`, `@react-three/fiber`, `@react-three/drei` — WebGL journey scene.
- `gsap` + `@gsap/react` (ScrollTrigger) — drives camera position through the scene as the user scrolls, same pattern used in both reference repos you liked.
- Keep `framer-motion` for in-page micro-interactions (it's already doing good work here).
- Pull individual components from React Bits / Skiper UI / 21st.dev opportunistically (text reveals, marquees, timeline blocks) rather than adopting one library wholesale — they're all shadcn/Tailwind-compatible so they'll sit fine next to your existing setup.
- Critical: WebGL scene must have a CSS/Framer-only fallback gated on `prefers-reduced-motion` and a rough device-tier check — this is the biggest performance risk in the whole plan and needs to be built in from day one, not bolted on later.

---

## Phased roadmap
1. **Foundations** — design tokens (Rome palette + type), nav split into Campaign / Off Duty, dependency additions, and bundle in the quick fixes from the earlier review: wire up the real Formspree ID, keyboard-accessible resume bullets, `next/font` migration.
2. **Flagship: Home journey scene** — the React Three Fiber + GSAP ScrollTrigger scroll-journey through the chapter markers. Built and tested here first before touching other pages, since it's the highest-risk piece.
3. **Copy voice pass** — rewrite each Campaign page into the chapter framing (titles, mottos, virtue language) — no visual work, just narrative.
4. **Component polish** — swap in React Bits/Skiper/21st.dev pieces where they save real time.
5. **Accessibility & performance hardening** — reduced-motion fallback verification, contrast audit, Lighthouse pass tied back to the review findings.
6. **QA & deploy** — cross-device test of the WebGL scene specifically (this is where it'll break first), final polish.

---

## Immediate next step
Starting Phase 1 now: design tokens, nav restructure, and the three quick-win fixes (contact form, keyboard accessibility, font loading) — since none of that depends on the WebGL work and it removes the credibility risks flagged in the last review while Phase 2 gets built.
