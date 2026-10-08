# AGENTS.md — BCN SHOT

Quick guide for AI agents. Source of truth: `BCN_SHOT_Tech_Specs.md` (if there's a conflict, the spec wins). Work plan: `PLAN.md`.

## What this is

Portfolio website for **BCN SHOT**, fashion, portrait and editorial photography by **Oriol** (Barcelona). Goal: showcase the style and drive the user to **"Reserva tu sesión"** ("Book your session") → `/contacto`.

- Domain: `https://bcnshot.com` · Email: `info@bcnshot.com`
- Site languages: **Spanish** (default), **Catalan** and **English**, all fully translated. Every page lives under `/es`, `/ca` or `/en`; route segments are NOT translated (`/ca/sobre-mi`, `/en/contacto`). See "Internationalization" below.
- People: Oriol (photographer, approves content), Marc (development and technical decisions).

## Current status

Phases 1–4 implemented (see `PLAN.md`), plus trilingual support (es/ca/en). There are already 6 real photos, a logo, Oriol's portrait, favicon, OG image and a confirmed Instagram URL (originals outside the repo). Still missing: Oriol's review (selection, alt text, permissions, the Catalan/English translations and the legal texts) and decisions (hosting, mail provider). Search for `TODO_PUBLICACION` to find everything still pending in the code.

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
- `next/root-params` (`import { lang } from "next/root-params"`) reads the root `[lang]` segment in Server Components and `generateMetadata`; it does NOT work in Server Actions, Client Components or Route Handlers (pass the locale as a prop / hidden form field there).
- With a dynamic root segment, a `notFound()` thrown while rendering can't be rendered by a nested `not-found.tsx` on the server (you get an empty `__next_error__` shell). That's why unknown URLs are 404'd at routing level (`dynamicParams = false` in `app/[lang]/layout.tsx`, no catch-all) and rendered by `app/global-not-found.tsx` (`experimental.globalNotFound`). Avoid calling `notFound()` from pages.

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
proxy.ts                   language detection: redirects unprefixed URLs to /es|/ca|/en (cookie → Accept-Language → es)
app/
  [lang]/layout.tsx        root layout: generateStaticParams (es/ca/en), dynamicParams=false, base metadata, <SiteShell>
  [lang]/page.tsx          homepage: hero, featured work, pitch, intro, final CTA
  [lang]/portfolio/page.tsx  grid + lightbox (or empty state)
  [lang]/sobre-mi/page.tsx
  [lang]/contacto/page.tsx + actions.ts (sendContact Server Action; locale comes from a hidden `lang` field)
  [lang]/aviso-legal/, [lang]/privacidad/  legal copy (rendered by components/legal-page from the dictionaries)
  [lang]/not-found.tsx     localized not-found (client-side navigations)
  global-not-found.tsx     every 404 (localized via the x-bcn-locale header set by proxy.ts)
  globals.css, robots.ts, sitemap.ts (one entry per route × locale, with hreflang alternates)
  icon.png, apple-icon.png, opengraph-image.jpg (+ .alt.txt)   generated from the original compact logo
components/
  site-shell (<html>/<body>, fonts, header, footer), site-header, site-footer, logo, nav-links (active route), mobile-nav (Radix Dialog)
  language-switcher (same page in another language; sets the NEXT_LOCALE cookie on click)
  photo-grid + lightbox (Radix Dialog), contact-form, cta-section, legal-page, not-found-content
  rich-text (**bold**, [link](/path) localized, {vars}), pending-asset (explicit placeholder), icons, ui/button, ui/container
content/
  site.ts                  siteConfig: email, domain, instagramUrl, owner, heroImage, aboutPortrait, logo, nav, UI decisions
  copy/es.ts               every visible string in Spanish — defines the `Copy` shape
  copy/ca.ts, copy/en.ts   translations, typed as `Copy` (missing keys fail typecheck)
  copy/index.ts            `dictionaries: Record<Locale, Copy>`
  photos.ts                real photos (6, proposed alt text in es/ca/en pending review)
  dev-placeholder-photos.ts  only for `next dev` when photos is empty
  types.ts                 PortfolioPhoto, Photo (resolved for a locale), SiteImage
lib/
  i18n.ts                  locales, defaultLocale, Localized<T>, localizePath, matchAcceptLanguage, cookie/header names
  locale.ts                getLocale() / getCopy() for Server Components (next/root-params)
  photos.ts                selection/ordering + data validation (server-only, uses fs)
  contact-validation.ts, mail.ts, rate-limit.ts, metadata.ts (pageMetadata: canonical + hreflang + og:locale), env.ts, cn.ts, focal-point.ts
scripts/export-image.mjs   exports originals to WebP (npm run image)
public/images/             web derivatives ONLY: portfolio/*.webp, site/logo.png, site/oriol-retrato.webp, placeholders/ (dev only)
```

Provisional decisions (changeable in `content/site.ts`): featured photos on the homepage link to `/portfolio` (`featuredBehavior`), and the lightbox loops at the ends (`lightboxLoop: true`).

## Internationalization

- No i18n library (no `react-i18next`/`next-intl`): native Next.js routing + typed dictionaries.
- Detection (`proxy.ts`): only for URLs without a locale prefix → 307 to `/{locale}{path}` using 1) the `NEXT_LOCALE` cookie (set only when the visitor uses the switcher), 2) `Accept-Language` (q-sorted; gl/eu/ast/an → es; other unsupported → en), 3) `es`. Prefixed URLs are never redirected.
- Server Components: `const { locale, t } = await getCopy()`. Client Components receive `locale`/labels as props. Build internal links with `localizePath(locale, "/path")`.
- Localized data: `Localized<T> = Record<Locale, T>` (photo `alt`/`title`, site image `alt`). `lib/photos.ts` resolves them per locale and validates every language.
- SEO: `pageMetadata({ locale, ... })` sets canonical `/{locale}/path`, hreflang es/ca/en + `x-default` (the unprefixed URL) and `og:locale`.
- The contact email to Oriol is always in Spanish and states the site language. Form errors are in the page language.
- Adding a language: add it to `locales` in `lib/i18n.ts`, create `content/copy/<locale>.ts`, add the locale to every `Localized` value (typecheck lists them), and update the `localeNames`/`localeTags`/`ogLocales` maps.

## Non-negotiable rules

1. **Never invent** photos, testimonials, prices, years of experience, clients, credentials, or legal identity data (legal name, NIF, address). If something is missing: an explicit marker (`TODO_PUBLICACION` / visible placeholder) and flag it in the handoff.
2. **No stock or generated images** that could pass as Oriol's work. Placeholders must be clearly identifiable.
3. Instagram: confirmed URL is `https://www.instagram.com/bcnshot/` in `siteConfig.instagramUrl`. If it's ever cleared to `null`, no link is rendered.
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
  width: number; height: number; alt: Localized; // { es, ca, en }
  title?: Localized; shotDate?: string; location?: string; credit?: string;
  focalPoint?: { x: number; y: number }; // 0..100
  featured: boolean; published: boolean; order: number;
};
```

- Portfolio: `published: true`, sorted ascending by `order`. Homepage: `featured` (4–8 photos).
- Automatic validation in `lib/photos.ts` (in `next dev` and `next build`): unique `id`/`order`, files that exist, `width`/`height` > 0, `alt` present in every language. Warns if the featured count isn't 4–8.
- Portfolio grid: from `sm` (2–3 columns) every photo is cropped to a uniform 4:5 (centered, or at `focalPoint` if set) so the grid stays even. In the single-column mobile layout the original aspect ratio is kept unless `focalPoint` is set. The full photo is always shown uncropped in the lightbox.
- Don't show empty labels or overlay metadata on every photo.

## Key requirements per feature

- **Navigation**: Portfolio, Sobre mí, Contacto + CTA. Accessible mobile menu (labeled button, Escape, closes on navigation, focus management). Active route visible.
- **Grid**: 1/2/3 columns, no distortion, `next/image` with dimensions, lazy except for the hero/first viewport. Dignified empty state with a CTA when there are no photos.
- **Lightbox**: accessible dialog, dark background, close/prev/next, arrow keys and Escape, swipe, focus trapped and returned to the thumbnail, scroll locked, "3 / 12" indicator, `prefers-reduced-motion`.
- **Form** (`/contacto`): name (required, ≤100), email (required, ≤254), type (`session` | `tfp` | `other`, labels translated: `Sesión` | `Colaboración TFP` | `Otra` in Spanish), message (required, 10–2000), consent (required, not pre-checked, links to `/privacidad`). Client + server validation sharing the same schema, errors in the page language tied to each field, preserves input, button disabled while submitting, honeypot + rate limit, `From` on the own domain and `Reply-To` set to the sender, fallback error with a `mailto:` link.
- **SEO/a11y/perf**: one H1 per page, unique metadata per page and language, canonical, hreflang, OG, `sitemap.xml`, `robots.txt` (don't index staging environments), WCAG 2.2 AA, no JSON-LD with unverified claims. Mobile Lighthouse target: Perf ≥90, A11y/BP/SEO ≥95.
- **Legal pages**: `/aviso-legal` and `/privacidad` have full written copy in the three languages (`legalNotice`/`privacyPolicy` in `content/copy/*.ts`; identity data comes from `siteConfig.owner`). The Spanish text is the reference; the translations need review before launch. The privacy policy documents the `NEXT_LOCALE` technical cookie — keep it in sync if cookies change.

## Conventions

- Keep the code simple and maintainable; separate data, components and routes.
- Server Components by default; `"use client"` only where needed (menu, lightbox, form).
- Visible copy always lives in `content/copy/<locale>.ts` (never scattered across components). Add new strings to `es.ts` first, then to `ca.ts` and `en.ts` (typecheck enforces it). Stable, descriptive file names (kebab-case). Code comments in English.
- Page metadata via `pageMetadata({ locale, ... })` from `lib/metadata.ts` (canonical, hreflang and OG per page).
- Update `README.md`, `PLAN.md` and this file whenever decisions or status change.

## Pending decisions (don't assume them)

- Hosting / deployment platform.
- Transactional mail provider (the `resend` adapter exists, but it hasn't been chosen).
- Featured photos: open the lightbox or link to `/portfolio` (provisional: link).
- Lightbox: loop or stop at the ends (provisional: loops).
- Oriol's review: photo selection, cover photo, proposed `alt` text and model releases (`published: true` has been assumed).
- Final copy and legal data, including Oriol's review of the Catalan and English translations.
