import { esc, img, fbtn, fmtDate } from '../lib.mjs';

export default function (ctx) {
  const { upcoming, past } = ctx.events;
  const mapLink = (e) => e.address
    ? `<a class="text-link mono" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(e.address)}" rel="noopener" target="_blank">Map<span class="sr-only"> for ${esc(e.name)} (opens in a new tab)</span></a>`
    : '';
  const row = (e) => `
    <li class="events__row">
      <span class="mono tnum">${fmtDate(e.date)}${e.time ? ` · ${esc(e.time)}` : ''}</span>
      <span class="events__name">${esc(e.name)}</span>
      <span class="mono">${esc(e.city)}</span>
      <span class="mono events__status events__status--${e.status}">${e.status === 'confirmed' ? 'Confirmed' : 'Tentative'}</span>
      ${mapLink(e)}
    </li>`;
  return {
    path: '/find-us/',
    title: 'Where to find us',
    description: 'Upcoming markets and pop-ups where you can find Second Ascent flannels in person.',
    theme: 'light',
    main: `
<section class="page-hero wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Where to find us next</p>
  <h1 class="display page-hero__title" tabindex="-1" data-split>Look for the trailer and the hand-painted sign.</h1>
</section>

<section class="wrap" data-theme="light" aria-labelledby="upcoming-title">
  <h2 class="label" id="upcoming-title">Upcoming</h2>
  ${upcoming.length
    ? `<ol class="events events--full">${upcoming.map(row).join('')}</ol>`
    : `<div class="empty" data-reveal><p class="lede">The next markets are being booked.</p><p>Dates go up here once they are confirmed. Sign up at the bottom of the page and you'll get one email when they do.</p></div>`}
  ${past.length ? `<h2 class="label events__past-title">Recent stops</h2><ol class="events events--past">${past.map(row).join('')}</ol>` : ''}
</section>

<figure class="wide-figure" data-reveal>
  ${img(ctx, 'booth', { alt: 'The Second Ascent market booth: a silver trailer, a rack of flannel shirts, a striped umbrella and a hand-painted sign.', sizes: '100vw' })}
</figure>

<section class="wrap cta-band" data-theme="light">
  <h2 class="display cta-band__title">Can't make it in person?</h2>
  <p>Pieces can be asked about and claimed online between markets.</p>
  <div class="btn-row"><a class="btn btn--solid" href="/#collection">${fbtn('sm')}<span>See the collection</span></a></div>
</section>
`,
  };
}
