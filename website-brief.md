# Valley Agriculture — Website Brief

**Client:** Valley Agricultural Tractors & Machinery Trading W.L.L. (Bahrain)
**Current site:** https://www.valleyagrotrading.com/ (Wix, 3 pages, being replaced)
**References:** https://oad1868.com/ (editorial heritage look), https://www.tolix.com/ (large logo that collapses into the nav on scroll)
**Status:** Ideation complete, ready for implementation (see `implementation-plan.md`)

---

## 1. Purpose of the website

Valley Agriculture trades high-quality tractors and agricultural machinery in Bahrain, serving **farmers, contractors and agribusinesses**. The current site has a single paragraph of copy, four category descriptions and empty product pages, so it neither shows the stock nor turns visits into enquiries.

The new site should:

1. **Generate enquiries.** Every page leads to a quote request, with WhatsApp and phone as instant alternatives. This is the main business goal.
2. **Show the tractor range.** Present tractors as the main line, model by model, with photos, key specs and brochures, so buyers arrive at a conversation already informed.
3. **Build trust.** A premium, established look (inspired by OAD's heritage storytelling) that sets Valley apart from typical classified-style machinery dealers in the region.
4. **Sell after-sales.** Consultation, installation, maintenance and after-sales support are a reason to buy from Valley rather than import directly.
5. **Serve both languages.** Full English and Arabic (RTL) for the local market.

### Primary audiences
| Audience | What they need |
|---|---|
| Farm owners / agribusinesses | Find the right tractor, see it's in stock, get a price quickly |
| Contractors | Heavy-duty models, availability, after-sales support |
| Government / institutional buyers | Credibility, company details, formal quote request |

### Conversion actions (in order of priority)
1. **Request a Quote** form (pre-filled with the model or category when opened from a product)
2. **WhatsApp** floating button plus inline buttons (pre-filled message with the model name)
3. **Call** `+973 37679169` (click-to-call on mobile)
4. **Email** `info@valleyagrotrading.com`

### Contact details (confirmed)
| Channel | Value | Link |
|---|---|---|
| Email | info@valleyagrotrading.com | `mailto:info@valleyagrotrading.com` |
| Phone | +973 37679169 | `tel:+97337679169` |
| WhatsApp | +973 37679169 (same number, assumed) | `https://wa.me/97337679169` |

These are the only contact details shown on the site. Address, map and opening hours are left out until the client provides them.

---

## 2. Product scope

**Tractors are the main line**; the other lines are secondary.

| Line | Treatment | Old-site URL |
|---|---|---|
| **Tractors** | Primary. Category page plus individual model pages | `/portfolio-collections/portfolio/tractors-more` |
| Irrigation Pivots | Secondary category page (description, gallery, enquire) with optional models | `/portfolio-collections/portfolio/irrigation-pivots` |
| Irrigation Automation | Secondary category page | `/portfolio-collections/portfolio/irrigation-automation` |
| Bale Handling Equipment | Secondary category page (bale grabs, loaders, wrappers, transport) | `/portfolio-collections/portfolio/bale-handling-equipment` |

**Brands:** left out for now. There is no brand strip, brand filter or brand field. Machines are presented by type and spec. Brands can be added later as a CMS field without redesigning anything.

**Photography:** mainly manufacturer stock imagery. See the art direction in §3.6 for making it look consistent.

---

## 3. Design system

### 3.1 Direction: "Heritage editorial"
A premium, calm and confident look with plenty of space, built on **OAD1868**'s editorial structure:
- a serif display font for headlines, a clean grotesk sans for body text and a mono font for small labels
- full-bleed photography with large overlaid type
- alternating text blocks, 50/50 story sections and dark full-width bands

Combined with **Tolix**'s header behaviour and tile layout:
- **a large logo that collapses into the nav bar on scroll** (signature interaction, see §4.1)
- a three-tile image grid for categories
- a clean four-column footer with contact and visit details, and a language switch in the header

The result should feel like an established, high-end dealer, not a classifieds site.

### 3.2 Colour

Taken from the logo: the green wordmark/tractor and the red arc. **Green is the primary colour (including all CTAs), and red is an accent only**, used in small, deliberate touches that echo the logo's arc. Earthy neutrals replace OAD's "wood" and "mist" tones.

> The logo green (`#28783B`) and red (`#FE2B2B`) were sampled from the logo PNG and are the values used in `brand/logo/*.svg`. The other shades are derived from them.

| Token | Hex | Use |
|---|---|---|
| `green-900` | `#163F1E` | Dark bands, footer background (replaces OAD "wood") |
| `green-700` | `#1F5E2A` | **Primary CTA buttons**, headings on light backgrounds, nav text when scrolled |
| `green-800` | `#184A21` | CTA hover/pressed |
| `green-500` | `#28783B` | Logo green: links, icons, secondary button outlines |
| `green-100` | `#E4EFE2` | Tinted panels, spec-table stripes |
| `red-600` | `#FE2B2B` | Logo red, **accent only**: arc motif, eyebrow dash, active/hover underline, small status dots |
| `red-50` | `#FBEAEA` | Form error backgrounds |
| `sand-50` | `#FAF7F1` | Default page background (warm off-white) |
| `sand-200` | `#EDE6D8` | Alternate section background (replaces OAD "mist") |
| `soil-900` | `#221D19` | Body text |
| `soil-600` | `#5C534B` | Secondary text, captions |
| `line` | `#D9D1C3` | Hairlines, card borders |

**Where red is used (accent only)**
- **Arc motif:** the red arc above the tractor in the logo becomes a graphic device. It appears as a thin red arc or dash before eyebrow labels, a large faint arc behind the hero headline, and the scroll-progress indicator.
- **Small highlights:** the underline on the active nav item and on link hover, the active language toggle, and a small dot on status labels (`● IN STOCK`).
- **Not used for:** buttons, section backgrounds, large text or icons. CTAs are solid `green-700`, and the WhatsApp button uses green as well.
- **Rule of thumb:** no more than about 5% of any screen is red. It should read as the logo's signature, not a second brand colour.

Contrast: white on `green-700` passes WCAG AA for button text. Red is used decoratively, so it doesn't need to meet text contrast; where red text is used (for example form errors), use `red-700 #A81B21` on light backgrounds.

### 3.3 Typography

Chosen to match OAD's three-font system (serif display, grotesk text, mono labels) with free Google Fonts that also have good Arabic partners.

| Role | English | Arabic | Notes |
|---|---|---|---|
| Display / headlines | **Hanken Grotesk** (500, tight tracking) | **IBM Plex Sans Arabic** (600) | Simple sans, replacing the earlier serif at the client's request |
| Body / UI | **Hanken Grotesk** | **IBM Plex Sans Arabic** | Close to OAD's Founders Grotesk |
| Labels / specs | **IBM Plex Mono** (uppercase, tracked +8%) | **IBM Plex Sans Arabic** (medium, no tracking) | Eyebrows, spec values, prices, tags |

**Type scale** (fluid, using `clamp()`)
| Token | Size (mobile → desktop) | Use |
|---|---|---|
| `display-xl` | 48 → 120px | Hero headline |
| `display-l` | 40 → 80px | Page titles |
| `display-m` | 32 → 56px | Section headlines |
| `heading` | 22 → 28px | Card titles, sub-sections |
| `body-l` | 18 → 21px | Intro/statement paragraphs (OAD-style text blocks) |
| `body` | 16 → 17px | Default |
| `label` | 11 → 12px mono caps | Eyebrows, tags, specs labels |

### 3.4 Layout and spacing
- 12-column grid, max width 1440px, outer gutter 16px (mobile) → 48px (desktop)
- Generous vertical rhythm with section padding of 80 → 160px (OAD's "Spacer" sections)
- Square or near-square corners (0–4px radius) for an editorial, industrial feel. Buttons are rectangular, not pills.
- 1px `line` hairlines to separate content, used instead of shadows
- **RTL:** use logical CSS properties only (`ms-`, `me-`, `ps-`, `start`, `end`) so Arabic mirrors without extra work. Directional icons (arrows) flip; the logo and photos do not.

### 3.5 Components (core set)
| Component | Notes |
|---|---|
| **Header** | Large → compact logo on scroll (§4.1), nav, EN/AR switch, "Request a Quote" button |
| **Mega menu (Products)** | Tolix-style: category list with model thumbnails |
| **Button** | `primary` (solid green-700), `secondary` (green outline), `ghost` (text + arrow, red underline on hover), `whatsapp` (green, WA icon) |
| **Eyebrow label** | Mono caps with a short red arc or dash before it |
| **Hero** | Full-bleed image or video, overlaid display type, eyebrow, two CTAs |
| **Statement block** | Centred `body-l` paragraph, OAD "PageHeader" style |
| **Product card** | Image on sand background, model name (serif), 2–3 key specs (mono: HP, drive, weight), "Enquire" link |
| **Category tile** | Tall image, label, "Discover" link, with a slow zoom on hover (Tolix tiles) |
| **50/50 block** | Image one side, story text the other, alternating sides |
| **Spec table** | Two-column, mono values, striped `green-100` |
| **Dark band** | `green-900` background with sand text, used for the CTA band (replaces OAD's newsletter band) |
| **Quote form** | Name, company, phone (BH format), email, product (pre-filled), message; green submit button |
| **WhatsApp float** | Bottom corner (bottom-left in RTL), pre-filled message per page |
| **Footer** | 3 columns: Products · Company · Contact (email, phone, WhatsApp), plus language switch and legal links. A fourth "Visit Us" column is added if an address is supplied |

### 3.6 Imagery art direction
The photos are mainly manufacturer stock, so consistency comes from treatment rather than the shoot:
- **Product cut-outs** on a flat `sand-200` background for every product card. This is the single biggest consistency lever.
- **Hero and story images:** wide field and landscape shots. Choose warm, low-sun images and avoid heavily branded studio shots for heroes.
- Apply a light, consistent colour grade (slightly warm, lower saturation) to large images.
- Use local context wherever possible: Bahrain farms, date palms, the yard or showroom, deliveries. Even a few phone photos of real Valley deliveries help trust.
- Never stretch or crop machines awkwardly. Use a fixed 4:3 ratio for cards, 16:9 or full-bleed for heroes, and 3:4 for tiles.

### 3.7 Motion
Subtle and slow, in OAD's calm editorial style:
- Header logo collapse (scroll-linked, §4.1)
- Fade-and-rise reveals on sections (respect `prefers-reduced-motion`)
- Slow 1.05× image zoom on tile hover
- The red arc draws itself (SVG stroke) under section eyebrows when they enter the viewport
- No carousels with autoplay faster than 6s, and no parallax on mobile

### 3.8 Voice and tone
Confident, plain-spoken, expert, written for people who run farms. Short sentences and concrete specs, with no hype.

**Arabic:** Modern Standard Arabic (فصحى), formal but warm, with correct grammar. It is adapted for meaning rather than translated word for word. All site copy in both languages is in [`content/copy-en-ar.md`](content/copy-en-ar.md). Western digits (0–9) are used for specs, prices and phone numbers in both languages.

### 3.9 Logo files
Rebuilt as SVG from the supplied PNG and saved in `brand/logo/`:

| File | Use |
|---|---|
| `valley-logo.svg` | Full lockup (icon + VALLEY + tagline). Large header state, footer, documents |
| `valley-logo-compact.svg` | Icon + VALLEY. Collapsed nav state, mobile header |
| `valley-icon.svg` | Icon only. Favicon, app icon, social avatar, loader |
| `valley-logo-reversed.svg` | Sand tractor and text with a red arc, for `green-900` and other dark backgrounds |
| `valley-logo-original.png` | The source PNG, for reference |
| `preview.html` | Side-by-side check of all versions |

How they were made:
- **"VALLEY"** is set in **Barlow Condensed Bold**, which matches the original letter widths to within about 1 px. Each letter is placed at its original position and converted to outlines.
- **The tagline** is set in **Barlow Condensed SemiBold**, converted to outlines and sized to the original width.
- **The tractor and red arc** are auto-traced from the PNG, using an 8×–10× upscale and separate green and red masks.
- **Limitation:** the source PNG is only 112 px wide at the icon, so fine tractor detail (grille lines, tyre treads) is simplified. It looks right at nav and header sizes. For very large uses such as signage or a full-width hero, ask the original designer for the vector file.
- The original's white disc behind the tractor is left out, so the icon sits directly on the sand background.

---

## 4. Signature interactions

### 4.1 Large logo → nav (from Tolix)
- **At the top of the page:** the full logo lockup (tractor, red arc, "VALLEY", tagline) sits large across the top of the hero, about 40–60% of viewport width on desktop.
- **On scroll (first ~200px):** the logo scales down and moves into the sticky nav bar, the tagline fades out, and only the **tractor icon and "VALLEY"** remain. The nav background goes from transparent to `sand-50` with a hairline.
- **On mobile:** the effect is smaller (full lockup about 80% width → compact). The hamburger menu opens a full-screen sheet in `green-900`.
- **On inner pages:** start in the compact state, or optionally use a shorter version of the effect.
- **Logo files:** `brand/logo/` (see §3.9). The SVGs have separate parts with ids: `#icon` › `#arc` + `#tractor`, `#wordmark`, `#tagline`. That allows the tagline to fade out and the logo to scale with CSS or Motion, with no image swapping.

### 4.2 WhatsApp everywhere
A floating button, and on each model page a WhatsApp button with a pre-filled message: *"Hello Valley, I'm interested in the [Model name]. Please send me a quote."*

---

## 5. Sitemap

All pages exist in `/en/…` and `/ar/…`.

```
/                         Home
/about                    About Valley
/products                 Products overview
/products/tractors        Tractors (model listing)
/products/tractors/[slug] Tractor model detail
/products/[category]      Secondary categories: irrigation-pivots, irrigation-automation, bale-handling
/services                 Services & after-sales
/contact                  Contact + Request a Quote (accepts ?product= prefill)
/privacy                  Privacy policy
```

Possible later additions, not in scope now: Projects/case studies, News, Financing.

---

## 6. Page-by-page sections

### 6.1 Home
| # | Section | Reference | Content |
|---|---|---|---|
| 1 | **Header**: large logo → compact nav | Tolix | Nav: Products · Services · About · Contact · EN/AR · [Request a Quote] |
| 2 | **Hero**: full-bleed tractor-in-field image, faint red arc behind the headline | OAD hero | Eyebrow `TRACTORS & MACHINERY · BAHRAIN`; Headline e.g. *"Built for the work. Backed by Valley."*; CTAs: [Request a Quote] (green) [Chat on WhatsApp] |
| 3 | **Statement block** | OAD PageHeader text | "We trade high-quality tractors and agricultural machinery in Bahrain, supporting farmers, contractors and agribusinesses with reliable, efficient equipment." |
| 4 | **Featured tractors**: horizontal row of 4–6 product cards | OAD "New Arrivals" row | Model, HP, drive, [Enquire]; link "View all tractors →" |
| 5 | **Category tiles**: 3 tiles | Tolix tiles | Tractors (large) · Irrigation · Bale Handling |
| 6 | **50/50 story: Why Valley** | OAD Hero5050 | Expertise, customer-first, end-to-end support (from old About copy) |
| 7 | **Services strip**: 4 items with icons | — | Consultation · Installation · Maintenance · After-sales & parts |
| 8 | **CTA band**: `green-900` | OAD newsletter band | "Looking for the right tractor? Tell us what you need." [Request a Quote] [WhatsApp] [Call] |
| 9 | **Footer** | Tolix footer | Products · Company · Contact (email, phone, WhatsApp) · EN/AR · © |

### 6.2 About
1. Page title with eyebrow `ABOUT VALLEY`
2. Statement block from the old About copy ("We are a leading provider of tractors, irrigation systems and agricultural machinery in Bahrain…")
3. 50/50: our approach ("Driven by expertise and a customer-first approach…")
4. Values / numbers row, e.g. years in business, machines delivered, clients served (`TODO`: client to supply figures; hide if none)
5. Team / yard photo (optional)
6. CTA band

### 6.3 Products overview
1. Page title "A complete range of tractors and agricultural equipment"
2. **Tractors feature block**: large image, intro and [Browse tractors]
3. "Other equipment": three tiles for Irrigation Pivots, Irrigation Automation and Bale Handling
4. CTA band

### 6.4 Tractors (listing)
1. Title + intro (old "Tractors & More" copy)
2. Simple filters: HP range, 2WD/4WD (filters appear only if there are more than 8 models)
3. Product card grid (3 columns desktop, 2 tablet, 1 mobile)
4. "Can't find what you need? We source to order." with [Request a Quote]

### 6.5 Tractor model detail
1. Breadcrumb
2. Gallery (main image + thumbnails) | Model name, eyebrow (`IN STOCK` / `ON ORDER`), short description, key specs, **[Enquire about this model]** (green primary), [WhatsApp], [Download brochure PDF]
3. Full spec table
4. Suitable for: land preparation, planting, hauling and so on (tags)
5. Related models row
6. CTA band

### 6.6 Secondary category (Irrigation Pivots / Irrigation Automation / Bale Handling)
1. Hero image + title + old-site description
2. Key benefits (3–4 points)
3. Gallery or model cards (if any)
4. Enquiry CTA (form pre-filled with the category)

### 6.7 Services
1. Title: "Support from consultation to after-sales"
2. Four service blocks (alternating 50/50): Consultation · Installation · Maintenance · After-sales & spare parts
3. CTA: "Book a service" → contact form with subject pre-set

### 6.8 Contact / Request a Quote
1. Title + short line
2. Split layout: **form** (start side) | **contact card** (end side) with email info@valleyagrotrading.com, phone +973 37679169 and a WhatsApp button. Address, opening hours and map are added only if the client supplies them.
3. Form fields: name*, company, phone*, email, product/category (pre-filled from `?product=`), subject (Quote / Service / General), message*
4. Success state: "Thanks, we'll reply within one working day" plus a WhatsApp link

---

## 7. Content inventory

**Existing (from the old site)**
- Tagline: "Top Tractors & Machinery Trading"
- Company intro paragraph (Home)
- About copy (two paragraphs)
- Product intro: "A Complete Range of Tractors, Irrigation Systems, and Agricultural Equipment"
- Four category descriptions (Irrigation Automation, Bale Handling, Tractors & More, Irrigation Pivots)
- Email info@valleyagrotrading.com and phone +973 37679169

**Needed from the client (`TODO`)**
- [x] ~~Vector logo~~ → traced SVGs in `brand/logo/` (an original vector from the designer would still be sharper, see §3.9)
- [x] ~~Contact details~~ → info@valleyagrotrading.com, +973 37679169
- [x] ~~Arabic copy~~ → `content/copy-en-ar.md` (needs a native-speaker review before launch)
- [ ] Tractor model list: name, specs, photos, brochure PDFs, stock status
- [ ] (Optional) Physical address, opening hours, Google Maps link
- [ ] Company facts: year founded, key numbers, notable clients
- [ ] Service details (what is actually offered for maintenance and parts)
- [ ] Arabic copy, or approval of professionally translated copy
- [ ] Social media links (if any)
- [ ] Hero and lifestyle imagery (manufacturer press kits plus any local photos)

---

## 8. Success measures
- Quote form submissions, WhatsApp clicks and call clicks per month (tracked as analytics events)
- Lighthouse 90+ on Performance, Accessibility, Best Practices and SEO (mobile)
- Ranking for "tractors Bahrain", "agricultural machinery Bahrain" and the Arabic equivalents
- Staff can add or edit a tractor model in the CMS without a developer
