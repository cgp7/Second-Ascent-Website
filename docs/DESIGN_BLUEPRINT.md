

# Second Ascent Website Design Blueprint
 · 
A design concept, layout architecture, and build spec for the Second Ascent storefront, written so it can be handed to Claude Code as the source of truth for a repo.

## 1. Brief
Second Ascent is a Salt Lake City, Utah brand selling upcycled custom flannels that combine graphic tee elements with vintage flannel. It sells pre-made pieces and takes commissions. The store is tiny (fewer than 10 products), so the site treats scarcity as curation, not a gap.
 | 
Item | 
Decision
 | 
Platform | 
Shopify (Online Store 2.0), custom theme code in a repo
 | 
Entry experience | 
A plaid flannel panel with two buttons and the SECOND ASCENT wordmark across the placket; it unbuttons and splits to reveal the homepage
 | 
Homepage | 
The homepage is the shop: a continuous lookbook where products are bought inline
 | 
Required pages | 
Commissions, About
 | 
Navigation extras | 
A "where to find us next" site map and a list of available items
 | 
Signature element | 
Every icon, header marker, and bullet is a flannel button
 | 
Brand lockup | 
Mountain-and-sun icon, SECOND ASCENT wordmark, tagline "Utah's very own", descriptor "Upcycled apparel"
 | 
Tone of voice | 
Not yet defined; a starting proposal is in section 2
The bigger picture: this is a luxury-feeling, small-batch label with a dusty desert-and-peaks personality, not an outdoor-gear mega retailer. Every choice below pushes away from grids, filters, and mega menus.

## 2. Brand concept
The concept in one line: a luxury lookbook printed on a worn-in flannel, shot in the Utah desert. Three inspirations each contribute one rule, and the plaid contributes the material.
 | 
Inspiration | 
What we take | 
Rule for the build
 | 
Moncler | 
Editorial pace, huge negative space, horizontal flow | 
One product per full-screen frame; at least 40% of every frame stays empty; nothing competes with the garment
 | 
Brain Dead | 
Asymmetric columns, unexpected layout shifts, zine energy | 
Break the grid on purpose: offset frames, overlapping captions, one rotated or cropped element per section
 | 
Patagonia / gorpcore | 
Material storytelling, raw texture, nature | 
Each piece gets its origin story (what shirt it was, what graphic was added, where the cloth came from)
 | 
Second Ascent itself | 
Upcycling, Utah, handmade | 
The brand is the second life of a garment, so the story is "made again"

### Scarcity as curation
With fewer than 10 products, never show an empty-looking catalog. Name it instead.

Frame the line as a numbered edition: "No. 01 of 07 pieces in this drop."

Each piece is one of one. Show "Only one exists" on the product, and when it sells, turn the frame into an archive entry ("Found a new home").

Never use discount banners, "low stock" red warnings, or countdown timers. Quiet confidence is the luxury signal.

### The flannel button motif
A four-hole button replaces every bullet, icon, list marker, and header ornament. It is the brand's one repeating graphic, so it must be consistent: a single SVG, a few sizes, subtle drop shadow, and a slight rotation variation so no two feel stamped. Details are in section 6.

### Proposed tone of voice (to react to)
Tone is blank in the intake, so this is a starting point to edit: rugged but warm, dry-humored, craft-obsessed. Short sentences. Names the shirt's past life. Never outdoor-bro.

Product line example: "Started as a 1994 workwear flannel. Now it's got a story on the back."

Button label examples: "Add to bag" not "Buy now"; "Ask about a commission" not "Submit".

Avoid: hype words ("epic", "must-have"), exclamation points, and fake urgency.

## 3. The opening: a flannel that unbuttons
The first screen is a full-viewport plaid flannel placket. Two buttons sit on it, the SECOND ASCENT wordmark is embossed across the seam, and the shirt opens to reveal the homepage underneath. The reference comp is the Photoshop file you shared: navy, crimson, and mustard plaid with a torn vertical gap, two cream buttons, and a tan embossed lockup.

### How the comp is built into layers
 | 
Layer (back to front) | 
What it is | 
Notes
 | 
0. Homepage | 
The real first lookbook frame, already rendered under the overlay | 
Must exist in the DOM, set inert while the overlay is up so keyboards and screen readers skip it
 | 
