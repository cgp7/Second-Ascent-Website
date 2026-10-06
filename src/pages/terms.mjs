import { esc, legalName, contactLine } from '../lib.mjs';
import { legalPage } from '../legal.mjs';

export default function (ctx) {
  const { site } = ctx;
  const b = site.business;
  const c = site.owner_must_confirm;
  const who = esc(legalName(site));
  return legalPage(ctx, {
    path: '/terms/',
    title: 'Terms & Conditions',
    description: `The terms for using the ${b.brandName} website, buying a piece and commissioning custom work.`,
    intro: `These terms apply when you use this website, ask about or buy a piece, or commission custom work from ${who} (${site.business.legalName ? '"Second Ascent", ' : ''}"we", "us"). By using the site or buying from us, you agree to them. Please read them along with our <a href="/privacy/">Privacy Policy</a> and <a href="/shipping-returns/">Shipping, Returns &amp; Refunds</a> policy.`,
    sections: [
      ['site', 'Using this website', `<p>You may browse and use the site for personal, non-commercial purposes. Please don't misuse it: no attempts to break or overload it, scrape it in bulk, send spam through the forms, or upload anything unlawful. We may update, change or take down any part of the site at any time.</p>`],
      ['goods', 'About our pieces', `
        <ul>
          <li><strong>Upcycled and vintage materials.</strong> Every piece is made from previously worn garments. Expect natural signs of age such as fading, small marks or softened fabric. We describe noticeable flaws, and these are part of the piece, not defects.</li>
          <li><strong>One of one.</strong> Each piece is unique. Photos show the actual piece unless the listing says otherwise, but colors can look different on different screens.</li>
          <li><strong>Sizing.</strong> Original size labels may not match modern sizing. Rely on the measurements we give, and ask if you are unsure.</li>
          <li><strong>Brands and graphics.</strong> Some pieces include graphics, labels or logos from the original garments. Those names and marks belong to their owners. Second Ascent is not affiliated with, sponsored by or endorsed by them.</li>
          <li><strong>Care.</strong> Follow the care instructions we provide with your piece. We are not responsible for damage caused by washing or wear that ignores them.</li>
        </ul>`],
      ['orders', 'Asking about and buying a piece', `
        <ul>
          <li>Sending a question or a "claim" request through the site is not an order and doesn't commit you or us to anything.</li>
          <li>An order is formed only when we confirm the piece is available, tell you the total (price, any shipping and any sales tax), and you pay in full.</li>
          <li>Prices are in U.S. dollars. Sales tax is added where required.</li>
          <li>Because each piece is unique, it can sell in person at a market before an online request is answered. We will tell you if that happens.</li>
          <li>If there is a clear error in a price or description, we may cancel the order and refund you in full.</li>
        </ul>`],
      ['commissions', 'Commissions', `
        <ul>
          <li><strong>Mockup first.</strong> We send a mockup and a quote. You get up to ${c.commissionRevisionRounds} rounds of changes. Nothing is cut until you approve the mockup in writing (email is fine).</li>
          <li><strong>Deposit.</strong> Work starts after you approve the mockup and pay a ${c.commissionDepositPercent}% deposit. The balance is due before the piece ships or is picked up. Refunds for commissions are covered in the <a href="/shipping-returns/#commissions">refund policy</a>.</li>
          <li><strong>Timing.</strong> We confirm an estimated completion date in writing before you pay the deposit. Dates are estimates; we'll tell you promptly about any delay.</li>
          <li><strong>Your materials.</strong> If you send a shirt, graphic or image, you confirm that you own it or have permission to use it, and that it does not infringe anyone's copyright, trademark or other rights. You keep ownership of what you send; you give us permission to use it only to make your piece.</li>
          <li><strong>What we won't make.</strong> We may decline any request, including ones that copy someone else's artwork or brand without permission, or that we consider hateful or unlawful.</li>
          <li><strong>Garments you send.</strong> We take care with shirts you send us, but old fabric can tear or fail during work. We'll tell you before cutting if we think a garment is too fragile. Our responsibility for a garment you send is limited to the amount you paid us for the commission.</li>
          <li><strong>Photos of your piece.</strong> We will only post photos of your commission publicly if you say yes.</li>
          <li><strong>Natural variation.</strong> The finished piece will closely follow the approved mockup, but small differences in placement, color and texture are a normal part of handmade, upcycled work.</li>
        </ul>`],
      ['ip', 'Our content', `<p>The Second Ascent name, logos, designs, text and original photography on this site belong to ${who} and may not be copied or used without our written permission. You may share links to the site and pieces.</p>`],
      ['credits', 'Photo credits', `<p>Some images on this site are placeholders from Unsplash, used under the <a href="https://unsplash.com/license" rel="noopener">Unsplash License</a>, until our own photography replaces them. They are marked "Placeholder photo" and do not show actual Second Ascent pieces. Photographers: Jonathan Adams, Jordan Proietti.</p>`],
      ['disclaimer', 'Disclaimer', `<p>The site is provided "as is". We work to keep it accurate and available, but we don't promise it will always be error-free or uninterrupted. Nothing in these terms limits any rights you have under consumer protection laws that cannot be waived.</p>`],
      ['liability', 'Limit of liability', `<p>To the extent the law allows, we are not liable for indirect or consequential losses, and our total liability to you for any claim about a purchase or commission is limited to the amount you paid us for it. Some places don't allow these limits, so they may not apply to you.</p>`],
      ['indemnity', 'Materials you send us', `<p>If someone makes a claim against us because of a graphic, image or garment you supplied for a commission, you agree to cover our reasonable costs of dealing with it, to the extent the law allows.</p>`],
      ['law', 'Governing law', `<p>These terms are governed by the laws of the State of ${esc(b.state)}, without regard to conflict-of-law rules. Any dispute will be handled in the state or federal courts located in Salt Lake County, ${esc(b.state)}, except that either of us may bring a qualifying claim in small claims court. Please contact us first; most problems can be solved with a conversation.</p>`],
      ['changes', 'Changes', `<p>We may update these terms. The version in effect when you place an order or start a commission applies to it. The date at the top shows when they last changed.</p>`],
      ['contact', 'Contact', `<p>${contactLine(site).replace(/^./, (s) => s.toUpperCase())}.</p>`],
    ],
  });
}
