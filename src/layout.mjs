import { esc, fbtn, sprite } from './lib.mjs';
import { form, input, consent } from './forms.mjs';

const nav = [
  ['/#collection', 'Collection'],
  ['/#cloth', 'Material origin'],
  ['/commissions/', 'Commissions'],
  ['/archive/', 'Archive'],
  ['/about/', 'About'],
  ['/find-us/', 'Where to find us'],
  ['/contact/', 'Contact'],
];
const legal = [
  ['/privacy/', 'Privacy Policy'],
  ['/terms/', 'Terms & Conditions'],
  ['/cookies/', 'Cookie Policy'],
  ['/shipping-returns/', 'Shipping, Returns & Refunds'],
  ['/accessibility/', 'Accessibility'],
];

export function layout(page, ctx) {
  const { site } = ctx;
  const b = site.business;
  const title = page.path === '/' ? `${b.brandName} | Upcycled flannels from ${b.city}, ${b.state}` : `${page.title} | ${b.brandName}`;
  const canonical = site.url + (page.path === '/404' ? '/' : page.path);
  const robots = !site.launched || page.noindex ? '<meta name="robots" content="noindex, nofollow">' : '';
  const current = (href) => (href === page.path ? ' aria-current="page"' : '');
  const org = {
    '@context': 'https://schema.org', '@type': 'ClothingStore', name: b.brandName,
    url: site.url, address: { '@type': 'PostalAddress', addressLocality: b.city, addressRegion: b.stateCode, addressCountry: 'US' },
    ...(b.email ? { email: b.email } : {}),
  };

  return `<!doctype html>
<html lang="en"${page.intro ? ' data-has-intro' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
${robots}
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0f1320">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(b.brandName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/fraunces-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/dm-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${page.head || ''}
<link rel="stylesheet" href="/assets/css/site.css">
<script src="/assets/js/boot.js"></script>
<script src="/assets/js/vendor/gsap.min.js" defer></script>
<script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
<script type="application/ld+json">${JSON.stringify(org)}</script>
</head>
<body class="${page.bodyClass || ''}">
${sprite}
<a class="skip-link" href="#main">Skip to content</a>
${page.before || ''}
<header class="site-header" data-theme="${page.theme || 'light'}">
  <a class="site-header__logo" href="/" aria-label="${esc(b.brandName)}, home"><span class="logo-mark" aria-hidden="true"></span><span class="site-header__word mono" aria-hidden="true">${esc(b.brandName)}</span></a>
  <nav class="site-header__nav" aria-label="Primary">
    <a class="mono" href="/#collection">Collection</a>
    <a class="mono" href="/commissions/"${current('/commissions/')}>Commissions</a>
    <a class="mono" href="/about/"${current('/about/')}>About</a>
  </nav>
  <button class="menu-toggle mono" type="button" aria-haspopup="dialog" aria-controls="menu" data-menu-open>${fbtn('md')}<span>Menu</span></button>
</header>

<dialog class="menu" id="menu" aria-label="Site menu">
  <div class="menu__inner">
    <div class="menu__top">
      <span class="logo-mark logo-mark--light" aria-hidden="true"></span>
      <button class="menu-close mono" type="button" data-menu-close>${fbtn('md')}<span>Close menu</span></button>
    </div>
    <nav aria-label="All pages"><ul class="menu__list">
      ${nav.map(([h, l]) => `<li>${fbtn('sm')}<a href="${h}"${current(h)}>${l}</a></li>`).join('\n      ')}
    </ul></nav>
    <p class="menu__foot mono">${esc(b.tagline)} · ${esc(b.city)}, ${esc(b.state)}</p>
  </div>
</dialog>

<main id="main" tabindex="-1">
${page.main}
</main>

<footer class="site-footer" data-theme="dark">
  <div class="wrap site-footer__grid">
    <div class="site-footer__brand">
      <span class="logo-full" role="img" aria-label="Second Ascent. Utah's very own. Upcycled apparel."></span>
    </div>
    <nav class="site-footer__nav" aria-label="Site map">
      <h2 class="label">Site map</h2>
      <ul class="blist">${nav.map(([h, l]) => `<li>${fbtn('sm')}<a href="${h}">${l}</a></li>`).join('')}</ul>
    </nav>
    <nav class="site-footer__nav" aria-label="Policies">
      <h2 class="label">Policies</h2>
      <ul class="blist">${legal.map(([h, l]) => `<li>${fbtn('sm')}<a href="${h}">${l}</a></li>`).join('')}</ul>
    </nav>
    <div class="site-footer__signup">
      <h2 class="label" id="signup-title">Hear about the next drop</h2>
      <p class="small">One email when new pieces land or a market is booked. Nothing else.</p>
      ${form('newsletter', {
        label: 'Newsletter signup', submit: 'Sign up for emails', cls: 'form--compact',
        fields: [
          input('email', 'Email address', { type: 'email', required: true, autocomplete: 'email' }),
          consent('send me emails about new drops and market dates, until I unsubscribe'),
        ],
      })}
    </div>
  </div>
  <div class="wrap site-footer__base mono">
    <p>&copy; ${ctx.year} ${esc(b.legalName || b.brandName)}. All rights reserved.</p>
    <p>${esc(b.city)}, ${esc(b.state)}${b.email ? ` · <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>` : ''}${b.instagram ? ` · <a href="https://instagram.com/${esc(b.instagram)}" rel="noopener">Instagram</a>` : ''}</p>
    <p>No cookies, no trackers, no ads.</p>
  </div>
</footer>
${page.after || ''}
</body>
</html>
`;
}
