# AGENTS.md — BCN SHOT

Quick guide for AI agents. Source of truth: `BCN_SHOT_Tech_Specs.md` (if there's a conflict, the spec wins). Work plan: `PLAN.md`.

## What this is

Portfolio website for **BCN SHOT**, fashion, portrait and editorial photography by **Oriol** (Barcelona). Goal: showcase the style and drive the user to **"Reserva tu sesión"** ("Book your session") → `/contacto`.

- Domain: `https://bcnshot.com` · Email: `info@bcnshot.com`
- Site language: **Spanish** (`lang="es"`). Set up for Catalan/English later, but **without** creating empty language routes.
- People: Oriol (photographer, approves content), Marc (development and technical decisions).

## Current status

Phases 1–4 implemented (see `PLAN.md`). There are already 9 real photos, a logo, Oriol's portrait, favicon and OG image (originals outside the repo). Still missing: Oriol's review (selection, alt text, permissions), decisions (hosting, mail provider, Instagram) and legal pages. Search for `TODO_PUBLICACION` to find everything still pending in the code.

## Next.js 16: read the local docs

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Differences already found in this project:

- `next/image`: `priority` is deprecated → use `preload` (or `loading="eager"`/`fetchPriority`). `qualities` defaults to `[75]`. Local SVGs are served unoptimized automatically.
- `next lint` no longer exists: `npm run lint` calls `eslint` directly (flat config).
- `LayoutProps` / `PageProps` are generated global types: `npm run typecheck` runs `next typegen` before `tsc`.
- `headers()`, `cookies()`, `params`, `searchParams` are async.
- `middleware` is now called `proxy`. `next dev` writes to `.next/dev`.

## Tech stack (decided)

- **Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS 4** (CSS-first config in `app/globals.css`, no `tailwind.config`).
- **shadcn/ui** pattern only where it adds accessibility: the mobile menu and the lightbox use `@radix-ui/react-dialog` directly. The shadcn registry isn't reachable from the corporate network (proxy 407), so the components are hand-written following the same pattern (`lib/cn.ts` = `clsx` + `tailwind-merge`). Everything else is plain HTML.
- Content in **local TypeScript files**: no CMS, no database.
- Fonts: **Manrope** (headings, `font-display`) and **Inter** (body, `font-sans`) via `next/font/google` (self-hosted at build time).
- **Do not** enable `output: 'export'` (the form is a Server Action).
- Mail: `lib/mail.ts` with a `resend` adapter via `fetch` (no SDK), enabled only through environment variables. **Provider still to be decided**: don't sign up for anything with a cost without Oriol and Marc.
- Hosting: **still to be decided**. Staging environment on Vercel (Hobby, CLI): https://bcn-shot.vercel.app, with `noindex`.
- No validation library: `lib/contact-validation.ts` is hand-written and shared between client and server.

## Commands

```bash
npm run dev        # development (shows placeholder photos if content/photos.ts is empty)
npm run build      # production build (validates content/photos.ts)
npm run lint
npm run typecheck
npm run image -- <original> <id> [--dir=portfolio|site] [--max=2400] [--quality=85]   # exports a WebP to public/images/<dir>/<id>.webp (sharp)
```

There are no automated tests. UI has been verified using `playwright-core` with Edge (`channel: "msedge"`) from a temp folder outside the repo; `NO_PROXY=localhost` is needed because of the corporate proxy.

## Structure

```
app/
  layout.tsx               html lang="es", fonts, base metadata, skip link, header/footer
  page.tsx                 homepage: hero, featured work, pitch, intro, final CTA
  portfolio/page.tsx       grid + lightbox (or empty state)
  sobre-mi/page.tsx
  contacto/page.tsx        + actions.ts (sendContact Server Action)
  aviso-legal/, privacidad/  TODO_PUBLICACION markers (no invented legal copy)
  robots.ts, sitemap.ts, not-found.tsx
  icon.png, apple-icon.png, opengraph-image.jpg (+ .alt.txt)   generated from the original compact logo
components/
  site-header, site-footer, logo, nav-links (active route), mobile-nav (Radix Dialog)
  photo-grid + lightbox (Radix Dialog), contact-form, cta-section
  pending-asset (explicit placeholder), legal-pending, icons, ui/button, ui/container
content/
  site.ts                  siteConfig: email, domain, instagramUrl, heroImage, aboutPortrait, logo, nav, UI decisions
  copy.ts                  every visible string (Spanish)
  photos.ts                real photos (9, proposed alt text pending review)
  dev-placeholder-photos.ts  only for `next dev` when photos is empty
  types.ts                 PortfolioPhoto, SiteImage
lib/
  photos.ts                selection/ordering + data validation (server-only, uses fs)
  contact-validation.ts, mail.ts, rate-limit.ts, metadata.ts (pageMetadata), env.ts, cn.ts, focal-point.ts
scripts/export-image.mjs   exports originals to WebP (npm run image)
public/images/             web derivatives ONLY: portfolio/*.webp, site/logo.png, site/oriol-retrato.webp, placeholders/ (dev only)
```

Provisional decisions (changeable in `content/site.ts`): featured photos on the homepage link to `/portfolio` (`featuredBehavior`), and the lightbox loops at the ends (`lightboxLoop: true`).

## Non-negotiable rules

1. **Never invent** photos, testimonials, prices, years of experience, clients, credentials, legal data, or the Instagram URL. If something is missing: an explicit marker (`TODO_PUBLICACION` / visible placeholder) and flag it in the handoff.
2. **No stock or generated images** that could pass as Oriol's work. Placeholders must be clearly identifiable.
3. Instagram: only show it once the URL is confirmed in `siteConfig`; if it's empty, render no link at all.
4. **No trackers, pixels or tracking cookies** in V1. No embedded Instagram widgets.
5. Do not build: a blog, a shop, payments, user accounts, a booking calendar, or password-protected galleries.
6. Copy: don't claim video/audio services, don't limit the offer to women, don't publish age limits or physical criteria, don't promise availability, timelines or prices.
7. Secrets only in environment variables (`.env.local`, never committed). Provide `.env.example`.
8. Form: never fake a submission. Confirm success only if the provider accepts the message. Never log message content.
9. Do not touch existing mail DNS records.

## Design system

Tokens (defined in `@theme` in `app/globals.css`; classes `bg-background`, `text-muted`, `border-border`, `bg-accent`...; also `max-w-site` = 1440 px, `rounded-button`, `font-display`):

| Token | Value |
| --- | --- |
| `background` | `#F7F6F2` |
| `surface` | `#FFFFFF` |
| `foreground` | `#171717` |
| `muted` | `#66645F` |
| `border` | `#D9D7D0` |
| `accent` | `#171717` |
| `accent-foreground` | `#FFFFFF` |

Editorial style, sober and premium: large photos, lots of whitespace, short copy, no gradients, no heavy shadows or flashy animations. Body text ≥16 px, line length 65–75 characters, 4/8 px spacing scale, 20–24 px margins (mobile) and 40–64 px (desktop), ~1440 px container, slightly rounded buttons. Real logo (`public/images/site/logo.png`) set in `siteConfig.logo`; if it's `null`, `components/logo.tsx` falls back to a typographic logo.

## Portfolio data model

```ts
export type PortfolioPhoto = {
  id: string; src: string; lightboxSrc?: string;
  width: number; height: number; alt: string;
  title?: string; shotDate?: string; location?: string; credit?: string;
  focalPoint?: { x: number; y: number }; // 0..100
  featured: boolean; published: boolean; order: number;
};
```

- Portfolio: `published: true`, sorted ascending by `order`. Homepage: `featured` (4–8 photos).
- Automatic validation in `lib/photos.ts` (in `next dev` and `next build`): unique `id`/`order`, files that exist, `width`/`height` > 0, `alt` present. Warns if the featured count isn't 4–8.
- `focalPoint` is the only case where the portfolio grid crops (4:5); without it the aspect ratio is preserved.
- Don't show empty labels or overlay metadata on every photo.

## Key requirements per feature

- **Navigation**: Portfolio, Sobre mí, Contacto + CTA. Accessible mobile menu (labeled button, Escape, closes on navigation, focus management). Active route visible.
- **Grid**: 1/2/3 columns, no distortion, `next/image` with dimensions, lazy except for the hero/first viewport. Dignified empty state with a CTA when there are no photos.
- **Lightbox**: accessible dialog, dark background, close/prev/next, arrow keys and Escape, swipe, focus trapped and returned to the thumbnail, scroll locked, "3 / 12" indicator, `prefers-reduced-motion`.
- **Form** (`/contacto`): name (required, ≤100), email (required, ≤254), type (`Sesión` | `Colaboración TFP` | `Otra`), message (required, 10–2000), consent (required, not pre-checked, links to `/privacidad`). Client + server validation sharing the same schema, errors in Spanish tied to each field, preserves input, button disabled while submitting, honeypot + rate limit, `From` on the own domain and `Reply-To` set to the sender, fallback error with a `mailto:` link.
- **SEO/a11y/perf**: one H1 per page, unique metadata, canonical, OG, `sitemap.xml`, `robots.txt` (don't index staging environments), WCAG 2.2 AA, no JSON-LD with unverified claims. Mobile Lighthouse target: Perf ≥90, A11y/BP/SEO ≥95.
- **Legal pages**: `/aviso-legal` and `/privacidad` with `TODO_PUBLICACION` until Oriol approves them; don't add generic invented copy.

## Conventions

- Keep the code simple and maintainable; separate data, components and routes.
- Server Components by default; `"use client"` only where needed (menu, lightbox, form).
- Visible copy always lives in `content/copy.ts` (never scattered across components). Stable, descriptive file names (kebab-case). Code comments in English.
- Page metadata via `pageMetadata()` from `lib/metadata.ts` (canonical and OG per page).
- Update `README.md`, `PLAN.md` and this file whenever decisions or status change.

## Pending decisions (don't assume them)

- Hosting / deployment platform.
- Transactional mail provider (the `resend` adapter exists, but it hasn't been chosen).
- Instagram URL (`siteConfig.instagramUrl`). The splash image shows "@bcnshot", but the exact URL still needs confirming.
- Featured photos: open the lightbox or link to `/portfolio` (provisional: link).
- Lightbox: loop or stop at the ends (provisional: loops).
- Oriol's review: photo selection, cover photo, proposed `alt` text and model releases (`published: true` has been assumed).
- Final copy and legal data.
