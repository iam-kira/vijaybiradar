# vijaybiradar

Personal site for Vijay Biradar — Data & AI. One static HTML file, no build step.

**Live:** GitHub Pages, deployed from `main` / `monochrome` on push.

---

## Run it

Any static server will do. There is nothing to install.

```bash
npx serve . -l 5173
```

Then open `http://localhost:5173`.

> Opening `index.html` directly via `file://` mostly works, but the signature
> intro falls back to a fade instead of the particle morph — `getImageData`
> taints the canvas on `file://`, so the pixels can't be sampled. Use a server
> to see it properly.

---

## Deploy

`.github/workflows/deploy.yml` copies `index.html` + `assets/` into `_site/`,
adds `.nojekyll`, and publishes to Pages. No Node, no install, no bundler.

Enable it once under **Settings → Pages → Source → GitHub Actions**.

---

## Structure

```
index.html                 the entire site — markup, styles, scripts
assets/
  img/
    model.jpg              hero portrait (3:4)
    train.jpg              Karlsruhe platform photo (3:4 after EXIF rotation)
    signature.jpg          handwritten signature, dark ink on paper
  audio/background/*.mp3   ambient track
.github/workflows/         Pages deploy
reference/                 unrelated projects kept for research — gitignored
```

### Dependencies

Loaded from CDN at runtime. There is no `package.json` — `npm i` and
`npx shadcn add` have nothing to install into.

| Library | Delivery |
|---|---|
| GSAP + ScrollTrigger | `<script src>` (cdnjs) |
| three.js 0.160 | ESM importmap → unpkg |
| anime.js 4.5.0 | ESM importmap → jsDelivr *(mapped, currently unused)* |
| Fonts | Google Fonts — Space Grotesk, IBM Plex Mono, Outfit, Jost, Mrs Saint Delafield |

---

## How the page is put together

Fixed layers, back to front:

| Element | Role |
|---|---|
| `#ambient-canvas` | three.js particle field |
| `#fluid` | GPU fluid trail, `mix-blend-mode: difference` |
| `#cursor` | precision dot |
| `#preloader` | z-999, VENI VIDI VICI in 3D |
| `#sig-intro` | z-998, signature particle morph |
| `#chrome` / `#torch-dock` / `#music-dock` | brand, theme torch, audio toggle |

Sections in order: hero → Manifesto → About → Experience → Skills → Projects →
Hall of Fame → Education → Beyond → Contact.

### Load sequence

`preloader` (counter + 3D type) → curtain lifts to reveal `sig-intro` already
mid-animation → signature dissolves → hero reveals → music fades in.

The signature stage is unhidden **before** the curtain lifts, so the wipe
uncovers the signature rather than the page. Starting it afterwards makes the
site flash into view and then get covered again.

Scroll unlock never depends on the animation finishing — `unlock()`/`finish()`
are idempotent and also run from a 12-second timer. rAF is paused in background
tabs, and a stalled intro would otherwise leave a page that cannot scroll.

---

## Editing content

### Architecture diagrams

Data, not markup. Add a key to `DIAGRAMS` and a slot in the HTML — no drawing
code:

```js
myproject: {
  top: 'OPTIONAL BANNER ABOVE',
  bottom: 'OPTIONAL BANNER BELOW',
  nodes: [
    {t:'STAGE', s:'SUBTITLE', d:'Sentence shown when this node is selected.'}
  ]
}
```

```html
<div class="arch-wrap" data-arch="myproject"></div>
```

`renderDiagram()` derives box widths, arrow geometry and canvas height from the
node count. Nodes are hoverable, clickable and keyboard-focusable.

Existing keys: `vortex` `selfheal` `observability` `wcm` `sap` `security`
`pcos` `plant`.

### Projects, hobbies, awards

Plain markup — `.card` inside `.card-stack`, `.hobby` inside `.hobby-grid`,
`.award` inside `.award-grid`. Card indices (`01 / 08`) are hand-written; update
them when adding a card.

