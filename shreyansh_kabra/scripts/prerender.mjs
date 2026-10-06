// Injects the prerendered app HTML into dist/index.html so crawlers that
// don't run JavaScript see the full page content. Runs after both builds.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const indexPath = `${root}dist/index.html`;
const ssrDir = `${root}dist-ssr`;

const { render } = await import(`${ssrDir}/entry-server.js`);
const appHtml = await render();

const template = await readFile(indexPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: "${placeholder}" not found in dist/index.html`);
}

await writeFile(
  indexPath,
  template.replace(placeholder, `<div id="root">${appHtml}</div>`)
);
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML`);
