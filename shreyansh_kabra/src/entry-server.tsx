import { prerenderToNodeStream } from "react-dom/static";
import Root from "./Root";

// Consumed by scripts/prerender.mjs to generate llms.txt, resume.md, JSON-LD
export { profile } from "./data/profile";
export const siteUrl = __SITE_URL__;

/**
 * Build-time render of the full page to static HTML. Unlike renderToString,
 * prerender waits for the lazy-loaded sections, so their content is included
 * instead of the skeleton fallbacks.
 */
export async function render(): Promise<string> {
  // Never outline Suspense boundaries: React otherwise emits large sections
  // as skeleton fallbacks plus hidden content swapped in by inline script,
  // which hides real content from crawlers and flashes skeletons on load.
  const { prelude } = await prerenderToNodeStream(<Root />, {
    progressiveChunkSize: Number.POSITIVE_INFINITY,
  });
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}
