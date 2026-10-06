import { contactLine } from '../lib.mjs';
import { legalPage } from '../legal.mjs';

export default function (ctx) {
  const c = ctx.site.owner_must_confirm;
  return legalPage(ctx, {
    path: '/shipping-returns/',
    title: 'Shipping, Returns & Refunds',
    description: 'How Second Ascent ships orders, and how returns and refunds work for ready-made pieces and commissions.',
    intro: `Every piece is one of one, so we keep this simple and clear. Ready-made pieces can be returned within ${c.returnWindowDays} days of delivery. Commissions are made for you, so they work differently.`,
    sections: [
      ['shipping', 'Shipping', `
        <ul>
          <li>We currently ship within the United States.</li>
          <li>We ship within ${c.shipWithinBusinessDays} business days after payment, unless we tell you a different time before you pay. You'll get tracking by email.</li>
          <li>If we can't ship in that time, we'll tell you and give you the choice to wait or cancel for a full refund.</li>
          <li>Shipping cost is shown before you pay. Local pickup in ${ctx.site.business.city} may be possible; ask us.</li>
        </ul>`],
      ['damaged', 'Lost or damaged parcels', `<p>If your order arrives damaged or doesn't arrive, contact us within 7 days of the delivery date (or expected delivery date) with photos if it's damaged. We'll work with the carrier and, if it can't be resolved, refund you in full.</p>`],
      ['returns', 'Returning a ready-made piece', `
        <ul>
          <li>You can return a ready-made piece within ${c.returnWindowDays} days of delivery or purchase at a market.</li>
          <li>It must be unworn, unwashed and in the condition you received it.</li>
          <li>Contact us first so we can send return instructions. Please don't ship anything back without them.</li>
          <li>You pay return shipping, unless the piece wasn't as described or arrived damaged; then we pay.</li>
          <li>Because each piece is unique, we can't exchange it for another size. Return it and ask about another piece instead.</li>
        </ul>`],
      ['refunds', 'Refunds', `
        <ul>
          <li>Once we receive and check the return, we refund the price of the piece to your original payment method within ${c.refundProcessingDays} business days. Your bank may take a few more days to show it.</li>
          <li>Original shipping costs are refunded only if the return is because of our error.</li>
          <li>If a returned piece has been worn, washed or damaged, we'll contact you before deciding on a partial refund or sending it back.</li>
        </ul>`],
      ['commissions', 'Commissions and custom work', `
        <ul>
          <li><strong>Before you approve the mockup:</strong> you can cancel at any time and owe nothing.</li>
          <li><strong>After you approve and pay the ${c.commissionDepositPercent}% deposit:</strong> the deposit is non-refundable, because materials are cut and work starts for you.</li>
          <li><strong>When the piece is finished:</strong> custom pieces can't be returned for change of mind. If it doesn't match the approved mockup or has a workmanship defect, tell us within 14 days of receiving it and we'll repair it, remake it or refund you.</li>
          <li><strong>If we can't finish it:</strong> if we have to cancel a commission for any reason, we refund everything you've paid.</li>
        </ul>`],
      ['defects', 'Workmanship problems', `<p>If a seam or repair we made fails within 30 days of delivery under normal wear, contact us and we'll fix it free. Signs of age in the original fabric aren't defects, but tell us anyway and we'll see what we can do.</p>`],
      ['rights', 'Your legal rights', `<p>This policy doesn't limit any rights you have under consumer protection law.</p>`],
      ['contact', 'Start a return or ask a question', `<p>${contactLine(ctx.site).replace(/^./, (s) => s.toUpperCase())}. Please include your name and what you bought.</p>`],
    ],
  });
}
