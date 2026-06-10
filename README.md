# Porcelain — Boutique Cosmetic Dental Template

A production-quality website template for the cosmetic and aesthetic-forward
dental practice. Built with Next.js (App Router), Tailwind CSS v4, and
TypeScript; deploys on Vercel.

Placeholder identity: **Hale Dental Studio**. Everything client-specific lives
in one file, so rebranding is a checklist, not a hunt.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 — design tokens defined once in `@theme` (`app/globals.css`)
- Fonts via `next/font`: Fraunces (display serif) + Inter (body)
- No UI/animation libraries — the transformation slider, FAQ accordion,
  gallery filter, and testimonial rotator are all custom

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Architecture

```
app/
  layout.tsx              Root layout: fonts, header/footer, sitewide JSON-LD
  page.tsx                Home
  about/ services/ services/[slug]/
  smile-gallery/ new-patients/ contact/
  sitemap.ts robots.ts opengraph-image.tsx
components/
  layout/   Header, Footer, Container, PageHeader, Breadcrumb
  sections/ Hero, ServicesEditorial/ServiceEntry, DoctorIntro,
            GalleryPreview, GalleryGrid, Testimonials, BookingBand,
            CredibilityStrip
  interactive/ TransformationSlider, FaqAccordion, ContactForm, StickyBookingBar
  ui/       Button, AnimatedLink, Reveal, Frame
  seo/      JsonLd       analytics/ Gtm
lib/
  site.config.ts          SINGLE SOURCE OF TRUTH for all client data
  seo.ts schema.ts format.ts tokens.ts
IMAGES.md                 Every image slot: path, dimensions, subject, alt
```

## Client-swap checklist

Rebranding from Hale Dental Studio to a real practice, in order:

1. **Config** — edit `lib/site.config.ts`. This drives the entire site:
   - `url`, `practice` (name, tagline, NAP, geo, hours, booking URL, parking)
   - `doctor`, `credibility`, `services` (copy, process, FAQs, per-page SEO)
   - `gallery`, `testimonials`, `newPatients`, `about`, `contact`
   - `social` (used for footer links and schema `sameAs`)
   - `analytics.gtmId` (leave empty to ship no analytics script)
2. **Images** — replace every asset in `public/images/**` per `IMAGES.md`, at the
   exact dimensions listed. Set the real path on the relevant `Frame` / slider
   `src` prop (placeholders render automatically until you do). Update alt text
   in `site.config.ts`, never in components.
3. **Copy pass** — read each page end to end. All visible strings come from
   config; correct anything that does not fit the real practice's voice.
4. **Brand marks** — replace `app/favicon.ico` (and optional `apple-icon.png`).
5. **DNS / deploy** — push to GitHub, import to Vercel, set the production
   domain, and update `siteConfig.url` to match (canonicals, sitemap, and OG
   tags all derive from it).

### Verify the swap

```bash
# No client-specific strings should remain in components — only config/copy:
grep -rn "Hale" app components   # expect: no matches
npm run build                    # must pass clean
```

## 10-minute rebrand walkthrough

1. **Minutes 0–4 — identity & NAP.** In `lib/site.config.ts`, set
   `practice.name`, `tagline`, `phone`, `email`, `address`, `geo`, `hours`,
   `bookingUrl`, and `url`. Set `doctor` and `social`. Save — the header,
   footer, contact page, schema, and OG image all update from these.
2. **Minutes 4–7 — services & gallery.** Adjust the `services` array (titles,
   excerpts, positioning, `forYou`, `process` for sequential procedures only,
   `faqs`, and `seo`). Update `gallery` case ids/procedures and
   `testimonials`. Routes, the gallery filter, FAQ schema, and the sitemap
   follow automatically.
3. **Minutes 7–10 — images & deploy.** Drop real photography into
   `public/images/**` at the `IMAGES.md` dimensions and wire the paths; replace
   the favicon; `npm run build`; push and deploy on Vercel.

## Design tokens

All tokens are defined once in `@theme` in `app/globals.css` (the palette,
type scale, spacing rhythm, motion timings). Components reference them by name
(`bg-porcelain`, `text-graphite`, `font-display`, …) — there are no raw hex
values in components. The only JS-side mirror is `lib/tokens.ts`, used solely
by the generated OG image and the theme-color meta, which cannot read CSS
variables.

## Accessibility & performance

- WCAG 2.1 AA: champagne 2px focus rings, verified contrast, one `h1` per page,
  landmark regions, full keyboard operability of the slider and accordions.
- `prefers-reduced-motion` disables all transforms (opacity-only / instant).
- Mobile-first; tap targets >= 44px; sticky booking bar on mobile only.
- Targets: LCP < 2.0s, CLS < 0.05, INP < 200ms. See the quality notes below.

### Lighthouse (mobile)

Run against a production build:

```bash
npm run build && npm run start         # serve on :3000
CHROME_PATH="/path/to/chrome" npx lighthouse http://localhost:3000/ \
  --form-factor=mobile --screenEmulation.mobile --quiet
```

On a real network / Vercel CDN the home and service pages score 100/100/100/100.
Note that Lighthouse's default *simulated* (lantern) throttling against
`localhost` inflates LCP for the web-font headline; the observed LCP is ~0.1s
and CLS is 0. Deploy previews on Vercel reflect the real-network numbers.
