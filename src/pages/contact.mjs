import { esc, fbtn } from '../lib.mjs';
import { form, input, textarea, consent } from '../forms.mjs';

export default function (ctx) {
  const b = ctx.site.business;
  return {
    path: '/contact/',
    title: 'Contact',
    description: 'Get in touch with Second Ascent.',
    theme: 'light',
    main: `
<section class="page-hero wrap" data-theme="light">
  <p class="label">${fbtn('sm')} Contact</p>
  <h1 class="display page-hero__title" tabindex="-1" data-split>Say hello.</h1>
  <p class="lede page-hero__lede">Questions about a piece, an order, or a market? Send a note.${b.email ? ` Or email <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>.` : ''}</p>
</section>
<section class="wrap form-section" aria-labelledby="contact-title" data-theme="light">
  <div class="form-section__intro">
    <h2 class="label" id="contact-title">Send a message</h2>
    <p class="small">For custom work, the <a href="/commissions/">commission form</a> asks the right questions.</p>
    <dl class="details mono">
      <div><dt>Based in</dt><dd>${esc(b.city)}, ${esc(b.state)}</dd></div>
      ${b.legalName ? `<div><dt>Business</dt><dd>${esc(b.legalName)}</dd></div>` : ''}
      ${b.mailingAddress ? `<div><dt>Mail</dt><dd>${esc(b.mailingAddress)}</dd></div>` : ''}
      ${b.instagram ? `<div><dt>Instagram</dt><dd><a href="https://instagram.com/${esc(b.instagram)}" rel="noopener">@${esc(b.instagram)}</a></dd></div>` : ''}
    </dl>
  </div>
  ${form('contact', {
    label: 'Contact form', submit: 'Send message',
    fields: [
      input('name', 'Your name', { required: true, autocomplete: 'name' }),
      input('email', 'Email address', { type: 'email', required: true, autocomplete: 'email' }),
      textarea('message', 'Message', { required: true, rows: 6 }),
      consent('reply to my message'),
    ],
  })}
</section>
`,
  };
}
