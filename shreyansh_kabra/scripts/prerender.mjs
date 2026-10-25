// Injects the prerendered app HTML into dist/index.html so crawlers that
// don't run JavaScript see the full page content, then generates the
// machine-readable files (JSON-LD, llms.txt, resume.md, sitemap, robots)
// from the same profile data. Runs after both builds.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const indexPath = `${dist}/index.html`;
const ssrDir = `${root}dist-ssr`;

const { render, profile, siteUrl } = await import(
  `${ssrDir}/entry-server.js`
);
const appHtml = await render();

const abs = (path) => new URL(path, siteUrl).href;
const email = profile.email;
const socialUrl = (name) =>
  profile.socials.find((s) => s.name === name)?.url ?? "";

// ── JSON-LD Person schema ─────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  description: profile.tagline,
  url: siteUrl,
  image: abs(profile.photo),
  email: `mailto:${email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: profile.socials
    .filter((s) => s.url.startsWith("http"))
    .map((s) => s.url),
  alumniOf: profile.education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.college,
    url: e.website,
  })),
  knowsAbout: profile.skills.flatMap((c) => c.skills),
};
// Escape "<" so content can never close the script tag early
const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(
  jsonLd
).replace(/</g, "\\u003c")}</script>`;

// ── Full profile as Markdown (resume.md + llms-full.txt) ──────────────
const resumeMd = [
  `# ${profile.name}`,
  "",
  `> ${profile.tagline}`,
  "",
  `${profile.headline} · ${profile.location} · ${email}`,
  "",
  profile.socials
    .filter((s) => s.url.startsWith("http"))
    .map((s) => `- ${s.name}: ${s.url}`)
    .join("\n"),
  "",
  "## About",
  "",
  profile.about.join("\n\n"),
  "",
  "## Experience",
  "",
  ...profile.experiences.flatMap((e) => [
    `### ${e.role} — ${e.company}`,
    "",
    `${e.duration}`,
    "",
    ...e.highlights.map((h) => `- ${h}`),
    "",
    `Tech: ${e.techStack.join(", ")}`,
    "",
  ]),
  "## Projects",
  "",
  ...profile.projects.flatMap((p) => [
    `### [${p.title}](${p.github})`,
    "",
    p.description,
    "",
    `Tech: ${p.techStack.join(", ")}`,
    "",
  ]),
  "## Skills",
  "",
  ...profile.skills.map((c) => `- ${c.category}: ${c.skills.join(", ")}`),
  "",
  "## Education",
  "",
  ...profile.education.flatMap((e) => [
    `### ${e.degree} — ${e.college}`,
    "",
    e.years,
    "",
    `Key courses: ${e.coursework}`,
    "",
  ]),
].join("\n");

// ── llms.txt index (https://llmstxt.org) ──────────────────────────────
const llmsTxt = [
  `# ${profile.name}`,
  "",
  `> ${profile.headline} based in ${profile.location}. ${profile.tagline}`,
  "",
  "This site is a single-page portfolio rendered with React. The files below contain the same content as plain Markdown.",
  "",
  "## Profile",
  "",
  `- [Full profile](${abs("llms-full.txt")}): about, experience, projects, skills and education in one file`,
  `- [Résumé (Markdown)](${abs("resume.md")}): same content, résumé layout`,
  `- [GitHub](${socialUrl("GitHub")}): source code and repositories`,
  `- [LinkedIn](${socialUrl("LinkedIn")}): professional profile`,
  `- Contact: ${email}`,
  "",
  "## Projects",
  "",
  ...profile.projects.map((p) => `- [${p.title}](${p.github}): ${p.description}`),
  "",
  "## Optional",
  "",
  `- [Website source](${profile.repo}): code for this portfolio`,
  "",
].join("\n");

// ── Sitemap and robots ────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
const robots = `User-agent: *
Allow: /

Sitemap: ${abs("sitemap.xml")}
`;

// ── Write everything ──────────────────────────────────────────────────
const template = await readFile(indexPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: "${placeholder}" not found in dist/index.html`);
}

await writeFile(
  indexPath,
  template
    .replace("</head>", `    ${jsonLdTag}\n  </head>`)
    .replace(placeholder, `<div id="root">${appHtml}</div>`)
);
await Promise.all([
  writeFile(`${dist}/llms.txt`, llmsTxt),
  writeFile(`${dist}/llms-full.txt`, resumeMd),
  writeFile(`${dist}/resume.md`, resumeMd),
  writeFile(`${dist}/sitemap.xml`, sitemap),
  writeFile(`${dist}/robots.txt`, robots),
]);
await rm(ssrDir, { recursive: true, force: true });

console.log(
  `prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML; wrote JSON-LD, llms.txt, llms-full.txt, resume.md, sitemap.xml, robots.txt`
);
