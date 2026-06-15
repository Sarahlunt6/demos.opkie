# Opkie Template Showcase Hub — "The Showroom"

One link. Five websites. An easy choice. A client-facing hub that presents Opkie's
five dental website templates and routes prospects to the live demos, with tracked
links so Opkie sees which templates each prospect opened.

Built with Next.js (App Router), Tailwind CSS v4 (`@theme` tokens), and TypeScript;
deployed on Vercel at **demos.opkie.com**. This is the first thing a prospect sees —
it is engineered to be the fastest and most polished site in the system.

See `PRD.md` for the full spec; it is the source of truth.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Architecture

- **`lib/hub.config.ts`** — the single source of truth. Template order, copy, demo
  URLs, screenshots, Style Finder labels, contact, turnaround, and the
  indexability flag all live here. No template- or client-specific string is
  hardcoded in a component.
- **`app/globals.css`** — the only place color and type tokens are defined
  (`@theme`). The hub identity is deliberately neutral (PRD 3.1); template brand
  color appears in exactly one place — the index chips — sourced from
  `hub.config.ts` (`brandHue`).
- **`lib/tokens.ts`** — a JS mirror of the palette for the OG image and
  theme-color meta only (they can't read CSS variables).
- **`PREVIEWS.md`** — the 15-screenshot capture spec (5 templates × 3).

## Common edits

- **Update a demo URL:** edit `templates[].demoUrl` in `lib/hub.config.ts`. The
  `/go/[id]` redirect and the "View the live site" button follow automatically.
- **Refresh screenshots:** re-capture per `PREVIEWS.md` and overwrite the files in
  `public/previews/` — paths and aspect ratios never change.
- **Edit the go-live timeframe:** change `turnaround` in the config.
- **Toggle indexability:** flip `indexable` in the config (default `false` — the
  hub is a direct-link sales tool, not a search asset). Controls robots + sitemap.
- **Set the contact details / accent:** `contact.{phone,email,bookingUrl}` in the
  config; the `opkie-accent` hue in `app/globals.css` + `lib/tokens.ts`.
- **Add a sixth template:** one `hub.config.ts` entry + three screenshots.

## Placeholders to replace before launch

- The five `demoUrl`s (currently plausible Vercel placeholders).
- `contact.{phone,email,bookingUrl}` and `turnaround`.
- The `opkie-accent` hue (replace the placeholder in `globals.css` + `tokens.ts`
  with the current opkie.com brand accent).
- The 15 real screenshots (gray placeholders render until then).

## Quality bar

Lighthouse mobile ≥98 performance / 100 accessibility before merge. LCP < 1.5s,
CLS < 0.02. Fully static, `next/image` for all previews. No emojis; WCAG 2.1 AA.
