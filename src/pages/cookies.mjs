import { contactLine } from '../lib.mjs';
import { legalPage } from '../legal.mjs';

export default function (ctx) {
  return legalPage(ctx, {
    path: '/cookies/',
    title: 'Cookie Policy',
    description: 'Second Ascent does not use cookies or trackers. Here is the small amount of browser storage the site uses.',
    intro: 'Short version: this site does not use cookies, analytics or advertising trackers, so there is no cookie banner. It remembers one thing in your browser, explained below.',
    sections: [
      ['cookies', 'Cookies', `<p>Cookies are small files a website stores in your browser. This site does not set any cookies, and we have not added any third-party services that set them.</p>`],
      ['storage', 'What the site does store', `
        <p>The site uses your browser's own storage for two small entries. They never leave your device and are not used to identify or track you.</p>
        <div class="table-wrap"><table>
          <caption class="sr-only">Browser storage used by this site</caption>
          <thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">How long</th></tr></thead>
          <tbody>
            <tr><td class="mono">sa-intro-seen</td><td>Local storage</td><td>Remembers that you have seen the flannel opening, so it plays a shorter version next time.</td><td>30 days, then ignored</td></tr>
            <tr><td class="mono">sa-session</td><td>Session storage</td><td>Skips the opening when you move between pages during one visit.</td><td>Until you close the tab</td></tr>
          </tbody>
        </table></div>
        <p>These support a feature you see on the site, so they don't need consent under U.S. law. If you'd rather the site remember nothing, clear it below or use your browser's private mode.</p>
        <p><button class="btn btn--line" type="button" data-clear-storage>Clear this site's saved data</button> <span class="small" role="status" data-clear-status></span></p>`],
      ['third', 'Third-party content', `<p>Fonts, scripts and images are all served from this website. There are no embedded videos, maps, social feeds or chat widgets. Links to other sites, such as a map link for a market, take you to services with their own cookie policies.</p>`],
      ['hosting', 'Our host', `<p>The site is hosted by Netlify, which processes technical information such as IP addresses to deliver pages and protect against abuse, as described in our <a href="/privacy/">Privacy Policy</a>. Netlify does not set tracking cookies on this site.</p>`],
      ['changes', 'If this changes', `<p>If we ever add analytics, embedded media or anything else that uses cookies or tracks visitors, we'll update this page first and, where the law or good practice calls for it, ask for your consent before anything non-essential runs.</p>`],
      ['contact', 'Contact', `<p>Questions? ${contactLine(ctx.site).replace(/^./, (s) => s.toUpperCase())}.</p>`],
    ],
  });
}
