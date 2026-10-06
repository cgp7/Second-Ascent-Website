import { esc, legalName, contactLine } from '../lib.mjs';
import { legalPage } from '../legal.mjs';

export default function (ctx) {
  const { site } = ctx;
  const b = site.business;
  const c = site.owner_must_confirm;
  const who = esc(legalName(site));
  return legalPage(ctx, {
    path: '/privacy/',
    title: 'Privacy Policy',
    description: `How ${b.brandName} collects, uses and protects your information.`,
    intro: `${who} (${site.business.legalName ? '"Second Ascent", ' : ''}"we", "us") collects as little as it can. This policy explains what we collect through this website and at checkout, why, who helps us handle it, and the choices you have.`,
    sections: [
      ['who', 'Who we are', `<p>This website is run by ${who}, based in ${esc(b.city)}, ${esc(b.state)}, United States${b.mailingAddress ? `, mailing address ${esc(b.mailingAddress)}` : ''}. To reach us about privacy, ${contactLine(site)}.</p>`],
      ['collect', 'What we collect', `
        <p><strong>Information you give us.</strong> We only collect what you type into a form:</p>
        <ul>
          <li><strong>Piece questions:</strong> name, email address, the piece you asked about, an optional shirt size and an optional note.</li>
          <li><strong>Commission requests:</strong> name, email address, your idea, optional reference links, shirt preference, size, budget range and an optional date.</li>
          <li><strong>Contact messages:</strong> name, email address and your message.</li>
          <li><strong>Email signup:</strong> your email address.</li>
          <li><strong>Your choices:</strong> that you agreed to this policy when you sent a form, and whether you ticked the optional box to get emails.</li>
        </ul>
        <p><strong>Information needed to complete a purchase.</strong> If you buy a piece, we need your name, shipping address, email and order details to ship it. Payments are handled by a payment provider (for example Square, Stripe or PayPal). We never see or store your full card number.</p>
        <p><strong>Information collected automatically.</strong> Our hosting provider, Netlify, processes technical data needed to deliver the site and keep it secure, such as your IP address, browser type, the page requested and the time. We do not use this to identify you, build profiles or advertise.</p>
        <p><strong>What we don't collect.</strong> We do not use analytics, advertising pixels, social media trackers, session recording or cookies. See the <a href="/cookies/">Cookie Policy</a>.</p>
        <p>Please don't send sensitive information (such as health details, government ID numbers or payment card numbers) through our forms.</p>`],
      ['use', 'How we use it', `
        <ul>
          <li>To reply to your question, commission request or message.</li>
          <li>To make, sell, ship and support a piece you buy, including handling returns and refunds.</li>
          <li>To send drop and market emails, only if you signed up or ticked the optional box. Every email has an unsubscribe link.</li>
          <li>To keep the site secure and filter spam.</li>
          <li>To meet legal, tax and accounting obligations.</li>
        </ul>
        <p>We do not sell your personal information, share it for targeted advertising, or use it for automated decisions that affect you.</p>`],
      ['share', 'Who we share it with', `
        <p>We share information only with service providers that help us run the business, and only as needed:</p>
        <ul>
          <li><strong>Netlify, Inc.</strong> hosts this website and receives and stores form submissions. Netlify may screen submissions with automated spam filtering.</li>
          <li><strong>Our payment provider</strong> processes payments when you buy something, under its own privacy policy.</li>
          <li><strong>Shipping carriers</strong> (such as USPS, UPS or FedEx) receive your name and address to deliver an order.</li>
          <li><strong>Our email provider</strong>, if we use one to send drop emails, receives your email address.</li>
        </ul>
        <p>We may also disclose information if the law requires it, to protect our rights or someone's safety, or as part of a sale or transfer of the business (in which case this policy would continue to apply to your information).</p>`],
      ['keep', 'How long we keep it', `<p>We keep form messages for up to ${c.formRetentionMonths} months after our last conversation with you, then delete them. Order records are kept as long as tax and accounting rules require. Your email signup is kept until you unsubscribe or ask us to delete it.</p>`],
      ['rights', 'Your choices and rights', `
        <p>Wherever you live, you can ask us to:</p>
        <ul>
          <li>tell you what personal information we have about you and give you a copy;</li>
          <li>correct it;</li>
          <li>delete it;</li>
          <li>stop sending you emails (use the unsubscribe link or contact us).</li>
        </ul>
        <p>To make a request, ${contactLine(site)}. We may need to confirm the request came from you, usually by replying from the same email address. We aim to respond within 45 days. We won't treat you differently for making a request.</p>
        <p>Some U.S. states, including Utah, have privacy laws that give residents specific rights. We offer the rights above to everyone. Because we don't sell personal information or use it for targeted advertising, there is nothing to opt out of; if your browser sends a Global Privacy Control signal, we treat it as an opt-out anyway.</p>`],
      ['security', 'Security', `<p>The site is served only over encrypted HTTPS connections, and form data is stored with our hosting provider, which uses industry-standard safeguards. No method of storing or sending data is perfectly secure, but we limit who can access your information and only keep what we need.</p>`],
      ['children', 'Children', `<p>This site is not directed to children under ${c.minimumAge}, and we do not knowingly collect personal information from them. If you believe a child has sent us information, contact us and we will delete it.</p>`],
      ['location', 'Where your information is stored', `<p>We are based in the United States, and our service providers store information in the United States. If you visit from outside the U.S., your information will be processed there.</p>`],
      ['changes', 'Changes to this policy', `<p>If we change this policy, we'll update the date at the top of this page. If a change is significant, we'll say so on the home page or by email before it takes effect.</p>`],
      ['contact', 'Contact', `<p>Questions about privacy? ${contactLine(site).replace(/^./, (s) => s.toUpperCase())}.</p>`],
    ],
  });
}