1. Seam shadow | 
Dark gradient strip down the center | 
Fades in as the halves part; gives depth
 | 
2. Left half | 
Plaid with the left part of the wordmark ("SE" and "AS") baked in | 
WebP, cut along the torn seam
 | 
3. Right half | 
Plaid with the right part of the wordmark ("COND" and "CENT") baked in | 
WebP, same height, seam edge matches layer 2
 | 
4. Buttons | 
Two separate button sprites, one above the wordmark and one below | 
Separate so they can be pressed, popped, and fall away independently
 | 
5. Skip control | 
Small mono text link, "Skip intro" | 
First in tab order, always visible
The wordmark is cut across the seam so the word physically tears apart as the shirt opens. That is the whole trick, so the seam edge must be a clean match between the two halves.

### Sequence (about 2.2 seconds after the visitor acts)

Load: show a static first frame of the closed shirt immediately (no spinner), while the halves and homepage preload.

Prompt: after a short beat, the lower button gently pulses with a small mono caption, "Unbutton to enter".

Action: tap, click, Enter, or Space on a button (drag is optional). If nobody acts within 3 seconds, it plays itself.

Buttons: the lower button pops free first, then the upper one, each with a tiny rotation and a soft thread-snap sound (sound off by default; see Open questions).

Parting: the halves slide out to the left and right with a slight outward tilt, easing out, while the seam shadow fades in and the homepage is revealed behind.

Handoff: the overlay is removed from the page, scroll unlocks, focus moves to the homepage's first heading.

### Rules that keep it special instead of annoying

Skip control: always visible, keyboard reachable.

Returning visitors: show the full sequence on first visit, a shortened 0.8 second version for repeat visits, and skip it on internal page navigation (remembered with browser storage for a set period).

Reduced motion: if the visitor's system asks for reduced motion, replace the sequence with a simple fade; never play the full tear.

Performance: animate only transform and opacity; keep each half under about 300 KB as WebP; provide a portrait crop for phones because the halves part horizontally and the buttons need to stay thumb-sized.

Search and accessibility: homepage content stays in the page markup under the overlay, so search engines and screen readers still get it.

Shopify editor: turn the intro off inside the theme editor so edits are not blocked.

Fallback: if the images fail to load, skip straight to the homepage.

## 4. Architecture and navigation
The store has one real page, the homepage, plus a handful of story pages. There is no collection grid, no category menu, no filters, and no search bar (with fewer than 10 products, search signals a retailer).

### Header
A slim, transparent header that sits over the imagery: the mountain icon at left, three mono links at right, and a bag counter.

Collection: jumps to the lookbook on the homepage.

Commissions: the custom-order page.

About: the story and the maker.

Bag (0): opens a side drawer, never a separate cart page.

Hamburger (all screen sizes optional, default on mobile): opens a full-screen flannel-textured menu with every page: Collection, Material origin, Commissions, Archive, About, Where to find us, Contact. Menu items use the flannel button as the bullet.

### Homepage order (it is the shop)
 | 
# | 
Section | 
Job | 
Layout style
 | 
0 | 
Unbuttoning opening | 
First impression | 
Full-screen overlay (section 3)
 | 
1 | 
Statement frame | 
One line of brand voice with the lockup | 
Centered, 70% empty space
 | 
2 | 
The Collection | 
Each piece full-screen, bought inline | 
Horizontal editorial scroll
 | 
3 | 
The Cloth (material origin) | 
Story of upcycling, fabrics, graphics | 
Asymmetric material deep-dive
 | 
4 | 
Commission teaser | 
Invite custom work | 
Split frame, photo and short text
 | 
5 | 
Where to find us next | 
Upcoming markets and pop-ups, plus an online-only note | 
Large mono list with a map link
 | 
6 | 
Archive teaser | 
Sold pieces as proof of demand | 
Small offset thumbnails
 | 
7 | 
Footer site map | 
Full page list, social, email signup | 
Minimal, button bullets

### Where to find us next
The booth photo (a vintage trailer, a rack of flannels, and a hand-painted sign) shows Second Ascent sells at markets and pop-ups. Treat "where to find us next" as a living list of upcoming dates and places, with the most recent past stops greyed below it. The footer site map is separate and simply lists the pages.