---

## Theming

Resolved **before first paint** by an inline `<head>` script, so there is no
flash of the wrong theme:

1. `localStorage.theme` if the visitor has chosen
2. otherwise `prefers-color-scheme`

Written as an explicit `data-theme="light|dark"` on `<html>` so every themed
selector keys off the attribute alone. The torch sets it explicitly and
persists the choice; until then the page follows OS changes live.

Colours are CSS custom properties on `:root` / `html[data-theme="light"]`. The
flame palette (`--flame-*`) is deliberately **not** overridden per theme — fire
reads as fire on either ground.

---

## Assets are optional

Every media asset degrades rather than breaking the layout:

| Missing | Behaviour |
|---|---|
| `img/model.jpg` | hero collapses to one column via `:has(.hero-portrait)` |
| `img/train.jpg` | figure removes itself, caption and all |
| `img/signature.jpg` | intro morphs a script-font placeholder instead |
| audio track | music toggle greys out, disabled, with a tooltip |

Photos are desaturated in CSS (`grayscale(1) contrast(1.06)`) — originals stay
full colour on disk, and reverting is one line.

---

## Things worth knowing before changing them

**Ink detection uses Otsu's method, not a fixed threshold.** The signature is
photographed in dim light: its "white" paper sits around luminance 135. A
constant cutoff swallows the whole image and the intro morphs into a solid
rectangle. Otsu derives the split per image, so any signature works untuned.

**`overflow-x: clip` on `body`, never `hidden`.** `hidden` promotes the body to
a scroll container and silently kills `position: sticky` on the stacked project
cards.

**`train.jpg` carries an EXIF rotation flag.** Its header reads 2000×1500 but
browsers render it upright at 1500×2000. Crop it as a portrait.

**The fluid canvas sizes itself from three places** — init, `ResizeObserver`,
and `mousemove`. A renderer that comes up while the viewport reports 0 leaves
every framebuffer incomplete permanently if size is only set once.

**Uniforms must be declared in every shader stage that uses them.** `texelSize`
declared only in the vertex stage silently fails to compile the fragment
shader, and the whole simulation dies with `useProgram: program not valid`.

**Architecture diagrams need unique SVG marker ids.** Shared ids break the
arrowheads on every diagram after the first.

---

## Accessibility

- Diagram nodes are `tabindex="0"` with `role="button"` and Enter/Space
- Contact icons carry `aria-label`; the Discord handle is `sr-only` text
- Fluid trail, custom cursor, flame, smoke and scroll cue all respect
  `prefers-reduced-motion`
- Fluid and cursor disable entirely on touch (`hover: none`)
- `color-scheme` is set per theme so native controls follow

---

## Known issues

- **The ambient track is ~16 MB, and it autoplays** once the intro finishes.
  The size is length, not quality: it is already 96 kbps mono, so re-encoding
  at the same bitrate saves nothing. It is 22.8 minutes long. Servers hand it
  over in ranges (`206 Partial Content`) and the element is `preload="metadata"`,
  so a visitor downloads roughly what they listen to rather than all 16 MB —
  but a 30-second visit still starts an unrequested download and unrequested
  sound. If that matters, trim the loop rather than re-encode it:
  ```bash
  ffmpeg -i ambient.mp3 -t 240 -c copy ambient-trimmed.mp3   # 4 min, ~2.7 MB
  ```
- Browsers block audible autoplay until the visitor interacts. A one-shot
  listener on `pointerdown/keydown/wheel/touchstart` starts the track on the
  first gesture when autoplay is refused.
- `anime.js` is mapped in the importmap but unused; GSAP does everything.
  Remove the mapping or use it.

## Licence

[MIT](LICENSE) — do what you like with the code.

The licence covers the code. It does not cover the personal content it renders:
the name, the photographs, the handwritten signature in `assets/img/`, the CV
text, or the Julius Caesar/Marvel-adjacent references. Fork the machinery, not
the identity.
