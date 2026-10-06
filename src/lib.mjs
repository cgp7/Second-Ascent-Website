import { readFileSync } from 'node:fs';

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Reads width/height from a WebP header (VP8, VP8L and VP8X).
export function readWebpSize(path) {
  const b = readFileSync(path);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  throw new Error('Unknown WebP format: ' + path);
}

// Responsive <img>. `sizes` describes the rendered width; alt is required (pass '' for decorative).
export function img(ctx, name, { alt, sizes = '100vw', cls = '', eager = false, focus = '' } = {}) {
  const set = ctx.images[name];
  if (!set) throw new Error('Unknown image ' + name);
  if (alt === undefined) throw new Error('alt text required for ' + name);
  const largest = set.variants[set.variants.length - 1];
  const srcset = set.variants.map((v) => `/assets/img/${v.file} ${v.w}w`).join(', ');
  const fallback = set.variants.find((v) => v.w >= 800) || largest;
  const pos = focus ? ` data-focus="${esc(focus)}"` : '';
  return `<img class="${cls}" src="/assets/img/${fallback.file}" srcset="${srcset}" sizes="${sizes}" width="${largest.w}" height="${largest.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${pos}>`;
}

// The flannel button motif. Decorative unless a label is given.
let n = 0;
export function fbtn(size = 'sm', extra = '') {
  n = (n + 1) % 4;
  return `<svg class="fbtn fbtn--${size} r${n} ${extra}" aria-hidden="true" focusable="false"><use href="#fbtn"></use></svg>`;
}

export const sprite = `<svg width="0" height="0" class="sr-only" aria-hidden="true" focusable="false"><defs>
<radialGradient id="fbtn-face" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#f4f2ee"/><stop offset=".65" stop-color="#dbdedc"/><stop offset="1" stop-color="#b9b6ae"/></radialGradient>
<symbol id="fbtn" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18.5" fill="url(#fbtn-face)"/><circle cx="20" cy="20" r="14.2" fill="none" stroke="#a9a59c" stroke-width="1.1" opacity=".7"/><g fill="#3a3530"><circle cx="15.6" cy="15.6" r="2.3"/><circle cx="24.4" cy="15.6" r="2.3"/><circle cx="15.6" cy="24.4" r="2.3"/><circle cx="24.4" cy="24.4" r="2.3"/></g><path d="M15.6 15.6 24.4 24.4M24.4 15.6 15.6 24.4" stroke="#9b2b36" stroke-width="1.6" stroke-linecap="round"/></symbol>
</defs></svg>`;

export const money = (n) => n == null ? '' : '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0 });

// Business identity helpers so pages never print an empty field.
export const legalName = (site) => site.business.legalName || site.business.brandName;
export const contactLine = (site) => site.business.email
  ? `email <a href="mailto:${esc(site.business.email)}">${esc(site.business.email)}</a> or use the <a href="/contact/">contact form</a>`
  : 'use the <a href="/contact/">contact form</a>';
export const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