### Available items
The Collection section is the available-items list. A small mono counter at the top of the homepage reads, for example, "7 pieces available, 3 in the archive", which doubles as the scarcity message.

## 5. Layout blueprint
Blend both layouts, each doing the job it is best at. The horizontal editorial scroll sells the products. The asymmetric deep-dive tells the material story. Never put the buy button inside the zine-style section, because shoppers need calm to commit.

### Shared grid and spacing
 | 
Token | 
Value | 
Use
 | 
Columns | 
12 on desktop, 4 on mobile | 
All sections
 | 
Outer margin | 
4vw desktop, 20px mobile | 
Page edges
 | 
Spacing scale | 
8, 16, 24, 40, 64, 104, 168 px | 
Every gap; no other values
 | 
Frame height | 
100svh | 
Collection frames
 | 
Minimum empty space | 
40% of each frame | 
Collection frames
 | 
Section gap | 
30vh minimum | 
Between deep-dive blocks

### Layout A: horizontal editorial scroll (the Collection)

Structure: each piece is one frame, 100vw by 100svh, laid out left to right like magazine spreads. Desktop: vertical scrolling drives horizontal movement while the section is pinned. Mobile: native horizontal swipe with snap points.

Frame anatomy: a large photo takes 7 columns, alternating left and right from frame to frame. The text block takes 3 to 4 columns on the opposite side, dropped about 18vh from the top.

Contents of a text block: edition number in mono ("No. 03 / 07"), the piece's name in an oversized serif, a two-line material story, size options, price, and the Add to Bag control (section 6).

Between frames: a deliberate gap of 8vw with a tiny mono caption, so the eye rests.

Progress: a vertical column of flannel buttons on the right edge, one per piece. The current piece's button is fastened (filled); the others are unfastened (outlined).

Scarcity moment: the last frame is an end-card: "That's all of it for this drop." with the email signup and the Archive link.

### Layout B: asymmetric material deep-dive (The Cloth)

Structure: a vertical sequence of 4 to 5 blocks, each 140 to 200vh tall, that deliberately breaks the grid.

Giant macro frame: an extreme close-up of weave, a button, or a stitched graphic bleeding off the left edge across 7 to 8 columns, cropped by the screen.

Overlapping text: an oversized serif phrase crosses the image edge, using a blend mode so it stays legible over both photo and background.

Intentional gaps: after each macro frame, at least 30vh of empty bone-colored space with one mono caption floating off-center.

Small detail frames: 2 to 3 smaller product or process shots (20 to 30% width) placed off-center on the right at uneven heights; one is rotated by about 2 degrees.

Parallax: large images move slower than small ones (roughly 0.85x versus 1.15x) to create a layered, zine-like feel, and are disabled for reduced motion.

Rules: no two consecutive elements share a left edge; no more than two type sizes per block; every block ends on empty space.

### Mobile
The Collection stays a horizontal swipe, because it already works one-handed. The deep-dive collapses to one column with alternating indents (0, 12vw, 4vw) and shorter gaps (about 16vh), keeping the macro crops and the rotated frame.

## 6. UI and UX style guide

### Typography
The logo already pairs a chamfered block face with a spaced monospace for the tagline, so the system builds on that: logo stays as supplied artwork, an oversized serif carries the editorial voice, and mono carries labels and data.
 | 
Role | 
Spec | 
Free font candidates
 | 
Logo and wordmark | 
Use supplied vector artwork only; never retype it | 
n/a
 | 
Display serif | 
clamp(64px, 11vw, 190px), tight leading (0.9), tight tracking (-0.02em), sentence case | 
Fraunces, Instrument Serif
 | 
Body | 
17 to 19px serif or humanist, line length 55 to 65 characters | 
Newsreader
 | 
Labels and metadata | 
Mono, 11 to 13px, uppercase, wide tracking (0.18em), matches "UTAH'S VERY OWN" in the logo | 
DM Mono, JetBrains Mono
 | 
Prices and edition numbers | 
Mono, tabular figures | 
same as labels

