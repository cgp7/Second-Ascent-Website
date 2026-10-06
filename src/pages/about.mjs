import { img, fbtn } from '../lib.mjs';

export default function (ctx) {
  const b = ctx.site.business;
  return {
    path: '/about/',
    title: 'About',
    description: `About ${b.brandName}: upcycled, one-of-one flannels from ${b.city}, ${b.state}.`,
    theme: 'light',
    main: `
<section class="page-hero wrap" data-theme="light">
  <p class="label">${fbtn('sm')} About</p>
  <h1 class="display page-hero__title" tabindex="-1" data-split>The second life of a shirt.</h1>
</section>

<figure class="wide-figure" data-reveal>
  ${img(ctx, 'booth', { alt: 'The Second Ascent market booth: a silver trailer, a rack of flannel shirts, a striped umbrella and a hand-painted sign.', sizes: '100vw', eager: true })}
</figure>

<section class="wrap prose-split" data-theme="light" aria-labelledby="name-title">
  <h2 class="label" id="name-title">The name</h2>
  <div class="prose" data-reveal>
    <p class="lede">In climbing, a second ascent is the next time someone makes it up a route that has already been climbed.</p>
    <p>That's the idea behind every piece. A flannel that already had one life, climbed again. ${b.brandName} is a small upcycled apparel label from ${b.city}, ${b.state}. Each shirt combines a vintage flannel with graphic tee elements, and each one exists once.</p>
    <p>You'll find the shirts here and at markets and pop-ups, on a rack next to a hand-painted sign.</p>
  </div>
</section>

<section class="remade" data-theme="dark" aria-labelledby="remade-title">
  <div class="wrap">
    <h2 class="display remade__title" id="remade-title" data-split>How a flannel is made again.</h2>
    <ol class="remade__list">
      <li data-reveal><figure>${img(ctx, 'stacked-flannels', { alt: 'Folded plaid flannel shirts stacked on top of each other.', sizes: '(min-width: 900px) 30vw, 90vw' })}</figure><h3 class="mono">01 · Find</h3><p>Vintage flannels and graphic tees, picked one at a time.</p></li>
      <li data-reveal><figure>${img(ctx, 'flannel-texture', { alt: 'Navy flannel woven with red, yellow and green plaid lines.', sizes: '(min-width: 900px) 30vw, 90vw' })}</figure><h3 class="mono">02 · Plan</h3><p>The graphic and the cloth are matched, and the layout is drawn before anything is cut.</p></li>
      <li data-reveal><figure>${img(ctx, 'flannel-macro', { alt: 'Close-up of plaid flannel and a button at the placket.', sizes: '(min-width: 900px) 30vw, 90vw' })}</figure><h3 class="mono">03 · Sew</h3><p>The two become one shirt, finished and ready for its next life.</p></li>
    </ol>
  </div>
</section>

<section class="wrap cta-band" data-theme="light">
  <h2 class="display cta-band__title">Come say hi in person.</h2>
  <div class="btn-row">
    <a class="btn btn--solid" href="/find-us/">${fbtn('sm')}<span>Where to find us next</span></a>
    <a class="btn btn--line" href="/commissions/">${fbtn('sm')}<span>Ask about a commission</span></a>
  </div>
</section>
`,
  };
}
