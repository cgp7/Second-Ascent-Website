import { esc, img, fbtn } from '../lib.mjs';

export default function (ctx) {
  const sold = ctx.pieces.filter((p) => p.status === 'sold');
  const grid = sold.map((p, i) => `
    <li class="archive-item" data-reveal>
      <figure>${img(ctx, p.image, { alt: p.alt, sizes: '(min-width: 900px) 30vw, 80vw' })}</figure>
      <p class="label">${esc(p.name)}${p.year ? ` · ${esc(p.year)}` : ''} · Found a new home</p>
      <a class="text-link mono" href="/commissions/">Commission something like this<span class="sr-only">: ${esc(p.name)}</span></a>
    </li>`).join('');
  return {
    path: '/archive/',
    title: 'Archive',
    description: 'The archive of Second Ascent pieces that have found a new home.',
    theme: 'light',
    main: `
<section class="page-hero wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Archive</p>
  <h1 class="display page-hero__title" tabindex="-1" data-split>Found a new home.</h1>
  <p class="lede page-hero__lede">Every piece is one of one. When it sells, it lives here.</p>
</section>
<section class="wrap archive" data-theme="light" aria-label="Archived pieces">
  ${sold.length
    ? `<ul class="archive-grid">${grid}</ul>`
    : `<div class="empty" data-reveal><p class="lede">The archive starts with the first piece that finds a home.</p><p>Until then, everything made so far is still in the <a href="/#collection">collection</a>.</p></div>`}
</section>
`,
  };
}