### Color
Pulled from the plaid comp and the desert photography. The first five are sampled or eyedropped from your art and should be confirmed against the original files.
 | 
Name | 
Hex | 
Use
 | 
Midnight plaid | 
#0F1320 | 
Dark section backgrounds, intro vignette
 | 
Navy twill | 
#1C2133 | 
Cards, drawers, header over dark
 | 
Bone | 
#D1CBC3 | 
Main light background (never pure white)
 | 
Button cream | 
#DBDEDC | 
Flannel button face, light text on dark
 | 
Crimson thread | 
#B02A3A (approximate) | 
Accent lines, sold-out and hover states, sparingly
 | 
Mustard thread | 
#D6B23C (approximate) | 
Tiny highlights only, such as a focus ring
 | 
Embossed tan | 
#C9B99A (approximate) | 
Wordmark emboss, captions on dark
 | 
Red rock | 
#703822 | 
Warm photo overlays, rare accent blocks
 | 
Desert sky | 
#9CB1B6 | 
Cool contrast in lookbook backgrounds
Contrast: body text must meet WCAG AA (4.5:1). Crimson and mustard are accents, never body text on dark navy without checking.

### Photography art direction
Move away from white-background studio shots. Everything should look like it was found, not staged.

Light: hard natural light, long shadows, golden or blue hour, no flash fill.

Contrast: deep shadows, slightly lifted blacks, warm highlights; grade toward the red rock and navy palette.

Scale: the tiny hiker under the giant arch is the visual idea for the "ascent": a small person, huge landscape.

Textile macros: extreme close-ups of weave, a stitched graphic, a horn button, the frayed edge. Use these as the giant frames in the deep-dive.

Documentary: real market photos (the trailer booth, the painted wood sign) belong on About and Where to find us.

Avoid: studio sweeps, floating products, smiling-at-camera catalog poses, stock hikers with summit-flag shots.

Treatment of the uploaded images: the arch, the stacked grey flannels, the macro button close-up, and the buffalo-check-on-a-ladder shot all fit as placeholders. The woman in the pale green plaid is too soft and pastel; replace it with something moodier.

### The flannel button, as a component

One SVG of a four-hole button in two sizes (14px for bullets, 36px for decorative and controls) plus a larger 72px version for the menu and intro.

Face color is button cream; give it a subtle inner highlight and a 1px soft shadow; hole threads in crimson or navy.

Rotate each instance by a fixed random angle (0, 15, 30, 45 degrees) so they feel hand-sewn.

Used as: list bullets, section markers, icons (cart, menu, close), progress dots, and focus indicator.

Never animate a button that is only decoration; only controls move.

Icons inside buttons: put a tiny mono glyph in the center instead of holes only where the button is a control (for example a bag count).

### Product presentation and Add to Bag
No traditional product cards. A piece shows only image, name, edition number, and a small mono "Details" line until the visitor interacts.

Reveal: hover on desktop, tap on mobile, or Enter on keyboard opens a drawer sliding up from the bottom of the frame (navy twill background, 380px wide on desktop, full width on mobile).

Drawer contents: size options as mono chips, measurements in plain words, price, the story, shipping line, and the Add to Bag control.

Add to Bag control: a button on a stitched track. The visitor slides the button across and it snaps into a buttonhole to confirm. Provide a tap or Enter alternative so dragging is never the only way (an accessibility requirement), and an Undo for 5 seconds.

No quantity selector: every piece is one of one, so the bag simply holds the piece. If it is already in the bag the control says "In your bag".

Bag: a right-side drawer with the pieces, subtotal, shipping note, and the checkout button; Shopify handles checkout itself.

Sold state: the frame stays, desaturated, with "Found a new home" and a link to Archive.

## 7. Other pages
Each page inherits the header, button motif, and typography above. Details marked as placeholders have not been decided by the owner yet.

### Commissions
A calm, single-column page with a short story intro, how it works, and a request form. Show two or three past commissions as large editorial frames above the form.

Tell us the idea: form asks for the concept, the graphic or reference images, size, and deadline.

Pick the shirt: choose from the available flannels, or send one of your own to upcycle (placeholder).

Sketch and approve: a mockup is sent for approval (revisions to be defined).

