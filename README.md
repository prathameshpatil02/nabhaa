# NABHAA Website

Official static website for **NABHAA** — Architecture · Interiors · Spatial Design.

Brand assets sourced from `NABHAA_COMPLETE_BRAND_ASSET_PACKAGE`.

## Stack

Vite · TypeScript · HTML · CSS · GSAP · Lenis

## Quick start

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## GitHub Pages

This repo deploys automatically via GitHub Actions to:

`https://prathameshpatil02.github.io/nabhaa/`

Vite `base` is set to `/nabhaa/`. After push to `main`, open **Settings → Pages** and confirm source is **GitHub Actions**.

## Brand assets used

| Asset | Path |
| --- | --- |
| Transparent butterfly (UI) | `public/assets/logo/nabhaa-butterfly.png` |
| SVG master | `public/assets/logo/nabhaa-butterfly.svg` |
| White / maroon mono | `nabhaa-butterfly-white.png` / `nabhaa-butterfly-maroon.png` |
| Lockups | `public/assets/logo/nabhaa-lockup-*.png` |
| Favicon | `public/favicon.ico` |
| OG / social | `public/assets/brand/og-ivory.png` |
| Colour master | `public/assets/brand/color-master.png` |

## Typography

From brand `FONT_RECORD.txt` exploration:

- Display: **Noto Serif** (modern literary serif candidate)
- UI / body: **Manrope** (precise modern sans)

Verify commercial font licensing before final adoption.

## Colour system

Exact brand package values:

- Deep Maroon `#680F1A`
- Rose Brown `#8A3F3A`
- Warm Ivory `#EFE9DE`
- Stone `#D9C6B3`
- Sand `#B7A993`
- Charcoal `#2A2724`
- Muted Brass `#B18A52`

## Content replacement

| What | Where |
| --- | --- |
| Logo paths | `src/data/site.ts` |
| Contact / identity | `src/data/site.ts` |
| Projects + image URLs | `src/data/projects.ts` |
| Local project images | `public/assets/images/projects/` |
| Studio | `src/data/studio.ts` |
| Services | `src/data/services.ts` |
| Journal | `src/data/journal.ts` |
| Hero image | `src/pages/home.ts` |
| Contact form endpoint | `src/pages/contact.ts` |

## Routes

- `/`
- `/projects`
- `/projects/:slug` (e.g. `/projects/courtyard-residence`)
- `/studio`
- `/services`
- `/journal`
- `/journal/:slug`
- `/contact`
