import { prerenderToNodeStream } from "react-dom/static";
import Root from "./Root";

/**
 * Build-time render of the full page to static HTML. Unlike renderToString,
 * prerender waits for the lazy-loaded sections, so their content is included
 * instead of the skeleton fallbacks.
 */
export async function render(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<Root />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}
