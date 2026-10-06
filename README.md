# Second Ascent website

Upcycled one-of-one flannels from Salt Lake City, Utah. A static site with GSAP motion, built for phones first and hosted on Netlify.

**Before launch, read [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).** The site ships in pre-launch mode (noindex) until `launched` is set to `true` in `site.config.json`.

## Run it

```bash
npm run serve
```

Then open http://localhost:4321. Add `?intro=1` to replay the flannel opening. Node 20+ is required; there are no dependencies to install.

## Edit content (no code needed)

| File | What it controls |
|---|---|
| `site.config.json` | Business name, email, address, Instagram, and the numbers used in the policies (return window, deposit, and so on) |
| `content/pieces.json` | The collection: one entry per piece, in order. `status`: `preview`, `available` or `sold` (sold pieces move to the Archive) |
| `content/events.json` | Markets and pop-ups. Past dates move to "Recent stops" automatically |

Photos go in `assets/img/` as `name-800.webp` and `name-1400.webp`, and are referenced by `name`.

`npm run build` writes `dist/` and prints anything that still needs fixing before launch.

## How it's built

- `build.mjs` renders `src/pages/*.mjs` through `src/layout.mjs` into `dist/` (clean URLs, robots.txt, sitemap once launched).
- `assets/js/boot.js` decides before first paint whether the intro plays in full, short or not at all.
- `assets/js/main.js` handles the intro timeline, the pinned horizontal collection (desktop) or native swipe (mobile and reduced motion), reveals, parallax, dialogs and form submission.
- GSAP 3 and ScrollTrigger are self-hosted under GSAP's standard no-charge license. Fonts are Fraunces, Newsreader and DM Mono (SIL Open Font License, files in `assets/fonts/`).
- Forms use Netlify Forms (`data-netlify`), with a honeypot and no third-party CAPTCHA.
- `netlify.toml` sets a strict Content-Security-Policy: nothing loads from another domain.
- `docs/DESIGN_BLUEPRINT.md` is the design source of truth.

## Deploy

Netlify builds automatically from `main`: build command `node build.mjs`, publish directory `dist`. Both are already set in `netlify.toml`.
