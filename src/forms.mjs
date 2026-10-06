import { esc } from './lib.mjs';

// Netlify Forms: the static HTML is parsed at deploy, so every form must exist in the built pages.
// JS (assets/js/main.js) upgrades them to inline submission; without JS they post to /thanks/.
export function form(name, { label, submit, fields, intro = '', cls = '' }) {
  return `<form class="form ${cls}" name="${name}" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="company_website" aria-label="${esc(label)}" data-form>
  <input type="hidden" name="form-name" value="${name}">
  <p class="hp" aria-hidden="true"><label>Leave this empty <input name="company_website" tabindex="-1" autocomplete="off"></label></p>
  ${intro}
  ${fields.join('\n  ')}
  <p class="form__req mono">Fields marked <span aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required.</p>
  <div class="form__actions"><button class="btn btn--solid" type="submit">${esc(submit)}</button></div>
  <p class="form__status" role="status" aria-live="polite"></p>
</form>`;
}

let uid = 0;
const id = (n) => `f-${n}-${++uid}`;
const req = (r) => (r ? ' <span class="req" aria-hidden="true">*</span>' : '');

export function input(name, label, { type = 'text', required = false, autocomplete = '', hint = '', attrs = '' } = {}) {
  const i = id(name);
  const h = hint ? `<span class="field__hint" id="${i}-hint">${hint}</span>` : '';
  return `<div class="field"><label for="${i}">${esc(label)}${req(required)}</label>${h}<input id="${i}" name="${name}" type="${type}"${required ? ' required' : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${hint ? ` aria-describedby="${i}-hint"` : ''} ${attrs}><span class="field__error" id="${i}-err"></span></div>`;
}

export function textarea(name, label, { required = false, hint = '', rows = 5, maxlength = 3000 } = {}) {
  const i = id(name);
  const h = hint ? `<span class="field__hint" id="${i}-hint">${hint}</span>` : '';
  return `<div class="field"><label for="${i}">${esc(label)}${req(required)}</label>${h}<textarea id="${i}" name="${name}" rows="${rows}" maxlength="${maxlength}"${required ? ' required' : ''}${hint ? ` aria-describedby="${i}-hint"` : ''}></textarea><span class="field__error" id="${i}-err"></span></div>`;
}

export function select(name, label, options, { required = false, hint = '' } = {}) {
  const i = id(name);
  const h = hint ? `<span class="field__hint" id="${i}-hint">${hint}</span>` : '';
  const opts = [`<option value="">Choose one</option>`, ...options.map((o) => `<option>${esc(o)}</option>`)].join('');
  return `<div class="field"><label for="${i}">${esc(label)}${req(required)}</label>${h}<select id="${i}" name="${name}"${required ? ' required' : ''}${hint ? ` aria-describedby="${i}-hint"` : ''}>${opts}</select><span class="field__error" id="${i}-err"></span></div>`;
}

// Required privacy acknowledgement on every form that collects personal data.
export function consent(purpose) {
  const i = id('consent');
  return `<div class="field field--check"><input type="checkbox" id="${i}" name="privacy_consent" value="yes" required><label for="${i}">I agree that Second Ascent may use these details to ${purpose}, as described in the <a href="/privacy/">Privacy Policy</a>. <span class="req" aria-hidden="true">*</span></label><span class="field__error" id="${i}-err"></span></div>`;
}

// Optional, unticked marketing opt-in kept separate from the request itself.
export function optin() {
  const i = id('optin');
  return `<div class="field field--check"><input type="checkbox" id="${i}" name="newsletter_optin" value="yes"><label for="${i}">Optional: also email me about new drops and market dates. I can unsubscribe at any time.</label></div>`;
}
