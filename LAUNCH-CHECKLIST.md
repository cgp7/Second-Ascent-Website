# Second Ascent: legal, compliance and launch checklist

Prepared 2026-10-06 alongside the first build. This is a practical risk review, **not legal advice**. For a business taking money and custom orders, a one-hour review with a Utah attorney before launch is cheap insurance; this document is meant to make that hour short.

The site ships in **pre-launch mode** (`"launched": false` in `site.config.json`): every page is `noindex`, and `robots.txt` blocks crawlers. Flip it to `true` only when every **Blocker** below is done.

---

## 1. What was built in for protection

| Area | What the site does |
|---|---|
| Privacy Policy | `/privacy/`. Written to match what the site actually does: forms only, no analytics, Netlify as host and form processor, payment provider at checkout. Covers rights requests, retention, children, GPC. |
| Terms & Conditions | `/terms/`. Upcycled-goods disclaimers, inquiry ≠ order, commission terms (customer warrants rights to graphics they send, we can refuse infringing or hateful requests), third-party trademark non-affiliation, liability cap, Utah law and Salt Lake County venue with a small-claims carve-out. |
| Cookie Policy | `/cookies/`. The site sets **no cookies**. It uses two browser-storage entries for the intro, listed with purpose and lifetime, plus a "Clear this site's saved data" button. |
| Cookie consent | **Not needed.** No U.S. law requires a banner for a site with no tracking or advertising cookies. If you ever add analytics, pixels, embeds or chat, you must revisit this (and probably add a consent banner). |
| Refund policy | `/shipping-returns/`. Ready-made returns window, refund timing, commission deposit rules, lost/damaged parcels, and the FTC Mail Order Rule promise (ship on time or offer a refund). |
| Form consent | Every form has a required, unticked privacy checkbox. Marketing opt-in is a **separate, optional, unticked** box. |
| Data minimization | Forms ask only for what is needed to reply. No phone, no address, no file uploads (reference *links* instead). Honeypot spam field, no reCAPTCHA (which would be a Google third party). |
| Analytics / tracking | None. Nothing loads from another domain: fonts (OFL), GSAP and images are self-hosted. A strict Content-Security-Policy in `netlify.toml` blocks anything else from loading. |
| Third-party embeds | None. "Map" links on market dates are plain links that open Google Maps in a new tab. |
| Accessibility | Targets WCAG 2.2 AA. Skip link, keyboard-reachable everything, visible focus rings, an always-visible "Skip intro", auto-play after 3s, reduced-motion support, labelled fields with spoken error messages, 44px+ tap targets, 16px inputs (no iOS zoom). All text pairs pass AA contrast (checked: lowest is 7.1:1). axe-core automated audit: **0 violations on all 13 pages.** Statement at `/accessibility/`. |
| Alt text | Every content image has descriptive alt text; decorative images use `alt=""` and `aria-hidden`. Alt text lives in `content/pieces.json` for each piece. |
| Button labels | Buttons say exactly what they do ("Send commission request", "Ask about this piece", "Sign up for emails"). |
| Fake reviews | None exist on the site. Do not add testimonials unless they are real, from real customers, with permission, and unedited in meaning (FTC rule on fake reviews, 16 CFR Part 465, fines per violation). |
| Unsupported claims | Removed or never written: no "sustainable", "eco-friendly", "handmade in Utah", "best", "premium", fake urgency, countdowns or "low stock" warnings. Copy sticks to what the brief supports: Salt Lake City brand, upcycled, vintage flannel + graphic tee elements, one of one. |
| Business details | Brand, city and state appear in the footer, contact page and structured data. Legal name, email and mailing address are **empty until you supply them** (see Blockers). Nothing was invented. |
| Placeholder content | The 4 collection pieces are clearly labelled "Placeholder photo" and "Sample listing", have no prices, and say real details arrive with the drop. |

---

## 2. Blockers: fix before setting `launched: true`

1. **Business identity** → fill in `site.config.json > business`:
   - `legalName` (e.g. "Second Ascent LLC"). If you have not formed an LLC, consider it: it separates personal assets from business liability. Utah registration: Utah Division of Corporations (corporations.utah.gov).
   - `email`: a real inbox you check.
   - `mailingAddress`: required in every marketing email under **CAN-SPAM**. A PO box or registered mail service is fine.
   - If you trade as "Second Ascent" without an LLC of that name, file a **DBA / assumed name** with the Utah Division of Corporations.
2. **Confirm every number in `owner_must_confirm`**: return window (14 days), refund timing (10 business days), ship time (5 business days), commission deposit (50%), revision rounds (2), reply time (3 business days), form retention (24 months). These are now published promises. Change them to what you will actually do.
3. **Replace placeholder photos and pieces** with real Second Ascent pieces (see §3). Never publish a product photo that is not the item being sold.
4. **Utah sales tax**: register for a sales tax license with the Utah State Tax Commission (tap.utah.gov) and collect tax on in-state sales, including at markets. Check each market's temporary-sales rules.
5. **Payment method**: decide how customers pay after an inquiry (Square, Stripe Payment Links, PayPal or Shopify). Then update the Privacy Policy line naming the provider. If you move to Shopify checkout as in the blueprint, the policies must be re-checked against Shopify's data flows.
6. **Netlify Forms**: after the first deploy, open Netlify → Forms and turn on email notifications so requests don't sit unread.

