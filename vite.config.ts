import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Future personal domain (placeholder until bought). The only place to change
// it: the CNAME, canonical/OG tags, sitemap, JSON-LD and llms.txt follow.
const CUSTOM_DOMAIN = "shreyanshkabra.com";

// `npm run build` / `deploy` -> GitHub Pages at kabrashrey.github.io/shreyansh_kabra/
// `npm run build:domain` / `deploy:domain` -> https://CUSTOM_DOMAIN/ (root base)
const useCustomDomain = process.env.VITE_CUSTOM_DOMAIN === "true";
const base = useCustomDomain ? "/" : "/shreyansh_kabra/";

// Absolute URL of the deployed site; used for canonical/OG tags, the
// sitemap, JSON-LD and llms.txt so they always match where the site lives.
const siteUrl = useCustomDomain
  ? `https://${CUSTOM_DOMAIN}/`
  : "https://kabrashrey.github.io/shreyansh_kabra/";

const PRELOAD_FONTS = [
  /instrument-serif-latin-400-normal-.*\.woff2$/,
  /inter-tight-latin-400-normal-.*\.woff2$/,
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", siteUrl),
    },
    {
      // Preload the fonts used above the fold (hero name + body text) so
      // they arrive with the CSS instead of after it. Filenames are hashed,
      // so they're looked up in the final bundle.
      name: "preload-hero-fonts",
      transformIndexHtml: {
        order: "post",
        handler: (_html, ctx) =>
          Object.keys(ctx.bundle ?? {})
            .filter((file) => PRELOAD_FONTS.some((re) => re.test(file)))
            .map((file) => ({
              tag: "link",
              attrs: {
                rel: "preload",
                as: "font",
                type: "font/woff2",
                href: `${base}${file}`,
                crossorigin: "",
              },
              injectTo: "head" as const,
            })),
      },
    },
  ],
  base,
  define: {
    __SITE_URL__: JSON.stringify(siteUrl),
  },
});
