# Valley Agriculture — Implementation Plan

Companion to `website-brief.md`. Each phase ends with something reviewable.

**Project assets**
- `brand/logo/`: SVG logo set (full, compact, icon, reversed) + `preview.html`
- `content/copy-en-ar.md`: all site copy in English and Arabic, organised by i18n key

**Stack**
- **Next.js 15** (App Router, TypeScript, React Server Components)
- **Tailwind CSS v4** with design tokens as CSS variables
- **next-intl** for `/en` and `/ar` routing, translations and RTL `dir`
- **Sanity** (headless CMS) with field-level localisation (en/ar) for products, categories, services and settings
- **Motion** (Framer Motion) for the header logo collapse and reveals
- **Resend** (email) + **Cloudflare Turnstile** (spam) for the quote form
- **Vercel** hosting · Vercel Analytics or GA4 for conversion events

---

## Phase 0: Prerequisites (before coding)
- [x] Logo SVGs with separable parts (`#icon` › `#arc` + `#tractor`, `#wordmark`, `#tagline`): done in `brand/logo/`
- [x] Logo colours sampled: green `#28783B`, red `#FE2B2B` (tokens updated in the brief)
- [x] Contact details: info@valleyagrotrading.com · +973 37679169 (WhatsApp assumed on the same number)
- [x] Bilingual copy: `content/copy-en-ar.md` (get it reviewed by a native Arabic speaker before launch)
- [ ] Collect the first batch of tractor models (minimum 4–6 for the featured row)
- [ ] Gather manufacturer press images; create product cut-outs on `sand-200`
- [ ] Create the Sanity project, Vercel project, Resend account and domain DNS access

## Phase 1: Scaffolding
- `create-next-app` (TS, App Router, ESLint, `src/` dir), Prettier
- Folder structure:
  ```
  src/
    app/[locale]/(site)/          page routes
    app/[locale]/layout.tsx       sets <html lang dir>
    components/ui/                primitives (Button, Label, Container…)
    components/sections/          page sections (Hero, StatementBlock…)
    components/layout/            Header, Footer, MegaMenu, WhatsAppFloat
    lib/sanity/                   client, queries (GROQ), types
    i18n/                         next-intl config, messages/en.json, messages/ar.json
  sanity/                         studio + schemas
  ```
- next-intl middleware: default `en`, `ar` with `dir="rtl"`; locale switch keeps the current path
- Fonts through `next/font/google`: Hanken Grotesk, IBM Plex Mono, IBM Plex Sans Arabic. Font variables are swapped per locale.
- Deploy an empty shell to Vercel with preview deployments on every branch

**Done when:** `/en` and `/ar` render a placeholder page, with Arabic in RTL and the correct fonts, live on a Vercel preview URL.

## Phase 2: Design tokens and primitives
- Tailwind v4 `@theme`: colours (green/red/sand/soil scale), fluid type scale (`clamp()`), spacing, radius 0–4px, container widths
- Lint rule or convention: **logical properties only** (`ms-/me-/ps-/pe-/start/end`)
- Red is an accent only (arc, eyebrow dash, active underlines). Never use it for buttons or backgrounds.
- Primitives: `Button` (primary-green, secondary-green-outline, ghost, whatsapp), `Eyebrow` (mono label + red arc/dash), `Container`, `Section` (bg variants: sand-50 / sand-200 / green-900), `Heading` (display sizes), `ArcDivider` (animated SVG stroke)
- A `/[locale]/styleguide` page (excluded from the sitemap) showing all tokens and primitives in both directions

**Done when:** the style guide page shows every primitive correctly in EN and AR.

## Phase 3: Header, navigation and footer
- **Large logo → nav collapse** (Tolix behaviour)
  - `useScroll` + `useTransform` (Motion) mapping scroll 0–200px to logo scale/translate; tagline opacity 1 → 0
  - Header background transitions from transparent to `sand-50` with a hairline
  - Inner pages use a `compact` prop to start collapsed
  - Reduced-motion: switch states instantly with no scrubbing
  - Check RTL: the logo stays unmirrored and the nav order flips
- Desktop nav + **Products mega menu** (categories + model thumbnails from the CMS)
- Mobile: hamburger → full-screen `green-900` sheet, large serif links, CTA buttons at the bottom
- Language switch (EN / ع) with a red accent underline on the active language
- **WhatsApp float** (bottom-end corner), with a per-page message passed through context
- **Footer**: 3 columns (Products · Company · Contact), legal links, language switch; "Visit Us" column renders only if `siteSettings.address` is set
- Logo: inline `valley-logo.svg` as a React component (not `<img>`) so `#tagline` and `#icon` can be animated separately

**Done when:** the header effect is smooth (60fps) on desktop and mobile in both languages.

## Phase 4: CMS (Sanity)
- Schemas, all with localised `{en, ar}` text fields:
  - `siteSettings`: phone (`+973 37679169`), WhatsApp (`97337679169`), email (`info@valleyagrotrading.com`), plus optional address, hours, map URL and socials (each hidden when empty)
  - `category`: title, slug, description, hero image, benefits[], `isPrimary` (true for Tractors), order
  - `product`: name, slug, category ref, status (`in-stock` / `on-order`), shortDescription, gallery[], keySpecs[] (label/value, max 3), specs[] (full table), suitableFor[] tags, brochure (file), featured (bool)
  - `service`: title, description, image, order
  - `page` singletons for Home/About copy blocks (hero headline, statement, story)
