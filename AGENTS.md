# AGENTS.md — BCN SHOT

Guia ràpida per a agents d'IA. Font de veritat: `BCN_SHOT_Tech_Specs.md` (si hi ha conflicte, mana l'spec). Pla de treball: `PLAN.md`.

## Què és

Web portafolis de **BCN SHOT**, fotografia de moda, retrat i editorial d'**Oriol** (Barcelona). Objectiu: mostrar l'estil i portar l'usuari a **«Reserva tu sesión»** → `/contacto`.

- Domini: `https://bcnshot.com` · Correu: `info@bcnshot.com`
- Idioma de la web: **castellà** (`lang="es"`). Preparar per a català/anglès més endavant, però **sense** crear rutes d'idioma buides.
- Persones: Oriol (fotògraf, aprova continguts), Marc (desenvolupament i decisions tècniques).

## Estat actual

Fases 1–4 implementades (vegeu `PLAN.md`). Ja hi ha 9 fotos reals, logo, retrat d'Oriol, favicon i imatge OG (originals fora del repo). Falten la validació d'Oriol (selecció, alt, permisos), decisions (hosting, proveïdor de correu, Instagram) i pàgines legals. Cerca `TODO_PUBLICACION` per veure tot el que queda pendent al codi.

## Next.js 16: llegeix la documentació local

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Diferències ja trobades en aquest projecte:

- `next/image`: `priority` està obsolet → fer servir `preload` (o `loading="eager"`/`fetchPriority`). `qualities` per defecte és `[75]`. SVG locals es serveixen sense optimitzar automàticament.
- `next lint` ja no existeix: `npm run lint` crida `eslint` directament (flat config).
- `LayoutProps` / `PageProps` són tipus globals generats: `npm run typecheck` executa `next typegen` abans de `tsc`.
- `headers()`, `cookies()`, `params`, `searchParams` són asíncrons.
- `middleware` s'anomena ara `proxy`. `next dev` escriu a `.next/dev`.

## Stack tècnic (decidit)

- **Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS 4** (configuració CSS-first a `app/globals.css`, sense `tailwind.config`).
- Patró **shadcn/ui** només on aporta accessibilitat: el menú mòbil i el visor fan servir `@radix-ui/react-dialog` directament. El registre de shadcn no és accessible des de la xarxa corporativa (proxy 407), per això els components s'escriuen a mà seguint el mateix patró (`lib/cn.ts` = `clsx` + `tailwind-merge`). La resta de controls són HTML natiu.
- Contingut en **fitxers TypeScript locals**: sense CMS ni base de dades.
- Fonts: **Manrope** (títols, `font-display`) i **Inter** (cos, `font-sans`) via `next/font/google` (autoallotjades en el build).
- **No** activar `output: 'export'` (el formulari és una Server Action).
- Correu: `lib/mail.ts` amb adaptador `resend` via `fetch` (sense SDK) activat només per variables d'entorn. **Proveïdor pendent de decidir**: no contractar res amb cost sense Oriol i Marc.
- Hosting: **pendent de decidir**. Entorn de prova a Vercel (Hobby, CLI): https://bcn-shot.vercel.app, amb `noindex`.
- Sense llibreria de validació: `lib/contact-validation.ts` és a mà i compartit client/servidor.

## Ordres

```bash
npm run dev        # desenvolupament (mostra fotos placeholder si content/photos.ts és buit)
npm run build      # build de producció (valida content/photos.ts)
npm run lint
npm run typecheck
npm run image -- <original> <id> [--dir=portfolio|site] [--max=2400] [--quality=85]   # exporta WebP a public/images/<dir>/<id>.webp (sharp)
```

No hi ha tests automatitzats. Per verificar UI s'ha fet servir `playwright-core` amb Edge (`channel: "msedge"`) des d'una carpeta temporal fora del repo; cal `NO_PROXY=localhost` pel proxy corporatiu.

## Estructura

