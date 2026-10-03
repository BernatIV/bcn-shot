# PLAN.md — BCN SHOT

Pla d'implementació basat en `BCN_SHOT_Tech_Specs.md`. Context i regles per a agents: `AGENTS.md`.
Marca l'estat de cada tasca (`[ ]` pendent, `[x]` fet) a mesura que s'avança.

## Fase 0 — Decisions i material (Oriol / Marc)

Bloquegen la publicació, no el desenvolupament (es treballa amb placeholders).

- [ ] Hosting (ha de suportar rutes de servidor si hi ha formulari).
- [ ] Proveïdor de correu transaccional + verificació del domini (`From` a `@bcnshot.com`).
- [ ] URL exacta d'Instagram.
- [ ] Comportament de les fotos de portada: obrir visor o anar a `/portfolio`.
- [ ] Visor als extrems: ciclar o desactivar.
- [ ] 8–15 fotos autoritzades, destacades i ordre. *Hi ha 9 fotos integrades (6 destacades). Pendent que Oriol validi la selecció, els `alt` i el permís de les models.*
- [x] Logo final i retrat d'Oriol.
- [ ] Textos definitius (Sobre mí, contacte) i dades legals.

## Fase 1 — Base del projecte

- [x] Crear projecte Next.js (App Router, TypeScript, Tailwind, ESLint) amb versions estables actuals.
- [x] Dialog accessible amb `@radix-ui/react-dialog` (patró shadcn; el registre de shadcn està bloquejat pel proxy). Formularis amb HTML natiu.
- [x] Configurar tokens de disseny (colors, espaiat, contenidor) a Tailwind.
- [x] Carregar Manrope i Inter amb `next/font`.
- [x] `content/site.ts` (`siteConfig`: domini, correu, Instagram opcional, metadades, textos).
- [x] `content/photos.ts` amb el tipus `PortfolioPhoto`, array buit/placeholders i validació en dev.
- [x] `.env.example`, `.gitignore` (inclou `.env*.local`), `README.md` inicial.

## Fase 2 — Layout comú

- [x] `app/layout.tsx` amb `lang="es"`, metadades base, fonts.
- [x] `Header`: logo provisional, nav, CTA «Reserva tu sesión», ruta activa.
- [x] Menú mòbil accessible (Escape, botó tancar, tanca en navegar, focus).
- [x] `Footer`: correu, Instagram (només si confirmat), avís legal, privacitat.
- [x] Components base: `Button`, `Container`, `Placeholder` explícit per a imatges pendents.

## Fase 3 — Pàgines

- [x] `/` — Hero (foto prioritària, no lazy; CTA visible en mòbil), selecció destacada (4–8), proposta breu, presentació d'Oriol, CTA final.
- [x] `/portfolio` — graella 1/2/3 columnes, `next/image` amb dimensions, lazy loading, `focalPoint`, estat buit amb CTA.
- [x] Visor (lightbox) — diàleg accessible, teclat/tacte/ratolí, focus i scroll, «n / total», reduced motion, `lightboxSrc`.
- [x] `/sobre-mi` — retrat (o placeholder), text breu, CTA.
- [x] `/aviso-legal` i `/privacidad` — estructura amb `TODO_PUBLICACION`.

## Fase 4 — Contacte

- [x] Esquema de validació compartit (`lib/`) amb els límits de l'spec i missatges en castellà.
- [x] Formulari client: labels visibles, errors per camp + resum, conserva dades, botó desactivat en enviar.
- [x] Endpoint de servidor (Route Handler o Server Action): revalidació, honeypot, rate limit, sense logs del contingut.
- [x] Integració amb el proveïdor (env vars), `From` del domini, `Reply-To` de l'usuari. Adaptador `resend` preparat; **proveïdor pendent de decidir i provar amb enviament real**.
- [x] Estats d'èxit real i d'error amb enllaç `mailto:info@bcnshot.com`.
- [ ] Si el hosting final és estàtic: decisió explícita de Marc (funció externa o només `mailto:`).

## Fase 5 — SEO, accessibilitat i rendiment

- [x] Metadades úniques per pàgina, canònica `https://bcnshot.com`, favicon, imatge OG (actius aprovats). *Favicon, apple-icon i OG generats del logo compacte.*
- [x] `app/sitemap.ts` i `app/robots.ts` (no indexar entorns de prova).
- [ ] Revisió WCAG 2.2 AA: contrast, focus, teclat, zoom 200%, alt, reduced motion.
- [x] Imatges WebP/AVIF i variants responsive; originals fora de `public/`. *Originals fora del repo, derivats WebP amb `npm run image`, i `next/image` serveix AVIF/WebP amb `srcset`.*
- [ ] Lighthouse mòbil: Perf ≥90, A11y/BP/SEO ≥95.

## Fase 6 — Lliurament i publicació

- [x] `README.md` complet: instal·lació, env, afegir/reordenar fotos, executar, publicar, domini/DNS, provar formulari.
- [ ] Desplegament de prova (noindex) i revisió amb Oriol.
- [ ] Substituir placeholders per actius i textos aprovats; completar pàgines legals.
- [ ] Prova real del formulari fins a `info@bcnshot.com`.
- [ ] Connectar domini sense alterar els registres DNS de correu; verificar el correu després.
- [ ] Llista de dades pendents comunicada.

## Definició d'acabat

Totes les rutes i CTAs funcionen; portafolis i visor funcionen a mòbil i escriptori; el formulari arriba a `info@bcnshot.com` amb prova real i mostra errors reals; actius i textos aprovats; pàgines legals completades; SEO i accessibilitat revisats; el DNS del correu segueix funcionant.
