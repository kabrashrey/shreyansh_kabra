// Smoke tests for the production build (run after `npm run build`):
// prerendered content, SEO tags, JSON-LD and the generated text files.
// Uses Node's built-in test runner — no extra dependencies.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const read = (file) => readFile(`${dist}${file}`, "utf8");
const html = await read("index.html");

const attr = (pattern) => html.match(pattern)?.[1];
const canonical = attr(/<link rel="canonical" href="([^"]+)"/);

test("every section is prerendered into the HTML", () => {
  for (const id of [
    "home",
    "about",
    "experiences",
    "projects",
    "technical",
    "education",
    "contact",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing section #${id}`);
  }
  assert.doesNotMatch(html, /section-skeleton/, "skeleton fallback leaked");
});

test("no unreplaced build placeholders", () => {
  assert.doesNotMatch(html, /%SITE_URL%/);
});

test("canonical, OG and Twitter URLs point at the same site", () => {
  assert.ok(canonical?.startsWith("https://"), "canonical must be absolute");
  assert.equal(attr(/property="og:url" content="([^"]+)"/), canonical);
  for (const tag of [
    /property="og:image"\s+content="([^"]+)"/,
    /name="twitter:image"\s+content="([^"]+)"/,
  ]) {
    assert.equal(attr(tag), `${canonical}og-image.png`);
  }
});

test("referenced brand images exist in the build", async () => {
  for (const file of [
    "og-image.png",
    "favicon.svg",
    "favicon-32x32.png",
    "favicon-16x16.png",
    "apple-touch-icon.png",
  ]) {
    await access(`${dist}${file}`);
  }
});

test("JSON-LD is valid and describes the person", () => {
  const raw = attr(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(raw, "JSON-LD script missing");
  const data = JSON.parse(raw);
  assert.equal(data["@type"], "Person");
  assert.ok(data.name);
  assert.equal(data.url, canonical);
  assert.ok(data.sameAs.every((u) => u.startsWith("https://")));
});

test("llms.txt follows the llmstxt.org shape and links resolve to this site", async () => {
  const llms = await read("llms.txt");
  assert.match(llms, /^# .+\n\n> .+/, "needs H1 then a blockquote summary");
  assert.ok(llms.includes(`${canonical}llms-full.txt`));
  assert.ok(llms.includes(`${canonical}resume.md`));
  const full = await read("llms-full.txt");
  assert.match(full, /## Experience/);
  assert.match(full, /## Projects/);
  assert.equal(full, await read("resume.md"));
});

test("sitemap and robots point at the canonical URL", async () => {
  assert.ok((await read("sitemap.xml")).includes(`<loc>${canonical}</loc>`));
  assert.ok(
    (await read("robots.txt")).includes(`Sitemap: ${canonical}sitemap.xml`)
  );
});
