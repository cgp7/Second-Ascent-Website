import { esc, img, fbtn, money, fmtDate } from '../lib.mjs';
import { form, input, textarea, select, consent, optin } from '../forms.mjs';

const pad = (n) => String(n).padStart(2, '0');

export default function (ctx) {
  const { pieces, drop, events } = ctx;
  const live = pieces.filter((p) => p.status !== 'sold');
  const sold = pieces.filter((p) => p.status === 'sold');
  const total = live.length;
  const available = pieces.filter((p) => p.status === 'available').length;

  const counter = available
    ? `${available} piece${available === 1 ? '' : 's'} available${sold.length ? `, ${sold.length} in the archive` : ''}`
    : `${drop} · ${total} piece${total === 1 ? '' : 's'} in the works`;

  const frames = live.map((p, i) => {
    const flip = i % 2 === 1;
    const price = p.status === 'available' && p.price != null ? money(p.price) : 'Price on request';
    const sizes = p.sizes.length ? `<ul class="chips">${p.sizes.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : 'Listed at release';
    return `
      <article class="frame${flip ? ' frame--flip' : ''}" id="${p.id}" aria-labelledby="${p.id}-name" data-frame>
        <figure class="frame__media">
          ${img(ctx, p.image, { alt: p.alt, sizes: '(min-width: 900px) 58vw, 100vw', cls: 'frame__img', focus: p.focus, eager: i === 0 })}
          ${p.placeholder ? '<figcaption class="frame__tag mono">Placeholder photo</figcaption>' : ''}
        </figure>
        <div class="frame__text">
          <p class="label">No. ${pad(i + 1)} / ${pad(total)}${p.status === 'available' ? ' · Only one exists' : ''}</p>
          <h3 class="frame__name display" id="${p.id}-name">${esc(p.name)}</h3>
          <p class="frame__story">${esc(p.story)}</p>
          <dl class="frame__meta mono">
            <div><dt>Sizes</dt><dd>${sizes}</dd></div>
            <div><dt>Price</dt><dd class="tnum">${price}</dd></div>
          </dl>
          <button class="btn btn--line" type="button" data-inquire="${esc(p.name)}" data-inquire-id="${p.id}" aria-haspopup="dialog">
            ${fbtn('sm')}<span>${p.status === 'available' ? 'Claim this piece' : 'Ask about this piece'}</span><span class="sr-only">: ${esc(p.name)}</span>
          </button>
        </div>
      </article>
      <div class="frame-gap" aria-hidden="true"><span class="label">${i + 1 < total ? 'Next piece' : 'End of drop'}</span></div>`;
  }).join('');

  const eventRows = events.upcoming.slice(0, 4).map((e) => `
      <li class="events__row">
        <span class="mono tnum">${fmtDate(e.date)}</span>
        <span class="events__name">${esc(e.name)}</span>
        <span class="mono">${esc(e.city)}</span>
        <span class="mono events__status events__status--${e.status}">${e.status === 'confirmed' ? 'Confirmed' : 'Tentative'}</span>
      </li>`).join('');

  const intro = `
<div class="intro" id="intro" role="dialog" aria-modal="true" aria-label="Welcome to Second Ascent" data-intro>
  <div class="intro__shadow" aria-hidden="true"></div>
  <div class="intro__half intro__half--left" aria-hidden="true">
    <picture><source media="(max-width: 700px)" srcset="/assets/img/intro-left-sm.webp"><img src="/assets/img/intro-left-lg.webp" alt="" width="1429" height="2452" fetchpriority="high"></picture>
  </div>
  <div class="intro__half intro__half--right" aria-hidden="true">
    <picture><source media="(max-width: 700px)" srcset="/assets/img/intro-right-sm.webp"><img src="/assets/img/intro-right-lg.webp" alt="" width="1693" height="2452" fetchpriority="high"></picture>
  </div>
  <div class="intro__frame">
    <button class="intro__btn intro__btn--top" type="button" data-unbutton aria-label="Unbutton the flannel and enter the site"><img src="/assets/img/button.webp" alt="" width="237" height="240"></button>
    <button class="intro__btn intro__btn--bottom" type="button" data-unbutton aria-label="Unbutton the flannel and enter the site"><img src="/assets/img/button.webp" alt="" width="237" height="240"></button>
  </div>
  <p class="intro__hint mono" aria-hidden="true">Unbutton to enter</p>
  <p class="sr-only">Second Ascent. Utah's very own. Upcycled apparel.</p>
  <button class="intro__skip mono" type="button" data-intro-skip>Skip intro</button>
</div>`;

  const inquiry = `
<dialog class="sheet" id="inquiry" aria-labelledby="inquiry-title">
  <div class="sheet__inner">
    <div class="sheet__head">
      <p class="label" id="inquiry-kicker">${esc(drop)}</p>
      <button class="sheet__close mono" type="button" data-sheet-close>${fbtn('md')}<span>Close</span></button>
    </div>
    <h2 class="sheet__title display" id="inquiry-title">Ask about <span data-inquire-name>this piece</span></h2>
    <p class="small">Every piece is one of one. Send a note and we'll reply with measurements, price and how to pay. Sending this doesn't commit you to buy anything.</p>
    ${form('piece-inquiry', {
      label: 'Ask about a piece', submit: 'Send my question',
      fields: [
        '<input type="hidden" name="piece" value="" data-inquire-field>',
        input('name', 'Your name', { required: true, autocomplete: 'name' }),
        input('email', 'Email address', { type: 'email', required: true, autocomplete: 'email' }),
        select('size', 'Your usual shirt size', ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Not sure']),
        textarea('message', 'Question or note', { rows: 3, maxlength: 1500 }),
        consent('reply to my question about this piece'),
        optin(),
      ],
    })}
  </div>
</dialog>`;

  return {
    path: '/',
    title: 'Home',
    description: `${ctx.site.business.brandName} makes one-of-one upcycled flannels in ${ctx.site.business.city}, ${ctx.site.business.state}: vintage flannel and graphic tees, made again.`,
    theme: 'light',
    intro: true,
    bodyClass: 'home',
    before: intro,
    after: inquiry,
    main: `
<section class="statement" data-theme="light" aria-labelledby="statement-title">
  <div class="statement__inner">
    <span class="logo-full logo-full--dark statement__logo" role="img" aria-label="Second Ascent. Utah's very own. Upcycled apparel."></span>
    <h1 class="statement__title display" id="statement-title" tabindex="-1" data-split>Flannels with a past, made again.</h1>
    <p class="label statement__count">${esc(counter)}</p>
    <a class="scroll-cue mono" href="#collection">${fbtn('sm')}<span>See the collection</span></a>
  </div>
</section>

<section class="collection" id="collection" data-theme="light" aria-labelledby="collection-title">
  <div class="collection__head wrap">
    <h2 class="label" id="collection-title">The Collection · ${esc(drop)}</h2>
    <p class="label collection__swipe" aria-hidden="true">Swipe</p>
  </div>
  <div class="collection__viewport" data-track-viewport>
    <div class="collection__track" data-track>
      ${frames}
      <article class="frame frame--end" aria-labelledby="end-title" data-frame>
        <div class="frame__endcard">
          <p class="label">${esc(drop)}</p>
          <h3 class="display frame__name" id="end-title">That's all of it for this drop.</h3>
          <p>When a piece finds a home it moves to the archive. New work lands a few pieces at a time.</p>
          <div class="btn-row">
            <a class="btn btn--solid" href="#signup-title">${fbtn('sm')}<span>Get the next drop by email</span></a>
            <a class="btn btn--line" href="/archive/">${fbtn('sm')}<span>Visit the archive</span></a>
          </div>
        </div>
      </article>
    </div>
  </div>
  <ol class="collection__progress" aria-label="Pieces in this drop">
    ${live.map((p, i) => `<li><a href="#${p.id}" data-progress="${i}">${fbtn('md')}<span class="sr-only">Go to ${esc(p.name)}</span></a></li>`).join('')}
  </ol>
</section>

<section class="cloth" id="cloth" data-theme="light" aria-labelledby="cloth-title">
  <div class="cloth__block cloth__block--one">
    <figure class="cloth__macro" data-speed="0.85">
      ${img(ctx, 'flannel-macro', { alt: 'Close-up of plaid flannel and a button at the placket.', sizes: '(min-width: 900px) 62vw, 100vw' })}
    </figure>
    <h2 class="cloth__overlap display" id="cloth-title" data-split>Made again.</h2>
    <p class="cloth__caption label">Every piece starts as two shirts.</p>
  </div>

  <div class="cloth__block cloth__block--two">
    <div class="cloth__copy" data-reveal>
      <p class="label">${fbtn('sm')} The cloth</p>
      <p class="lede">A vintage flannel and a graphic tee go in. One shirt comes out.</p>
      <p>The flannel keeps its weight, its wear and its history. The graphic gets a second life somewhere you will notice it.</p>
    </div>
    <figure class="cloth__detail cloth__detail--a" data-speed="1.15">
      ${img(ctx, 'stacked-flannels', { alt: 'Folded plaid flannel shirts stacked on top of each other.', sizes: '(min-width: 900px) 26vw, 70vw' })}
    </figure>
    <figure class="cloth__detail cloth__detail--b" data-speed="1.08">
      ${img(ctx, 'booth-rack', { alt: 'A rack of colorful plaid flannel shirts hanging outside at a Second Ascent market booth.', sizes: '(min-width: 900px) 22vw, 60vw' })}
    </figure>
  </div>

  <div class="cloth__block cloth__block--three">
    <figure class="cloth__texture" data-speed="0.9">
      ${img(ctx, 'flannel-texture', { alt: 'Navy flannel woven with red, yellow and green plaid lines.', sizes: '(min-width: 900px) 40vw, 80vw' })}
    </figure>
    <div class="cloth__copy cloth__copy--right" data-reveal>
      <h3 class="display cloth__h3">No two the same.</h3>
      <p>There is no restock and no second run. When a piece finds a home, it goes to the archive and the next one starts on the table.</p>
    </div>
  </div>
</section>

<section class="teaser" data-theme="dark" aria-labelledby="commission-title">
  <figure class="teaser__media">
    ${img(ctx, 'booth-sign', { alt: 'A hand-painted wooden sign that reads Second Ascent, propped up at a market booth.', sizes: '(min-width: 900px) 50vw, 100vw' })}
  </figure>
  <div class="teaser__text" data-reveal>
    <p class="label">${fbtn('sm')} Commissions</p>
    <h2 class="display teaser__title" id="commission-title">Have a shirt idea? Let's make it.</h2>
    <p>Tell us the idea and the graphic. We sketch a mockup and you approve it before anything is cut.</p>
    <a class="btn btn--light" href="/commissions/">${fbtn('sm')}<span>Ask about a commission</span></a>
  </div>
</section>

<section class="findus" data-theme="light" aria-labelledby="findus-title">
  <div class="wrap findus__grid">
    <div data-reveal>
      <p class="label">${fbtn('sm')} Where to find us next</p>
      <h2 class="display findus__title" id="findus-title">On the road with a rack of flannels.</h2>
    </div>
    ${eventRows
      ? `<ol class="events">${eventRows}</ol><a class="btn btn--line" href="/find-us/">${fbtn('sm')}<span>See all dates</span></a>`
      : `<div class="findus__empty" data-reveal><p>The next markets are being booked. Dates go up here as soon as they are confirmed, and in the email.</p><a class="btn btn--line" href="/find-us/">${fbtn('sm')}<span>Where to find us</span></a></div>`}
  </div>
</section>

${sold.length ? `
<section class="archive-teaser wrap" data-theme="light" aria-labelledby="archive-title">
  <h2 class="label" id="archive-title">${fbtn('sm')} Found a new home</h2>
  <ul class="archive-grid archive-grid--small">${sold.slice(0, 4).map((p) => `<li><a href="/archive/">${img(ctx, p.image, { alt: p.alt, sizes: '20vw' })}<span class="label">${esc(p.name)}</span></a></li>`).join('')}</ul>
</section>` : ''}
`,
  };
}
