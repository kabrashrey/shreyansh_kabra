# Shreyansh Kabra — Portfolio

Personal portfolio site for Shreyansh Kabra — Software Engineer (Backend · Cloud · AI/ML), M.S. Computer Science @ USC.

🔗 **Live:** [kabrashrey.github.io/shreyansh_kabra](https://kabrashrey.github.io/shreyansh_kabra/)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (build tooling & dev server)
- **SCSS** with CSS custom properties for theming (light/dark) — "Editorial Lab"
  theme: Instrument Serif, Inter Tight, IBM Plex Mono, vermilion accent
- **react-icons** for iconography
- Deployed to **GitHub Pages** via `gh-pages`

## Features

- Light / dark theme with system-preference detection
- Responsive, accessible layout with reduced-motion support
- Scroll-spy navigation, scroll progress bar, and animated section reveals
- Interactive dot-grid hero, paper-grain background, spotlight cards
- ⌘K command palette
- Lazy-loaded sections with loading skeletons
- Prerendered HTML, SEO + Open Graph / Twitter social preview
- Machine-readable profile generated at build time: JSON-LD `Person` schema,
  [`llms.txt`](https://llmstxt.org), `llms-full.txt`, `resume.md`, sitemap and robots

## Getting Started

> Requires **Node.js 20.19+ or 22.12+** (Vite 7; see `engines` in `package.json`).
> This repo is developed on Node 24.

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check, build, prerender, generate llms.txt/JSON-LD
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Deployment

**GitHub Pages (project subpath):**

```bash
npm run deploy
```

**Custom domain (shreyanshkabra.com):**

```bash
npm run deploy:domain
```

Then in the GitHub repository: **Settings → Pages → Custom domain** → enter the
domain → enable **Enforce HTTPS**.

## Editing content

All site content (about, experience, projects, skills, education, socials)
lives in **`src/data/profile.ts`**. Components only handle presentation, and
`scripts/prerender.mjs` generates `llms.txt`, `resume.md` and the JSON-LD from
the same data, so one edit updates everything.

## Project Structure

```
src/
├── App.tsx              # root layout + section composition
├── data/profile.ts      # single source of truth for all content
├── components/          # hero, about, experiences, projects,
│                        # technical, education, communication,
│                        # navbar, footer, ambient, scrollProgress, skeleton
├── context/             # theme context + provider
├── hooks/               # useScrollAnimation, useSpotlight
└── assets/              # images, resume, logos
scripts/prerender.mjs    # prerender + llms.txt, resume.md, JSON-LD, sitemap
public/favicon.svg       # "SK." mark (adapts to light/dark)
```

## License

MIT © 2026 Shreyansh Kabra