Made and shipped: turnaround time and deposit terms stated in plain words (placeholders).
Form fields: name, email, concept (long text), reference uploads, shirt preference, size, budget range, event or deadline. Confirmation message and an auto-reply promise a response window.

### About
The story of the brand, the maker, and the second-life idea. Lead with the booth photo or a portrait of the maker, then a short founding story, then "how a flannel is remade" in three images. Close with the Utah connection and a link to Where to find us. The hand-painted wood sign from the booth makes a strong pull-quote background.

### Archive
A quiet gallery of sold pieces, shown in a loose offset layout with small mono captions (name, year, edition number). It does double duty as proof of demand and as a catalog of past commissions. Each entry has a "Commission something like this" link.

### Where to find us next
A full-width list of upcoming markets and pop-ups: date, name, city, and a map link in mono type, with a status marker (confirmed or tentative). Past dates fade below. Include an email signup so people hear about the next one.

### Contact, policies, and edge pages

Contact: one email address and the social links; no standalone form unless commissions need it.

Shipping and returns, privacy, terms: use Shopify's policy pages, styled to match, with the button bullet.

404 page: the shirt with one button missing and the line "Looks like something came undone." with a link home.

Sold-out and error states reuse the same voice.

## 8. Shopify implementation
Recommendation: build a custom theme in a repo, starting from a free Horizon-family theme (Heritage), and write the intro, horizontal collection, button motif, and Add to Bag slider as custom sections. That gets the editor-friendly blocks for the story pages without fighting a theme that assumes a product grid.

### Theme options (verify in the Shopify Theme Store before committing)
Theme details below come from third-party reviews and should be confirmed against the Theme Store listings.
 | 
Theme | 
Cost | 
Why it fits | 
Watch out for
 | 

Heritage (Horizon family) | 
Free | 
Described as asymmetric, editorial pacing for craft and legacy brands; supports Horizon's deeply nested blocks for complex layouts | 
Horizon has no built-in horizontal-scroll product row in every context, so Layout A needs custom code
 | 
Atelier (Horizon family) | 
Free | 
Spacious, magazine-style layouts with large media banners | 
More polished-luxury than rugged; needs texture added
 | 

Baseline (by Switch) | 
Paid | 
Brutalist, type-forward, whitespace-heavy; strong speed scores in third-party tracking | 
Brutalist look may fight the warm flannel texture; paid
 | 
Studio | 
Free | 
Bold typography, asymmetric layouts, generous whitespace | 
Less storytelling structure; likely needs more custom work
Warning from the same reviews: switching theme families later resets the homepage and means rebuilding it, so choose the base once.

### Bypassing the product grid
 | 
Need | 
Native Shopify piece | 
How to use it
 | 
Statement frame | 
Rich text | 
Centered lockup and one line, lots of padding
 | 
Each product frame | 
Custom section bound to a product (a product picker in the section settings) | 
One section per piece, ordered in the editor; never use "Featured collection" or a collection list
 | 
Material deep-dive | 
Image with text, plus custom block positioning | 
Uneven column widths, large images, empty spacer blocks
 | 
Story or process video | 
Video section | 
Silent looping macro of weaving or stitching
 | 
Commission teaser | 
Image with text | 
Link to the Commissions page
 | 
Archive | 
Custom section that loops sold products | 
Lists items that are unavailable, or a collection tagged archive
 | 
Bag | 
Cart drawer | 
Replace the cart page with a drawer fed by Shopify's cart add endpoint

### Store setup for one-of-one pieces

Set stock to 1 per size and turn off "continue selling when out of stock", so sold pieces flip to a sold state automatically.

Keep sold products published (do not delete them) so they feed the Archive and keep their search value.

Remove the quantity selector and show an edition number from a product metafield.

Redirect the built-in all-products URL to the homepage collection section. Shopify's admin redirects may not override built-in collection URLs, so do this in theme code and verify it.

Commission form: Shopify's basic contact form does not take file uploads. Use Shopify's own Forms app or a third-party form app (confirm file-upload support), or ask for reference links.

### Development approach

Use a Shopify development store and the Shopify command line tool to run the theme locally and push to an unpublished theme for review.

Keep the repo in Git so every change is tracked, with a main branch that deploys to the live theme only after a preview check.