```
app/
  layout.tsx               html lang="es", fonts, metadades base, skip link, header/footer
  page.tsx                 portada: hero, destacades, proposta, presentació, CTA final
  portfolio/page.tsx       graella + visor (o estat buit)
  sobre-mi/page.tsx
  contacto/page.tsx        + actions.ts (Server Action sendContact)
  aviso-legal/, privacidad/  marcadors TODO_PUBLICACION (no textos legals inventats)
  robots.ts, sitemap.ts, not-found.tsx
  icon.png, apple-icon.png, opengraph-image.jpg (+ .alt.txt)   generats des del logo compacte original
components/
  site-header, site-footer, logo, nav-links (ruta activa), mobile-nav (Radix Dialog)
  photo-grid + lightbox (Radix Dialog), contact-form, cta-section
  pending-asset (placeholder explícit), legal-pending, icons, ui/button, ui/container
content/
  site.ts                  siteConfig: correu, domini, instagramUrl, heroImage, aboutPortrait, logo, nav, decisions UI
  copy.ts                  tots els textos visibles (castellà)
  photos.ts                fotos reals (9, alt proposats pendents de validar)
  dev-placeholder-photos.ts  només per a `next dev` quan photos és buit
  types.ts                 PortfolioPhoto, SiteImage
lib/
  photos.ts                selecció/ordre + validació de dades (server-only, fa servir fs)
  contact-validation.ts, mail.ts, rate-limit.ts, metadata.ts (pageMetadata), env.ts, cn.ts, focal-point.ts
scripts/export-image.mjs   exportació d'originals a WebP (npm run image)
public/images/             NOMÉS derivats web: portfolio/*.webp, site/logo.png, site/oriol-retrato.webp, placeholders/ (només dev)
```

Decisions provisionals (canviables a `content/site.ts`): les destacades de portada enllacen a `/portfolio` (`featuredBehavior`), i el visor cicla als extrems (`lightboxLoop: true`).

## Regles no negociables

1. **No inventar** fotos, testimonis, preus, anys d'experiència, clients, credencials, dades legals ni l'URL d'Instagram. Si falta alguna cosa: marcador explícit (`TODO_PUBLICACION` / placeholder visible) i anotar-ho al lliurament.
2. **Cap imatge de stock o generada** que sembli obra d'Oriol. Placeholders clarament identificables.
3. Instagram: només es mostra quan l'URL estigui confirmada a `siteConfig`; si és buida, no es renderitza cap enllaç.
4. **Sense trackers, píxels ni cookies de seguiment** a la V1. Res d'incrustacions d'Instagram.
5. No fer: blog, botiga, pagaments, comptes d'usuari, agenda, galeries amb contrasenya.
6. Copy: no dir que fa vídeo/so, no limitar a dones, no publicar límits d'edat o criteris físics, no prometre disponibilitat, terminis ni tarifes.
7. Secrets només en variables d'entorn (`.env.local`, mai commitejat). Proporcionar `.env.example`.
8. Formulari: mai simular un enviament. Confirmació només si el proveïdor accepta el missatge. No registrar el contingut dels missatges en logs.
9. No tocar registres DNS de correu existents.

## Sistema de disseny