- Seed with the old-site copy (see brief §7) and placeholder products
- Typed GROQ queries; ISR with on-demand revalidation through a Sanity webhook → `/api/revalidate`
- Embedded Studio at `/studio` (protected), with a simple desk structure: Products, Categories, Services, Settings
- Seed `siteSettings` and the page singletons from `content/copy-en-ar.md` (EN + AR)

**Done when:** a staff member can add a tractor in the Studio and see it on the site within seconds.

## Phase 5: Home page
Build sections in order, each as its own component with CMS data:
1. `Hero`: full-bleed image (`next/image`, priority), faint large red arc, eyebrow, display headline, two CTAs
2. `StatementBlock`
3. `FeaturedProducts`: horizontal row/scroller of `ProductCard` (featured = true)
4. `CategoryTiles`: three tiles, Tractors larger
5. `Split5050`: Why Valley
6. `ServicesStrip`: four items
7. `CtaBand`: green-900, Quote / WhatsApp / Call
- Scroll reveals (fade/rise) and arc draw-in on eyebrows

**Done when:** the home page matches the brief in both languages and scores Lighthouse mobile 90+.

## Phase 6: Products
- `/products`: tractors feature block + "Other equipment" tiles + CTA band
- `/products/tractors`: grid of `ProductCard`; client-side filters (HP range, drive) shown only when there are more than 8 models; filter state kept in URL params
- `/products/tractors/[slug]`: gallery (thumbnails + lightbox), info panel with key specs, **Enquire** (→ `/contact?product=slug`), WhatsApp (pre-filled), brochure download; full spec table; suitable-for tags; related models
- `/products/[category]`: one template for irrigation-pivots, irrigation-automation and bale-handling (hero, description, benefits, gallery/models, enquiry CTA)
- `generateStaticParams` for all products/categories × locales

**Done when:** every category and model page renders from the CMS, and Enquire/WhatsApp carry the model name through.

## Phase 7: About and Services
- About: title, statement, 50/50 approach, numbers row (hidden if empty), optional team image, CTA band
- Services: four alternating 50/50 blocks from the `service` schema, plus a "Book a service" CTA (→ `/contact?subject=service`)

## Phase 8: Contact and quote form
- Layout: form | contact card (email, phone, WhatsApp); address/hours/map embed render only if set in the CMS
- Form built with React Hook Form + Zod: name*, company, phone* (Bahrain +973 validation, other countries allowed), email, product (pre-filled from `?product=`), subject (Quote/Service/General), message*
- Server Action: validate → Turnstile check → send through Resend to info@valleyagrotrading.com (HTML email including product link) → optional auto-reply to the customer in their locale
- Success and error states; analytics events `quote_submit`, `whatsapp_click`, `call_click`

**Done when:** a test enquiry from a model page arrives in the inbox with the model name, in both languages.

## Phase 9: Arabic and RTL pass
- Load the Arabic copy from `content/copy-en-ar.md` into the CMS and `messages/ar.json` (keys match the tables), after the client's native-speaker review
- Use ICU plural rules for Arabic counts (see the note in the copy deck §5)
- Full RTL QA: mirrored layout, arrow icons flipped, carousels/scrollers reversed, form alignment, numbers (Western digits for specs and phone numbers)
- Check Arabic line heights and font sizes; Naskh often needs about 10% more line height

## Phase 10: SEO, performance and accessibility
- Metadata per page from the CMS; `hreflang` en/ar alternates; `sitemap.xml`, `robots.txt`
- JSON-LD: `LocalBusiness` (site-wide), `Product` (model pages), `BreadcrumbList`
- Open Graph images (template with logo + product image)
- **301 redirects from old Wix URLs:**
  - `/about` → `/en/about`
  - `/portfolio` → `/en/products`
  - `/portfolio-collections/portfolio/tractors-more` → `/en/products/tractors`
  - `/portfolio-collections/portfolio/irrigation-pivots` → `/en/products/irrigation-pivots`
  - `/portfolio-collections/portfolio/irrigation-automation` → `/en/products/irrigation-automation`
  - `/portfolio-collections/portfolio/bale-handling-equipment` → `/en/products/bale-handling`
- Image optimisation (AVIF/WebP, correct `sizes`), font subsetting, and a check that the motion library isn't bundled where it's not needed
- Accessibility: keyboard navigation for the mega menu and mobile sheet, focus states, alt text required in the CMS, colour-contrast check on all text/button pairings

## Phase 11: Launch
- Client content review in both languages; CMS training (15-minute walkthrough + short guide)
- Point the domain to Vercel, configure email DNS for Resend (SPF/DKIM)
- Submit the sitemap to Google Search Console; set up a Google Business Profile link
- Post-launch: monitor form deliverability and Core Web Vitals for 2 weeks

---

## Suggested order and checkpoints
| Checkpoint | Phases | Review with client |
|---|---|---|
| A | 0–2 | Tokens, fonts and colours on the style guide page |
| B | 3 | Header logo effect (signature interaction) |
| C | 4–5 | Home page with real CMS content |
| D | 6–8 | Products and the full enquiry flow |
| E | 9–11 | Arabic, SEO, go-live |

## Open questions (carry into build)
- Show prices or not? (Brief assumes **no prices**, quote only)
- Is there a physical showroom/yard to show on the map and in photos?
- Who on the client side signs off the Arabic copy?
- Confirm that WhatsApp is active on +973 37679169
