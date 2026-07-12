# Shreyansh Kabra — Portfolio

Personal portfolio site for Shreyansh Kabra — Software Engineer (Backend · Cloud · AI/ML), M.S. Computer Science @ USC.

🔗 **Live:** [shreyanshkabra.com](https://shreyanshkabra.com)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (build tooling & dev server)
- **SCSS** with CSS custom properties for theming (light/dark)
- **react-icons** for iconography
- Deployed to **GitHub Pages** via `gh-pages`

## Features

- Light / dark theme with system-preference detection
- Responsive, accessible layout with reduced-motion support
- Scroll-spy navigation, scroll progress bar, and animated section reveals
- Interactive dot-grid hero, ambient gradient-mesh background, spotlight cards
- Lazy-loaded sections with loading skeletons
- Full SEO + Open Graph / Twitter social preview

## Getting Started

> Requires **Node.js 20.19+** (Vite 7). This repo is developed on Node 24.

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
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

## Project Structure

```
src/
├── App.tsx              # root layout + section composition
├── components/          # hero, about, experiences, projects,
│                        # technical, education, communication,
│                        # navbar, footer, ambient, scrollProgress, skeleton
├── context/             # theme context + provider
├── hooks/               # useScrollAnimation, useSpotlight
└── assets/              # images, resume, logos
```

## License

MIT © 2026 Shreyansh Kabra
