# Valley Agriculture website

Next.js 15 · Tailwind CSS v4 · next-intl (English + Arabic RTL). See `../website-brief.md` and `../implementation-plan.md`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/en`; the Arabic site is at `/ar`.

## Where things live

| Path | What |
|---|---|
| `messages/en.json`, `messages/ar.json` | All interface text (from `../content/copy-en-ar.md`) |
| `src/content/` | Categories, products, services and contact details. **Products are sample data**, marked `isSample`. Replace before launch. |
| `src/components/layout/Header.tsx` | Large-logo-to-nav collapse, mega menu, mobile menu |
| `src/components/brand/` | Inline SVG logo (generated from `../brand/logo/valley-logo.svg`) |
| `src/app/[locale]/` | Pages |
| `public/images/` | Images from the old site |

## Quote form email

Without configuration, enquiries are logged to the terminal. To send them by email, copy `.env.example` to `.env.local` and set a [Resend](https://resend.com) API key and a verified sender address.

## Not yet done

- Real tractor models and photos (the current six are samples)
- Sanity CMS (the content files mirror the planned schemas)
- Native-speaker review of the Arabic copy
- Deployment (Vercel) and domain
