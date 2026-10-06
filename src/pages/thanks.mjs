import { fbtn } from '../lib.mjs';

export default function () {
  return {
    path: '/thanks/',
    title: 'Thanks',
    description: 'Your message was sent.',
    theme: 'light',
    noindex: true,
    main: `
<section class="page-hero page-hero--center wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Sent</p>
  <h1 class="display page-hero__title" tabindex="-1">Got it. Thanks.</h1>
  <p class="lede">Your message is in. We'll reply by email.</p>
  <div class="btn-row"><a class="btn btn--solid" href="/">${fbtn('sm')}<span>Back to the home page</span></a></div>
</section>
`,
  };
}