Keep custom code in clearly named files (intro, lookbook, button sprite, add-to-bag slider) so a Horizon-family update does not overwrite it.

## 9. Repo blueprint and Claude Code prompt
To use this: export this doc as Markdown, save it in the new repo as docs/DESIGN_BLUEPRINT.md, drop your image files into assets-source/, then paste the prompt below into Claude Code.

### Proposed repo structure (a Shopify theme)

### Build phases, each with a done check
 | 
Phase | 
Build | 
Done when
 | 
1 | 
Scaffold from the chosen base theme, design tokens, fonts, button SVG, logo files | 
Theme runs locally and tokens render
 | 
2 | 
Intro-flannel section: layers, press-to-unbutton, parting animation, skip, returning visitor and reduced-motion handling | 
Works on desktop and phone; Skip and keyboard work; homepage is inert while it is up
 | 
3 | 
Header, hamburger menu, footer site map | 
Three-link header; menu items use button bullets
 | 
4 | 
Lookbook track and frame sections bound to products | 
Horizontal scroll desktop and swipe mobile; progress buttons; 100svh frames
 | 
5 | 
Product drawer and Add to Bag slider, bag drawer | 
Adds to cart through Shopify; tap alternative exists; sold state works
 | 
6 | 
Cloth deep-dive, commission teaser, find-us-next, archive teaser | 
Asymmetric layout rules from section 5 met
 | 
7 | 
Commissions, About, Archive, Find us pages, 404 | 
All pages editable in the theme editor
 | 
8 | 
QA | 
Lighthouse performance 90 or higher on mobile for the homepage with the intro; WCAG AA contrast; keyboard-only run-through; reduced motion tested

### Prompt to paste into Claude Code
CLAUDE.md should repeat the rules above so every future session follows them.

## 10. Asset inventory and open questions

### What was supplied, and what each is for
 | 
File | 
What it is | 
Use | 
Gap
 | 
Asset_1.png (883 x 675) | 
Full lockup in white: "Utah's", mountain icon, "Very own", SECOND ASCENT, rule, "Upcycled apparel" | 
Intro, About, footer | 
White only; needs a dark version for bone backgrounds, and a vector (SVG)
 | 
Asset_2.png (255 x 367) | 
Mountain and sun icon in white | 
Header mark, favicon, loading mark | 
Needs vector and a dark version
 | 
Asset_3.png (883 x 321) | 
SECOND ASCENT wordmark in white | 
Compact header and drawers | 
Same as above
 | 
Photoshop screenshot | 
The intro comp: plaid, two buttons, torn seam, embossed lockup | 
Reference for the intro | 
The two cut halves and separate button images were not in the upload
 | 
Booth photo | 
Trailer, flannel rack, hand-painted sign | 
About, Where to find us | 
Portrait crop needed; the file includes black bars
 | 
Arch, buffalo check, stacked flannels, macro button, others (Unsplash) | 
Mood and placeholder photography | 
Lookbook and deep-dive placeholders | 
Replace with Second Ascent's own product photography before launch
Note: the six lifestyle images are from Unsplash, which has its own license terms, so confirm usage before launch or swap in original photos.

### Open questions

Flannel art: please upload the left half, right half, and each button as separate transparent images (or the layered file), plus a taller mobile version.

Sound: should the button pop make a sound, off by default? A soft thread snap is nice but optional.

"Where can you find us next": is this upcoming market dates, or only a site map of pages? The blueprint assumes both.

Products: how many pieces at launch, price range, sizes, and edition numbering?

Commissions: process, deposit, turnaround, revisions, and starting price.

Tone of voice: react to the proposed "rugged, warm, dry-humored, craft-obsessed".

Logo files: originals as vector, with the display font name if it is a licensed typeface.

Business setup: domain, shipping rates and regions, return policy, and email platform for signups.

Photography: who will shoot the real product images, and can the buffalo-check and macro styles be matched?

### Sources
Theme information was cross-checked against these third-party reviews; confirm in the Theme Store.

Craftshift: Shopify Horizon customization guide 2026

Shrine: Horizon vs Dawn 2026

Shop Theme Detector: Baseline review

Qualimero: best Shopify themes in 2026