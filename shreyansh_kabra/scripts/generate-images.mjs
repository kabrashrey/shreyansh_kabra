// Generates the raster brand images in public/ from SVG sources:
//   og-image.png (1200×630 social preview), favicon-16x16.png,
//   favicon-32x32.png, apple-touch-icon.png (from public/favicon.svg).
// Run manually after changing the brand: `npm run images`. Fonts are
// downloaded once from the Google Fonts repo into node_modules/.cache.
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = `${root}public`;
const cacheDir = `${root}node_modules/.cache/brand-fonts`;

const FONTS = {
  "InstrumentSerif-Regular.ttf":
    "https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
  "IBMPlexMono-Regular.ttf":
    "https://github.com/google/fonts/raw/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf",
};

const fontFiles = [];
await mkdir(cacheDir, { recursive: true });
for (const [name, url] of Object.entries(FONTS)) {
  const path = `${cacheDir}/${name}`;
  try {
    await access(path);
  } catch {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`images: failed to download ${url}`);
    await writeFile(path, Buffer.from(await res.arrayBuffer()));
  }
  fontFiles.push(path);
}

const render = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontFiles, loadSystemFonts: false },
  })
    .render()
    .asPng();

// ── Social preview (Editorial Lab: paper, ink, vermilion) ─────────────
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f1ea"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#d9d2c5" stroke-width="2"/>
  <text x="96" y="148" font-family="Instrument Serif" font-size="64" fill="#1a1a1a">SK<tspan fill="#e5482d">.</tspan></text>
  <text x="1104" y="138" text-anchor="end" font-family="IBM Plex Mono" font-size="22" fill="#6b6560">kabrashrey.github.io/shreyansh_kabra</text>
  <text x="96" y="368" font-family="Instrument Serif" font-size="148" letter-spacing="-2" fill="#1a1a1a">Shreyansh Kabra<tspan fill="#e5482d">.</tspan></text>
  <rect x="100" y="408" width="72" height="3" fill="#e5482d"/>
  <text x="96" y="470" font-family="IBM Plex Mono" font-size="30" fill="#1a1a1a">Software Engineer — backend · cloud · AI/ML</text>
  <text x="96" y="530" font-family="IBM Plex Mono" font-size="24" fill="#6b6560">M.S. Computer Science @ USC  ·  ex-AWS  ·  ex-HPE</text>
</svg>`;
await writeFile(`${publicDir}/og-image.png`, render(og, 1200));

// ── PNG favicons from the SVG mark (light variant; PNGs can't adapt) ──
const favicon = await readFile(`${publicDir}/favicon.svg`, "utf8");
const lightFavicon = favicon.replace(/@media[^{]*\{[\s\S]*?\}\s*\}/, "");
for (const [file, size] of [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
]) {
  await writeFile(`${publicDir}/${file}`, render(lightFavicon, size));
}

console.log(
  "images: wrote og-image.png, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png"
);
