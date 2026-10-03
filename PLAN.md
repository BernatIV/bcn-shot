# PLAN.md — BCN SHOT

Implementation plan based on `BCN_SHOT_Tech_Specs.md`. Context and rules for agents: `AGENTS.md`.
Mark each task's status (`[ ]` pending, `[x]` done) as work progresses.

## Phase 0 — Decisions and material (Oriol / Marc)

These block launch, not development (placeholders are used in the meantime).

- [ ] Hosting (must support server routes if the form stays).
- [ ] Transactional mail provider + domain verification (`From` on `@bcnshot.com`).
- [x] Exact Instagram URL: `https://www.instagram.com/bcnshot/`.
- [ ] Behavior of the homepage featured photos: open the lightbox or go to `/portfolio`.
- [ ] Lightbox at the ends: loop or disable.
- [ ] 8–15 approved photos, featured set and order. *6 photos are in place, all featured, cover photo also in the grid. Pending Oriol's review of the selection, the `alt` text and the model releases.*
- [x] Final logo and Oriol's portrait.
- [ ] Final copy (Sobre mí, contact) and legal identity data (Oriol's legal name, NIF, fiscal address).

## Phase 1 — Project foundation

- [x] Create the Next.js project (App Router, TypeScript, Tailwind, ESLint) with current stable versions.
- [x] Accessible dialog with `@radix-ui/react-dialog` (shadcn pattern; the shadcn registry is blocked by the proxy). Forms with plain HTML.
- [x] Set up design tokens (colors, spacing, container) in Tailwind.
- [x] Load Manrope and Inter with `next/font`.
- [x] `content/site.ts` (`siteConfig`: domain, email, optional Instagram, metadata, copy).
- [x] `content/photos.ts` with the `PortfolioPhoto` type, empty/placeholder array and dev-time validation.
- [x] `.env.example`, `.gitignore` (includes `.env*.local`), initial `README.md`.

## Phase 2 — Shared layout

- [x] `app/layout.tsx` with `lang="es"`, base metadata, fonts.
- [x] `Header`: placeholder logo, nav, "Reserva tu sesión" CTA, active route.
- [x] Accessible mobile menu (Escape, close button, closes on navigation, focus).
- [x] `Footer`: email, Instagram (only if confirmed), legal notice, privacy.
- [x] Base components: `Button`, `Container`, explicit `Placeholder` for pending images.

## Phase 3 — Pages

- [x] `/` — Hero (priority photo, not lazy; CTA visible on mobile), featured selection (4–8), short pitch, Oriol's intro, final CTA.
- [x] `/portfolio` — 1/2/3-column grid, `next/image` with dimensions, lazy loading, `focalPoint`, empty state with CTA.
- [x] Lightbox — accessible dialog, keyboard/touch/mouse, focus and scroll handling, "n / total", reduced motion, `lightboxSrc`.
- [x] `/sobre-mi` — portrait (or placeholder), short copy, CTA.
- [x] `/aviso-legal` and `/privacidad` — full copy written; identity data and hosting/mail provider still marked `TODO_PUBLICACION`.

## Phase 4 — Contact

- [x] Shared validation schema (`lib/`) with the spec's limits and Spanish messages.
- [x] Client form: visible labels, per-field errors + summary, preserves input, button disabled while submitting.
- [x] Server endpoint (Route Handler or Server Action): revalidation, honeypot, rate limit, no content logging.
- [x] Provider integration (env vars), `From` on the own domain, `Reply-To` set to the sender. `resend` adapter ready; **provider still to be decided and tested with a real send**.
- [x] Real success state and error state with a `mailto:info@bcnshot.com` link.
- [ ] If the final hosting is static: explicit decision from Marc (external function or `mailto:` only).

## Phase 5 — SEO, accessibility and performance

- [x] Unique per-page metadata, canonical `https://bcnshot.com`, favicon, OG image (approved assets). *Favicon, apple-icon and OG generated from the compact logo.*
- [x] `app/sitemap.ts` and `app/robots.ts` (don't index staging environments).
- [ ] WCAG 2.2 AA review: contrast, focus, keyboard, 200% zoom, alt text, reduced motion.
- [x] WebP/AVIF images with responsive variants; originals outside `public/`. *Originals kept outside the repo, WebP derivatives via `npm run image`, and `next/image` serves AVIF/WebP with `srcset`.*
- [ ] Mobile Lighthouse: Perf ≥90, A11y/BP/SEO ≥95.

## Phase 6 — Handoff and launch

- [x] Complete `README.md`: setup, env, adding/reordering photos, running, deploying, domain/DNS, testing the form.
- [ ] Staging deployment (noindex) and review with Oriol.
- [ ] Replace placeholders with approved assets and copy; fill in the remaining `TODO_PUBLICACION` fields on the legal pages (identity data, hosting/mail provider).
- [ ] Real end-to-end test of the form reaching `info@bcnshot.com`.
- [ ] Connect the domain without touching the mail DNS records; verify mail afterwards.
- [ ] Communicated list of outstanding data.

## Definition of done

Every route and CTA works; the portfolio and lightbox work on mobile and desktop; the form reaches `info@bcnshot.com` with a real test and shows real errors; assets and copy are approved; legal pages are complete; SEO and accessibility have been reviewed; mail DNS still works.
