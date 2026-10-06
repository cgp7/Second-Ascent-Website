// Static site build for Second Ascent. Zero dependencies: `node build.mjs` writes dist/.
// Pages live in src/pages/*.mjs and return HTML strings; shared chrome is in src/layout.mjs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout } from './src/layout.mjs';
import { readWebpSize } from './src/lib.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const site = json('site.config.json');
const { pieces, drop } = json('content/pieces.json');
const today = new Date().toISOString().slice(0, 10);
const allEvents = json('content/events.json').events.sort((a, b) => a.date.localeCompare(b.date));
const events = {
  upcoming: allEvents.filter((e) => e.date >= today),
  past: allEvents.filter((e) => e.date < today).reverse().slice(0, 6),
};

// Image manifest: assets/img/<name>-<width>.webp -> { name: { variants: [{w,h,file}] } }
const images = {};
for (const file of readdirSync(join(root, 'assets/img'))) {
  const m = file.match(/^(.+)-(\d+)\.webp$/);
  if (!m) continue;
  const size = readWebpSize(join(root, 'assets/img', file));
  (images[m[1]] ||= { variants: [] }).variants.push({ ...size, file });
}
for (const img of Object.values(images)) img.variants.sort((a, b) => a.w - b.w);

const ctx = { site, pieces, drop, events, images, year: new Date().getFullYear() };

// ---- warnings: things that must be fixed before launch -------------------
const warn = [];
const b = site.business;
if (!b.legalName) warn.push('business.legalName is empty: legal pages fall back to the brand name. Add the registered LLC/entity name.');
if (!b.email) warn.push('business.email is empty: contact falls back to the site form only.');
if (!b.mailingAddress) warn.push('business.mailingAddress is empty: needed if you send marketing email (CAN-SPAM).');
if (!site.launched) warn.push('launched=false: every page ships with noindex and robots.txt blocks crawlers.');
const ph = pieces.filter((p) => p.placeholder);
if (ph.length) warn.push(`${ph.length} piece(s) use placeholder photos and are labelled "Sample listing".`);
for (const p of pieces) if (!images[p.image]) throw new Error(`Missing image "${p.image}" for ${p.id}`);

// ---- render ------------------------------------------------------------------
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });

const pageFiles = readdirSync(join(root, 'src/pages')).filter((f) => f.endsWith('.mjs'));
const sitemap = [];
for (const f of pageFiles) {
  const page = (await import(join(root, 'src/pages', f))).default(ctx);
  const html = layout(page, ctx);
  const target = page.path === '/' ? 'index.html' : page.path === '/404' ? '404.html' : join(page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(join(out, target)), { recursive: true });
  writeFileSync(join(out, target), html);
  if (page.path !== '/404' && !page.noindex) sitemap.push(page.path);
}

writeFileSync(join(out, 'robots.txt'), site.launched
  ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n');
if (site.launched) {
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.sort().map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
}

console.log(`Built ${pageFiles.length} pages into dist/`);
if (warn.length) console.warn('\nBefore launch:\n' + warn.map((w) => '  - ' + w).join('\n'));
if (!existsSync(join(out, '404.html'))) throw new Error('404 page missing');
