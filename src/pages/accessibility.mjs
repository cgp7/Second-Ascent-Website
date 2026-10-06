import { contactLine } from '../lib.mjs';
import { legalPage } from '../legal.mjs';

export default function (ctx) {
  return legalPage(ctx, {
    path: '/accessibility/',
    title: 'Accessibility',
    description: 'Second Ascent wants this website to work for everyone. Here is what we have done and how to tell us about problems.',
    intro: 'We want everyone to be able to browse, ask about and buy our pieces. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
    sections: [
      ['done', 'What we have done', `
        <ul>
          <li>Every page works with a keyboard alone, with a visible focus outline and a "Skip to content" link.</li>
          <li>The flannel opening can be skipped with a button that is always visible, and plays itself after a few seconds if you do nothing.</li>
          <li>If your device asks for reduced motion, the opening becomes a simple fade and scroll animations are turned off.</li>
          <li>Text meets AA color contrast. Images have text descriptions; decorative images are hidden from screen readers.</li>
          <li>Every form field has a visible label, errors are explained in words, and buttons say exactly what they do.</li>
          <li>Pages zoom to 200% and reflow on small screens without sideways scrolling, except the collection, which you can swipe or move through with the piece buttons.</li>
        </ul>`],
      ['limits', 'Known limitations', `<ul><li>Some photos are temporary placeholders until we photograph our own pieces.</li><li>On large screens, the collection scrolls sideways as you scroll down. Each piece can also be reached directly from the button column on the right.</li></ul>`],
      ['help', 'Need help or found a problem?', `<p>If anything on this site is hard to use, ${contactLine(ctx.site)} and tell us the page and what happened. We'll get back to you within 5 business days and can help you with any question or purchase directly by email.</p>`],
    ],
  });
}