---

## 3. Risks flagged

### High
- **Trademarks and copyright on graphic tees.** Cutting logos or graphics from branded tees (bands, sports teams, brands, cartoon characters) and sewing them into a new garment you sell can be **trademark infringement** even though you bought the original tee. The "first sale" defense generally covers reselling the item as-is, not materially altering it and selling it as a new product. Brands actively sue upcyclers: for example, Chanel sued Shiver + Duke over jewelry made from repurposed Chanel buttons, and Nike sued MSCHF over customized sneakers (both 2021). Lower-risk practices:
  - Prefer non-branded, vintage or generic graphics, or art you create or license.
  - Never use a brand's name or logo in your product names, titles, hashtags or ads.
  - Keep the "not affiliated with or endorsed by" line (already in the Terms) and add it to listings that show a recognisable mark.
  - Disclose clearly that the piece is upcycled from a pre-owned garment.
  - For commissions, the Terms already make the customer warrant they have rights to what they send, and let you refuse.
- **"Second Ascent" name clearance.** Other businesses have used the name "Second Ascent" (for example, a used outdoor-gear shop in Seattle). Before investing in the brand, search USPTO (tmsearch.uspto.gov) for apparel and retail classes (25 and 35) and consider a trademark attorney's clearance opinion. Conflicts are cheaper to resolve before launch than after.

### Medium
- **Image rights.**
  - *Unsplash placeholders* (Jonathan Adams, Jordan Proietti): the Unsplash License allows commercial use, but it does **not** include model releases or trademark clearance, and it prohibits implying endorsement. One placeholder shows a person, cropped to the torso. Replace them all before launch; they are credited in the Terms meanwhile.
  - Two photos with identifiable people were in the zip (a man in front of a mountain, a woman in green plaid) and were **not used**.
  - *Flannel texture* (`1_ef94950d…webp`) and *White Button.png*: source unknown. Confirm you made them, bought a licence, or they are free for commercial use. If you can't confirm, replace them.
  - *Intro plaid comp*: the plaid fabric photo inside the Photoshop comp needs the same check.
  - *Booth photo*: shows an identifiable person (the woman seated at the trailer). Get written permission (a simple model release) if it isn't you, or crop her out.
  - *Logo*: confirm the display typeface in the logo is licensed for logo/commercial use.
- **FTC Textile, Wool and Care Labeling rules.** Garments sold in the U.S. generally need fiber content, country of origin, manufacturer identity (RN number or name) and care instructions. For upcycled pieces where original labels are removed or the garment is materially changed, add your own label. Product listings online should also state fiber content and origin. See the FTC's "Threading Your Way Through the Labeling Requirements" guide, or ask an attorney how it applies to remade garments.
- **Environmental claims.** If you later say "sustainable", "eco-friendly" or "zero waste", the FTC Green Guides require you to substantiate them. "Upcycled" and "made from pre-owned garments" are fine if true.
- **Email marketing.** When you send drop emails, follow CAN-SPAM: your physical address in every email, a working unsubscribe link, unsubscribes honored within 10 business days, honest subject lines. Only email people who opted in (the forms record this). If you move signups to Mailchimp, Klaviyo or similar, update the Privacy Policy.

### Low
- **Privacy law thresholds.** The Utah Consumer Privacy Act and California's CCPA apply only to much larger businesses (e.g. UCPA: $25M revenue + 100k consumers). Second Ascent is almost certainly below them, but the policy offers the same rights to everyone anyway. If you ever add advertising pixels, retargeting or data sharing, review again.
- **ADA website accessibility.** Website accessibility lawsuits under ADA Title III are common against small retailers. The build targets WCAG 2.2 AA and passes automated checks. Keep it that way: alt text on every new photo, no text baked into images, keep the intro skippable.
- **Children (COPPA).** The site is not directed to children under 13 and says so. Don't market to kids.
- **Prices and availability.** Because pieces can sell at a market before an online inquiry is answered, the Terms say an inquiry isn't an order. Keep listings updated (set `status` to `sold`) to avoid misleading availability.
- **Market sales.** Check each venue's vendor permit and sales tax rules. Salt Lake City may require a business license for retail activity in the city.

---

## 4. Ongoing rules for whoever edits the site

- Only edit content in `site.config.json`, `content/pieces.json` and `content/events.json`. Run `npm run build` to check for warnings.
- Every piece needs real alt text, a real photo and true facts. Don't guess a fabric, year or origin.
- No reviews or testimonials unless real and permitted.
- No new third-party scripts, fonts, embeds or pixels without updating the Cookie and Privacy policies first. The Content-Security-Policy will block them anyway until `netlify.toml` is changed.
- Update `policiesEffectiveDate` whenever a policy changes.