Tokens (definits a `@theme` d'`app/globals.css`; classes `bg-background`, `text-muted`, `border-border`, `bg-accent`...; també `max-w-site` = 1440 px, `rounded-button`, `font-display`):

| Token | Valor |
| --- | --- |
| `background` | `#F7F6F2` |
| `surface` | `#FFFFFF` |
| `foreground` | `#171717` |
| `muted` | `#66645F` |
| `border` | `#D9D7D0` |
| `accent` | `#171717` |
| `accent-foreground` | `#FFFFFF` |

Estil editorial, sobri i premium: fotos grans, molt aire, text curt, sense degradats, ombres prominents ni animacions vistoses. Cos ≥16 px, línies de 65–75 caràcters, espaiat 4/8 px, marges 20–24 px (mòbil) i 40–64 px (escriptori), contenidor ~1440 px, botons lleugerament arrodonits. Logo real (`public/images/site/logo.png`) configurat a `siteConfig.logo`; si és `null`, `components/logo.tsx` mostra un logo tipogràfic.

## Model de dades del portafolis

```ts
export type PortfolioPhoto = {
  id: string; src: string; lightboxSrc?: string;
  width: number; height: number; alt: string;
  title?: string; shotDate?: string; location?: string; credit?: string;
  focalPoint?: { x: number; y: number }; // 0..100
  featured: boolean; published: boolean; order: number;
};
```

- Portfolio: `published: true`, ordenat per `order` ascendent. Portada: `featured` (4–8 fotos).
- Validació automàtica a `lib/photos.ts` (en `next dev` i `next build`): `id`/`order` únics, fitxers existents, `width`/`height` > 0, `alt` present. Avís si les destacades no són 4–8.
- `focalPoint` és l'únic cas en què la graella del portfolio retalla (4:5); sense ell es conserva la relació d'aspecte.
- No mostrar etiquetes buides ni metadades sobreimpreses a totes les fotos.

## Requisits clau per funcionalitat

- **Navegació**: Portfolio, Sobre mí, Contacto + CTA. Menú mòbil accessible (botó etiquetat, Escape, tanca en navegar, gestió de focus). Ruta activa visible.
- **Graella**: 1/2/3 columnes, sense deformar, `next/image` amb dimensions, lazy excepte el hero/primer viewport. Estat buit digne amb CTA si no hi ha fotos.
- **Visor**: diàleg accessible, fons fosc, tancar/anterior/següent, fletxes i Escape, swipe, focus atrapat i retornat a la miniatura, scroll bloquejat, indicador «3 / 12», `prefers-reduced-motion`.
- **Formulari** (`/contacto`): nom (req, ≤100), email (req, ≤254), tipus (`Sesión` | `Colaboración TFP` | `Otra`), missatge (req, 10–2000), consentiment (req, no premarcat, enllaç a `/privacidad`). Validació client + servidor amb el mateix esquema, errors en castellà associats als camps, conserva dades, botó desactivat en enviar, honeypot + rate limit, `From` del domini i `Reply-To` de l'usuari, error amb `mailto:` alternatiu.
- **SEO/a11y/perf**: un H1 per pàgina, metadades úniques, canònica, OG, `sitemap.xml`, `robots.txt` (no indexar entorns de prova), WCAG 2.2 AA, sense JSON-LD amb afirmacions no verificades. Objectiu Lighthouse mòbil: Perf ≥90, A11y/BP/SEO ≥95.
- **Legals**: `/aviso-legal` i `/privacidad` amb `TODO_PUBLICACION` fins que Oriol validi; no posar textos genèrics inventats.

## Convencions

- Codi simple i mantenible; separar dades, components i rutes.
- Server Components per defecte; `"use client"` només on calgui (menú, visor, formulari).
- Textos visibles sempre a `content/copy.ts` (no escampats pels components). Noms de fitxers estables i descriptius (kebab-case). Comentaris de codi en català.
- Metadades de pàgina amb `pageMetadata()` de `lib/metadata.ts` (canònica i OG per pàgina).
- Actualitzar `README.md`, `PLAN.md` i aquest fitxer quan canviïn decisions o l'estat.

## Decisions pendents (no assumir-les)

- Hosting / plataforma de desplegament.
- Proveïdor de correu transaccional (hi ha l'adaptador `resend`, però no està triat).
- URL d'Instagram (`siteConfig.instagramUrl`). El splash mostra «@bcnshot», però cal confirmar l'URL exacta.
- Fotos destacades: obrir visor o enllaçar a `/portfolio` (provisional: enllaç).
- Visor: ciclar o desactivar als extrems (provisional: cicla).
- Validació d'Oriol: selecció de fotos, portada, `alt` proposats i permís de publicació de les models (s'ha assumit `published: true`).
- Textos definitius i dades legals.
