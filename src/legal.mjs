import { esc, fbtn, fmtDate } from './lib.mjs';

// Shared shell for policy pages: title, effective date, table of contents, numbered sections.
export function legalPage(ctx, { path, title, description, intro, sections }) {
  const eff = ctx.site.owner_must_confirm.policiesEffectiveDate;
  return {
    path, title, description, theme: 'light', bodyClass: 'is-legal',
    main: `
<section class="page-hero page-hero--legal wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Policies</p>
  <h1 class="display page-hero__title page-hero__title--sm" tabindex="-1">${esc(title)}</h1>
  <p class="mono legal__date">Effective ${fmtDate(eff)} · Last updated ${fmtDate(eff)}</p>
</section>
<div class="wrap legal" data-theme="light">
  <nav class="legal__toc" aria-labelledby="toc-title">
    <h2 class="label" id="toc-title">On this page</h2>
    <ol class="blist">${sections.map(([id, h]) => `<li>${fbtn('sm')}<a href="#${id}">${esc(h)}</a></li>`).join('')}</ol>
  </nav>
  <div class="legal__body prose">
    <p class="lede">${intro}</p>
    ${sections.map(([id, h, body], i) => `<section id="${id}" aria-labelledby="${id}-h"><h2 id="${id}-h"><span class="mono legal__n">${String(i + 1).padStart(2, '0')}</span> ${esc(h)}</h2>${body}</section>`).join('\n')}
  </div>
</div>
`,
  };
}
