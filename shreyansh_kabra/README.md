# Shreyansh Kabra — Portfolio

[![CI](https://github.com/kabrashrey/shreyansh_kabra/actions/workflows/ci.yml/badge.svg)](https://github.com/kabrashrey/shreyansh_kabra/actions/workflows/ci.yml)
![Lighthouse](https://img.shields.io/badge/Lighthouse-a11y%20100%20·%20SEO%20100%20·%20BP%20100-e5482d)

Personal portfolio site for Shreyansh Kabra — Software Engineer (Backend · Cloud · AI/ML), M.S. Computer Science @ USC.

🔗 **Live:** [kabrashrey.github.io/shreyansh_kabra](https://kabrashrey.github.io/shreyansh_kabra/)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (build tooling & dev server)
- **SCSS** with CSS custom properties for theming (light/dark) — "Editorial Lab"
  theme: Instrument Serif, Inter Tight, IBM Plex Mono (self-hosted via
  Fontsource), vermilion accent
- **react-icons** for iconography
- Deployed to **GitHub Pages** via `gh-pages`

## Features

- Light / dark theme with system-preference detection
- Responsive, accessible layout with reduced-motion support
- Scroll-spy navigation, scroll progress bar, and animated section reveals
- Interactive dot-grid hero, paper-grain background, spotlight cards
- ⌘K command palette with project search, recently viewed projects, and a
  built-in terminal (type `>`: `help`, `whoami`, `ls projects`, `open resume`…)
- Keyboard shortcuts: `g` + section key, `t` theme, `/` palette, `?` help
- Circular-reveal theme switch (View Transitions API), click-to-copy email
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
npm test         # smoke-test the build output (run after build)
npm run images   # regenerate og-image.png + PNG favicons from SVG
```

CI (GitHub Actions) runs lint, build and tests on every push and PR, plus a
Lighthouse budget (accessibility, best practices and SEO ≥ 95; performance
warns below 90). Lighthouse HTML reports are attached to each workflow run.

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
scripts/generate-images.mjs  # og-image + PNG favicons (npm run images)
scripts/dist.test.mjs    # build-output smoke tests (npm test)
public/favicon.svg       # "SK." mark (adapts to light/dark)
```

## License

MIT © 2026 Shreyansh Kabra
