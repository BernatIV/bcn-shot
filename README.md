# BCN SHOT — website

Portfolio website for BCN SHOT (fashion, portrait and editorial photography by Oriol, Barcelona).
Spec: `BCN_SHOT_Tech_Specs.md` · Plan and status: `PLAN.md` · AI agent guide: `AGENTS.md`.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Radix Dialog (shadcn/ui pattern).

## Getting started

Requirements: Node.js 20.9 or later (developed with Node 24) and npm.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

Scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also validates the photo data) |
| `npm start` | Serves the build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types and runs `tsc` |
| `npm run image -- <original> <id> [--dir=portfolio] [--max=2400] [--quality=85]` | Exports an original to `public/images/<dir>/<id>.webp` and prints the entry for `content/photos.ts` |

## Environment variables

See `.env.example`. `.env.local` is never committed.

| Variable | Use |
| --- | --- |
| `ALLOW_INDEXING` | `true` only on the real production site. Otherwise `noindex` and `robots.txt` with `Disallow: /`. Evaluated at build time. |
| `MAIL_PROVIDER` | Transactional mail provider. Only the `resend` adapter exists right now (provider still to be decided). |
| `RESEND_API_KEY` | Provider key (server-only). |
| `CONTACT_FROM_EMAIL` | Sender authorized by the provider's own domain, e.g. `BCN SHOT <web@bcnshot.com>`. |
| `CONTACT_TO_EMAIL` | Recipient (defaults to `info@bcnshot.com`). |

## Content

