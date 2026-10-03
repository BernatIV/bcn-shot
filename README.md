# BCN SHOT — web

Web portafolis de BCN SHOT (fotografia de moda, retrat i editorial d'Oriol, Barcelona).
Especificació: `BCN_SHOT_Tech_Specs.md` · Pla i estat: `PLAN.md` · Guia per a agents d'IA: `AGENTS.md`.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Radix Dialog (patró shadcn/ui).

## Posada en marxa

Requisits: Node.js 20.9 o superior (desenvolupat amb Node 24) i npm.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

Scripts:

| Script | Què fa |
| --- | --- |
| `npm run dev` | Servidor de desenvolupament |
| `npm run build` | Build de producció (valida també les dades de fotos) |
| `npm start` | Serveix el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Genera tipus de rutes i executa `tsc` |
| `npm run image -- <original> <id> [--dir=portfolio] [--max=2400] [--quality=85]` | Exporta un original a `public/images/<dir>/<id>.webp` i imprimeix l'entrada per a `content/photos.ts` |

## Variables d'entorn

Vegeu `.env.example`. Mai es commiteja `.env.local`.

| Variable | Ús |
| --- | --- |
| `ALLOW_INDEXING` | `true` només a la producció real. Si no, `noindex` i `robots.txt` amb `Disallow: /`. S'avalua en el build. |
| `MAIL_PROVIDER` | Proveïdor de correu transaccional. Ara mateix només hi ha l'adaptador `resend` (proveïdor encara per decidir). |
| `RESEND_API_KEY` | Clau del proveïdor (només servidor). |
| `CONTACT_FROM_EMAIL` | Remitent del domini autoritzat pel proveïdor, p. ex. `BCN SHOT <web@bcnshot.com>`. |
| `CONTACT_TO_EMAIL` | Destinatari (per defecte `info@bcnshot.com`). |

## Contingut

- **Textos**: `content/copy.ts` (castellà; preparat per afegir altres idiomes).
- **Configuració**: `content/site.ts` (`siteConfig`): correu, domini, Instagram, foto de portada, retrat d'Oriol, logo, navegació.
  - `instagramUrl: null` → no es mostra cap enllaç d'Instagram. Posar-hi l'URL exacta quan estigui confirmada.
  - `heroImage`, `aboutPortrait`, `logo`: ja apunten a actius reals. Si es posen a `null` es mostren marcadors `TODO_PUBLICACION` (o el logo tipogràfic).
- **Fotos**: `content/photos.ts`.
- **Icones i OG**: `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg` (convenció de fitxers de Next; generats des del logo compacte original).

### Afegir o reordenar fotos

1. Guarda l'original **fora del repositori** (`/assets/` i `/originals/` estan al `.gitignore`). Mai a `public/`.
2. Exporta la versió web: `npm run image -- "C:/ruta/originals/foto.jpeg" editorial-01` (WebP sRGB, 2400 px màxim, qualitat 85) → `public/images/portfolio/editorial-01.webp`. L'script imprimeix l'entrada amb les mides reals.
3. Afegeix una entrada a `content/photos.ts`:

   ```ts
   {
     id: "editorial-01",
     src: "/images/portfolio/editorial-01.webp",
     lightboxSrc: "/images/portfolio/editorial-01-large.webp", // opcional
     width: 1600, height: 2000,                                 // mides reals del fitxer src
     alt: "Descripció útil en castellà",
     featured: true,   // apareix a la portada (4–8 en total)
     published: true,  // només amb permís de publicació
     order: 10,        // ordre ascendent; deixa salts (10, 20...) per reordenar fàcilment
   }
   ```

   Opcionals: `title`, `credit`, `shotDate` (`YYYY-MM-DD`, verificat), `location` (només si es pot publicar), `focalPoint` (`{ x, y }` 0–100; activa un retall 4:5 centrat en aquest punt a la graella).
4. `npm run dev` / `npm run build` validen les dades: ids i `order` únics, mides positives, `alt` present i fitxers existents. Si hi ha errors, el build falla.

Mentre `photos` sigui buit, `npm run dev` mostra fotos grises de prova (`content/dev-placeholder-photos.ts`) per poder treballar el disseny. **En producció no apareixen mai**: el portfolio mostra l'estat buit amb CTA.

## Formulari de contacte

- Server Action a `app/contacto/actions.ts`; validació compartida a `lib/contact-validation.ts`; enviament a `lib/mail.ts`.
- Anti-spam: camp trampa (`website`) i límit de 5 enviaments / 10 min per IP (en memòria; per instància si el hosting és serverless).
- `From` = `CONTACT_FROM_EMAIL` (domini propi), `Reply-To` = correu de la persona. No es registra el contingut als logs.
- Sense proveïdor configurat, el formulari mostra un error amb l'enllaç `mailto:` (mai una confirmació falsa).

### Provar el formulari

1. Configura el proveïdor a `.env.local` i verifica el domini `bcnshot.com` al proveïdor (registres SPF/DKIM que indiqui).
2. `npm run dev`, obre `/contacto`, envia un missatge real i comprova que arriba a `info@bcnshot.com` i que en respondre s'adreça a la persona.
3. Prova també errors: camps buits, missatge curt, sense consentiment, i una clau invàlida (ha de mostrar l'error amb `mailto:`).

## Publicació

El hosting encara **no està decidit**. Requisit: ha de suportar Next.js amb funcions de servidor (Server Actions). **No** activar `output: "export"`: el formulari deixaria de funcionar i `next/image` necessitaria un loader extern.

Passos generals:

1. Configurar les variables d'entorn a la plataforma (`ALLOW_INDEXING=true` només a producció).
2. Desplegar un entorn de prova (sense `ALLOW_INDEXING`) i revisar-lo amb Oriol.
3. Completar tots els `TODO_PUBLICACION` (cerca'ls al codi) i les pàgines legals.

### Entorn de prova a Vercel

Vercel detecta Next.js automàticament: no cal `vercel.json`. El pla Hobby és gratuït però només per a ús no comercial: serveix per a la prova. La producció requereix decidir el pla o hosting amb Oriol i Marc.

- **Opció A — GitHub (recomanada, amb previews per cada push):**
  1. Pujar el repositori a GitHub (privat).
  2. A vercel.com → *Add New… → Project* → importar el repositori. No canviar la configuració de build.
  3. **No** definir `ALLOW_INDEXING`: l'entorn queda amb `noindex` i `robots.txt` amb `Disallow: /`.
- **Opció B — CLI, sense GitHub:** `npx vercel login` i després `npx vercel` des de l'arrel del repo (crea un desplegament de *preview*).

Estat actual: projecte `marc-oriol/bcn-shot` creat amb la CLI. URL de prova: https://bcn-shot.vercel.app (sense `ALLOW_INDEXING`, per tant `noindex`). Per actualitzar-la: `npx vercel --prod` (o `npx vercel` per a una preview protegida amb login de Vercel). Darrere del proxy corporatiu, la CLI no arriba a `api.vercel.com` (407).

Sense `MAIL_PROVIDER`, el formulari mostra un error amb l'enllaç `mailto:` (mai un èxit fals). Per provar l'enviament real cal configurar el proveïdor i les variables de `.env.example` a *Settings → Environment Variables*.

### Domini i DNS

- Afegir `bcnshot.com` (i `www`) a la plataforma i crear **només** els registres web que demani (A/AAAA/CNAME).
- **No tocar** els registres de correu existents (MX, SPF, DKIM, DMARC) de `info@bcnshot.com`. Si el proveïdor transaccional demana registres nous, afegir-los sense substituir els actuals (un sol registre SPF: combinar-hi els `include`).
- Després del canvi, verificar que el correu d'`info@bcnshot.com` continua rebent i enviant.

## Pendents abans de publicar

Vegeu la Fase 0 de `PLAN.md`: validació d'Oriol de les fotos (selecció, portada, `alt`, permís de les models), URL d'Instagram, textos definitius, dades legals, hosting i proveïdor de correu.
