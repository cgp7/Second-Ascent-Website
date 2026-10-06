import { img, fbtn } from '../lib.mjs';
import { form, input, textarea, select, consent, optin } from '../forms.mjs';

export default function (ctx) {
  const c = ctx.site.owner_must_confirm;
  const steps = [
    ['Tell us the idea', 'The concept, the graphic you have in mind, your size and any date you need it by. Links to reference images help.'],
    ['Pick the shirt', 'Choose a flannel from what we have on hand, or ask about using a shirt of your own.'],
    ['Sketch and approve', `We send a mockup and a price. You get up to ${c.commissionRevisionRounds} rounds of changes before you approve it.`],
    ['Made and shipped', `Once you approve the mockup and pay the ${c.commissionDepositPercent}% deposit, work starts. We confirm the timeline in writing before you pay.`],
  ];
  return {
    path: '/commissions/',
    title: 'Commissions',
    description: 'Commission a one-of-one upcycled flannel from Second Ascent. Tell us the idea, approve a mockup, and we make it.',
    theme: 'light',
    main: `
<section class="page-hero wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Commissions</p>
  <h1 class="display page-hero__title" tabindex="-1" data-split>A shirt with your story on it.</h1>
  <p class="lede page-hero__lede">Bring an idea, a graphic, or a shirt that means something. We turn it into a one-of-one flannel.</p>
</section>

<figure class="wide-figure" data-reveal>
  ${img(ctx, 'booth', { alt: 'The Second Ascent market booth: a silver trailer, a rack of flannel shirts, a striped umbrella and a hand-painted sign.', sizes: '100vw' })}
</figure>

<section class="wrap steps" aria-labelledby="steps-title" data-theme="light">
  <h2 class="label" id="steps-title">How it works</h2>
  <ol class="steps__list">
    ${steps.map(([t, d], i) => `<li class="steps__item" data-reveal><span class="steps__num mono">0${i + 1}</span>${fbtn('md')}<h3 class="steps__title">${t}</h3><p>${d}</p></li>`).join('')}
  </ol>
  <p class="small steps__note">Commission deposits and refunds are covered in the <a href="/shipping-returns/">Shipping, Returns &amp; Refunds</a> policy. Please only send graphics you own or have permission to use; see the <a href="/terms/#commissions">Terms</a>.</p>
</section>

<section class="wrap form-section" aria-labelledby="request-title" data-theme="light">
  <div class="form-section__intro">
    <h2 class="display form-section__title" id="request-title">Request a commission</h2>
    <p>We reply within ${c.commissionReplyBusinessDays} business days. Sending a request doesn't commit you to anything.</p>
  </div>
  ${form('commission-request', {
    label: 'Request a commission', submit: 'Send commission request',
    fields: [
      input('name', 'Your name', { required: true, autocomplete: 'name' }),
      input('email', 'Email address', { type: 'email', required: true, autocomplete: 'email' }),
      textarea('concept', 'Your idea', { required: true, hint: 'What should the shirt be about? Any colors, graphics or words?', rows: 6 }),
      textarea('references', 'Reference links', { hint: 'Optional. Links to images on Instagram, Pinterest, Google Drive and so on.', rows: 3, maxlength: 1500 }),
      select('shirt', 'Shirt preference', ['Pick from your flannels', 'I want to use my own shirt', 'Not sure yet']),
      select('size', 'Shirt size', ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Not sure']),
      select('budget', 'Budget range', ['Under $100', '$100 to $200', '$200 to $350', '$350 or more', 'Not sure yet']),
      input('deadline', 'Needed by', { type: 'date', hint: 'Optional. Leave blank if there is no deadline.' }),
      consent('reply to my commission request'),
      optin(),
    ],
  })}
</section>
`,
  };
}