- **Copy**: `content/copy/es.ts` (Spanish, the reference that defines the shape), `content/copy/ca.ts` and `content/copy/en.ts`. Add every new string to all three files (`npm run typecheck` fails if a key is missing).
- **Languages**: the site is in Spanish, Catalan and English under `/es`, `/ca` and `/en` (route segments aren't translated). A URL without prefix (`/`, `/portfolio`...) is redirected by `proxy.ts` to the visitor's language: the `NEXT_LOCALE` cookie (set when they use the language switcher), else the browser's `Accept-Language`, else Spanish. Details in `AGENTS.md` → Internationalization.
- **Configuration**: `content/site.ts` (`siteConfig`): email, domain, Instagram, hero photo, Oriol's portrait, logo, navigation.
  - `instagramUrl: "https://www.instagram.com/bcnshot/"`. If it ever needs removing, set it back to `null` and no Instagram link is rendered.
  - `heroImage`, `aboutPortrait`, `logo`: already point to real assets. Setting them to `null` shows `TODO_PUBLICACION` markers (or the typographic logo).
- **Photos**: `content/photos.ts`.
- **Icons and OG**: `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg` (Next.js file convention; generated from the original compact logo).

### Adding or reordering photos

1. Keep the original **outside the repository** (`/assets/` and `/originals/` are in `.gitignore`). Never in `public/`.
2. Export the web version: `npm run image -- "C:/path/originals/photo.jpeg" editorial-01` (sRGB WebP, 2400 px max, quality 85) → `public/images/portfolio/editorial-01.webp`. The script prints the entry with the real dimensions.
3. Add an entry to `content/photos.ts`:

   ```ts
   {
     id: "editorial-01",
     src: "/images/portfolio/editorial-01.webp",
     lightboxSrc: "/images/portfolio/editorial-01-large.webp", // optional
     width: 1600, height: 2000,                                 // real dimensions of the src file
     alt: {
       es: "Useful description in Spanish",
       ca: "Useful description in Catalan",
       en: "Useful description in English",
     },
     featured: true,   // shown on the homepage (4–8 total)
     published: true,  // only with permission to publish
     order: 10,        // ascending order; leave gaps (10, 20...) to reorder easily
   }
   ```

   Optional: `title`, `credit`, `shotDate` (`YYYY-MM-DD`, verified), `location` (only if it can be published), `focalPoint` (`{ x, y }` 0–100; sets the crop position. From 2 columns up every grid thumbnail is cropped to 4:5, centered by default; on single-column mobile the crop only applies when `focalPoint` is set).
4. `npm run dev` / `npm run build` validate the data: unique ids and `order`, positive dimensions, `alt` present in every language and files that exist. The build fails if there are errors.

While `photos` is empty, `npm run dev` shows gray placeholder photos (`content/dev-placeholder-photos.ts`) so the design can still be worked on. **They never appear in production**: the portfolio page shows the empty state with a CTA.

## Contact form

- Server Action at `app/[lang]/contacto/actions.ts`; shared validation in `lib/contact-validation.ts`; sending in `lib/mail.ts`. Errors are shown in the page language; the email Oriol receives is always in Spanish and says which language the visitor used.
- Anti-spam: honeypot field (`website`) and a limit of 5 submissions / 10 min per IP (in memory; per instance if hosting is serverless).
- `From` = `CONTACT_FROM_EMAIL` (own domain), `Reply-To` = the sender's email. Message content is never logged.
- With no provider configured, the form shows an error with a `mailto:` link (never a fake confirmation).

### Testing the form

1. Configure the provider in `.env.local` and verify the `bcnshot.com` domain with the provider (whatever SPF/DKIM records it requires).
2. `npm run dev`, open `/es/contacto` (and `/ca/contacto`, `/en/contacto`), send a real message and check that it arrives at `info@bcnshot.com` and that replying reaches the sender.
3. Also test error paths: empty fields, a message that's too short, no consent, and an invalid API key (should show the error with `mailto:`).

## Deployment

Hosting is still **undecided**. Requirement: it must support Next.js with server functions (Server Actions). **Do not** enable `output: "export"`: the form would stop working and `next/image` would need an external loader.

General steps:

1. Configure the environment variables on the platform (`ALLOW_INDEXING=true` only in production).
2. Deploy a staging environment (without `ALLOW_INDEXING`) and review it with Oriol.
3. Resolve every remaining `TODO_PUBLICACION` (search for them in the code) and get Oriol's approval for the copy in the three languages, especially the Catalan and English legal texts.

### Staging environment on Vercel

Vercel detects Next.js automatically: no `vercel.json` needed. The Hobby plan is free but only for non-commercial use: good enough for staging. Production requires deciding on a plan or hosting with Oriol and Marc.

- **Option A — GitHub (recommended, with a preview per push):**
  1. Push the repository to GitHub (private).
  2. On vercel.com → *Add New… → Project* → import the repository. Don't change the build settings.
  3. **Don't** set `ALLOW_INDEXING`: the environment stays `noindex` with `robots.txt` set to `Disallow: /`.
- **Option B — CLI, no GitHub:** `npx vercel login`, then `npx vercel` from the repo root (creates a *preview* deployment).

Current status: project `marc-oriol/bcn-shot` created via the CLI. Staging URL: https://bcn-shot.vercel.app (no `ALLOW_INDEXING`, so `noindex`). To update it: `npx vercel --prod` (or `npx vercel` for a preview protected by Vercel login). Behind the corporate proxy, the CLI can't reach `api.vercel.com` (407).

With no `MAIL_PROVIDER`, the form shows an error with a `mailto:` link (never a fake success). To test real sending, configure the provider and the variables from `.env.example` in *Settings → Environment Variables*.

### Domain and DNS

- Add `bcnshot.com` (and `www`) to the platform and create **only** the web records it asks for (A/AAAA/CNAME).
- **Do not touch** the existing mail records (MX, SPF, DKIM, DMARC) for `info@bcnshot.com`. If the transactional provider requires new records, add them without replacing the existing ones (a single SPF record combining the `include`s).
- After the change, verify that `info@bcnshot.com` still sends and receives mail.

## Outstanding before launch

See Phase 0 of `PLAN.md`: Oriol's review of the photos (selection, cover photo, `alt` text, model releases), final copy, legal identity data (name, NIF, address), hosting and mail provider.
