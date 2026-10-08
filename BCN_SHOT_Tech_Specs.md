# BCN SHOT — especificacions per construir la web

Versió 1.0 · 28 de setembre de 2026 · Document per a Marc i l'agent de programació

## Instrucció per a l'agent

Construeix una web funcional, responsive i llesta per revisar a partir d'aquest document. Prioritza un resultat visual excel·lent amb codi simple i fàcil de mantenir. No inventis fotos, testimonis, preus, experiència, credencials ni dades legals. Si falta un actiu o una dada, utilitza un marcador explícit al codi i comunica-ho al lliurament. No publiquis ni connectis serveis amb cost sense que Oriol i Marc ho decideixin. El domini és `bcnshot.com` i el correu professional és `info@bcnshot.com`; el proveïdor de hosting encara no està decidit.

## 1. Context del producte i objectius

**Marca:** BCN SHOT, projecte de fotografia de moda, retrat i editorial d'Oriol, amb base a Barcelona. Les sessions es poden fer en exteriors a Barcelona o en altres ubicacions acordades; el text no ha de limitar artificialment l'àmbit. L'audiència són models, aspirants a models i persones interessades en una sessió de moda o retrat. La web també ha de donar confiança a possibles col·laboradores TFP i a clients que vulguin reservar.

**Objectiu principal:** que una persona que veu les fotos entengui ràpidament quin estil ofereix Oriol i iniciï una conversa per sol·licitar una sessió. **Objectius secundaris:** mostrar treball seleccionat, reforçar la credibilitat, donar accés a Instagram i facilitar que el projecte creixi sense refer-lo.

**Sensació:** editorial de moda contemporània, premium, humana i sòbria. Fotos grans, molt aire, composició precisa, text curt, cap efecte vistós que competeixi amb les fotografies. No donar a entendre que Oriol fa vídeo o so. No dir que només fotografia dones ni publicar límits d'edat o criteris físics.

**Idioma inicial de la web:** castellà, perquè el públic objectiu és Barcelona i la comunicació comercial del projecte ja és en castellà. Preparar el contingut per poder afegir català i anglès després, sense crear rutes idiomàtiques buides ara. El text entre cometes en aquest document és proposta editable, no una afirmació factual sobre trajectòria.

**Conversió prioritària:** botó «Reserva tu sesión» cap a `/contacto`, accessible des de capçalera, portada, portafolis i peu. Canal alternatiu visible: enllaç `mailto:info@bcnshot.com`. Enllaç a Instagram quan Marc confirmi l'URL exacta del compte BCN SHOT; no deduir-la a partir del nom de marca.

**Mètriques inicials:** clics al CTA, formularis lliurats correctament i clics al correu/Instagram. No afegir rastrejadors ni píxels en la primera versió; si després s'hi incorporen, revisar prèviament el consentiment i els textos legals.

## 2. Arquitectura de la informació

| Ruta | Seccions | Finalitat |
| --- | --- | --- |
| `/` | Capçalera, portada amb foto protagonista, selecció de treballs, proposta breu, presentació d'Oriol, CTA final, peu | Presentar estil i conduir al contacte |
| `/portfolio` | Títol breu, graella completa, visor de fotos | Explorar el treball sense distraccions |
| `/sobre-mi` | Retrat real d'Oriol, text breu sobre l'enfocament, CTA | Posar cara i context al fotògraf |
| `/contacto` | Text d'invitació, formulari, correu, Instagram si es confirma | Rebre sol·licituds |
| `/aviso-legal` | Text legal validat | Identificació i informació legal |
| `/privacidad` | Text de privacitat validat | Informació sobre dades del formulari |

Navegació principal: «Portfolio», «Sobre mí», «Contacto» i CTA «Reserva tu sesión». Logotip BCN SHOT enllaçat a inici. No crear blog, botiga, pagaments, compte d'usuari, agenda automàtica ni galeria amb contrasenya en aquesta fase. El peu inclou correu, Instagram confirmat, avís legal i privacitat.

### Textos inicials suggerits

- Portada H1: «Fotografía de moda y retrato en Barcelona».
- Subtítol: «Imágenes con personalidad, creadas para mostrar tu estilo».
- CTA principal: «Reserva tu sesión»; CTA secundari: «Ver portfolio».
- Sobre mi: «Soy Oriol, fotógrafo en Barcelona. Me interesa crear retratos y editoriales con una estética cuidada y una conexión natural con cada persona». Ajustar amb la seva veu abans de publicar.
- Contacte: «Cuéntame qué tienes en mente: una sesión personal, un editorial o una colaboración».

No prometre disponibilitat, terminis de lliurament, resultats ni tarifes que encara no s'han definit.

## 3. Especificacions i criteris d'acceptació

### 3.1 Estructura comuna i navegació

- La capçalera mostra marca, navegació i CTA. Al mòbil, el menú s'obre amb botó etiquetat i es pot tancar amb Escape, el botó de tancar i després de seguir un enllaç. El focus no queda perdut ni sota el menú.
- La ruta activa és identificable; els enllaços funcionen també amb teclat. Cap element interactiu essencial depèn d'un gest hover.
- El peu és coherent a totes les pàgines. No es mostra un enllaç d'Instagram incomplet.
- Els enllaços a xarxes externes obren correctament i porten un nom accessible.

### 3.2 Portada

- Hero amb una fotografia real autoritzada, retall responsive controlat i text llegible. Si no hi ha foto aprovada, deixar un placeholder explícit en desenvolupament: cap imatge sintètica o de stock que sembli obra d'Oriol.
- La selecció de treballs presenta entre 4 i 8 fotos destacades definides al fitxer de dades. Cada foto navega a `/portfolio` o obre el visor si així ho decideix Marc; el comportament ha de ser consistent i clar.
- El CTA principal apareix a la primera pantalla en mòbil i es repeteix al final. El nom i l'activitat són comprensibles sense necessitat de fer scroll llarg.

### 3.3 Graella del portafolis

- Mostrar totes les fotos amb permís de publicació i `published: true`, ordenades per `order` ascendent. Suportar retrats verticals i horitzontals sense deformar-los. En mòbil (1 columna) es conserva la relació d'aspecte original i només es retalla on es defineixi `focalPoint`. A partir de 2 columnes, totes les miniatures es retallen a una proporció uniforme 4:5 (centrada, o al `focalPoint` si existeix) perquè la graella quedi regular; la foto sencera, sense retall, es veu sempre al lightbox.
- Una graella editorial responsive: 1 columna en mòbil estret, 2 en tauleta i 3 en escriptori com a punt de partida; ajustar si la composició fotogràfica ho demana.
- Les imatges sota el primer viewport carreguen amb lazy loading. Fer servir dimensions conegudes per reservar espai i evitar salts. Cada imatge té `alt` descriptiu; si és purament decorativa, alt buit.
- No mostrar títols, dates o ubicacions en sobreimpressió sobre totes les fotos. Mostrar metadades només quan siguin reals i aportin valor; `location` és opcional i no ha de revelar llocs sensibles.
- Si no hi ha fotos aprovades, pantalla d'estat buit digna i CTA a contacte; no publicar una web que sembli un portafolis complet sense fotografies.

### 3.4 Visor de fotos

- Obrir en tocar/clicar una foto de `/portfolio`; la imatge es mostra gran, íntegra i sense distorsió, amb fons fosc i controls discrets de tancar, anterior i següent.
- Controls amb ratolí, tacte i teclat: Escape tanca; fletxes canvien de foto. Al mòbil, els botons són prou grans. Fer servir un diàleg accessible amb focus inicial al tancament, focus contingut mentre és obert, scroll de fons bloquejat i retorn de focus a la miniatura original.
- Mostrar posició «3 / 12», títol només si existeix. No hi ha navegació fora de rang: anterior i següent ciclen de manera coherent o es desactiven, però la decisió és uniforme.
- Respectar `prefers-reduced-motion`; les animacions són subtils i prescindibles. Evitar descarregar originals gegants a la graella; el visor pot fer servir una versió més gran optimitzada.

### 3.5 Sobre mi

- Fer servir una fotografia real d'Oriol aprovada per ell. Text breu i creïble, sense atribuir-li anys d'experiència o clients no verificats. CTA cap a contacte.
- Maquetació agradable tant amb retrat com si encara falta la fotografia (estat de desenvolupament visible).

### 3.6 Contacte i formulari

- Camps: nom (`required`, màxim 100), correu (`required`, format email, màxim 254), tipus de consulta (`Sesión`, `Colaboración TFP`, `Otra`), missatge (`required`, de 10 a 2.000 caràcters), casella de consentiment de privacitat (`required`, sense premarcar) amb enllaç a `/privacidad`. Telèfon i pressupost no són obligatoris en aquesta versió.
- Etiquetes sempre visibles, validació comprensible en castellà, missatges d'error associats als camps i resum accessible quan calgui. Conservar les dades introduïdes si hi ha un error. Desactivar el botó mentre s'envia per impedir duplicats.
- A l'enviament, validar també al servidor, utilitzar protecció bàsica contra spam (camp trampa i límit de peticions), no exposar credencials al navegador i enviar la consulta a `info@bcnshot.com` mitjançant un proveïdor transaccional configurat amb variables d'entorn. `Reply-To` ha de ser el correu de la persona; el `From` ha de pertànyer al domini i estar autoritzat pel servei. No fer spoofing del remitent.
- Mostrar confirmació només quan el servei d'enviament hagi acceptat el missatge. Si falla, mostrar un error útil amb enllaç `mailto:info@bcnshot.com`; no afirmar que s'ha enviat. No registrar el contingut del missatge en logs.
- Si el desplegament escollit és purament estàtic i no admet backend, Marc ha d'escollir explícitament entre funció externa segura i una primera versió amb enllaç de correu; no simular un formulari que no envia.

### 3.7 SEO, accessibilitat i rendiment

- `lang="es"`, un H1 per pàgina, jerarquia de títols coherent, títol i descripció únics, URL canònica `https://bcnshot.com`, favicon i imatge Open Graph amb actius aprovats. Generar `sitemap.xml` i `robots.txt`; no indexar entorns de prova.
- Contingut renderitzat per a cercadors, no tot amagat darrere de JavaScript. Evitar SEO inventat, agregats de valoració i dades estructurades amb afirmacions no verificades.
- Contrast suficient, focus visible, navegació de teclat, labels, textos alternatius, zoom al 200% i opció de moviment reduït. Objectiu WCAG 2.2 AA per als fluxos essencials.
- Prioritzar formats WebP/AVIF amb fallback quan calgui, variants responsive i originals preservats fora dels actius públics. La foto principal no es carrega en lazy; la resta sí. Evitar vídeos automàtics, llibreries d'animació pesants i incrustacions d'Instagram que perjudiquin càrrega o privacitat.
- Meta de revisió: Lighthouse mòbil de producció amb Performance ≥90, Accessibility ≥95, Best Practices ≥95 i SEO ≥95, subjecte a les fotos finals i al hosting. Corregir errors reals abans de perseguir puntuacions.

### 3.8 Privacitat i contingut

- Només fotografies amb drets i permisos necessaris d'ús al web; revisar especialment autorització de les persones retratades i crèdits acordats. No exposar noms, comptes socials, dates o ubicacions de models sense permís.
- Els textos de `/aviso-legal` i `/privacidad` necessiten dades reals d'Oriol, proveïdor d'allotjament i servei de formulari. Marcar-los com `TODO_PUBLICACION` fins que Oriol els revisi; el llançament públic queda condicionat a completar-los. No col·locar un avís legal genèric inventat.
- No afegir cookies de seguiment en la V1. Les cookies estrictament necessàries, si apareixen per la plataforma, s'han d'identificar en la informació de privacitat; determinar si cal algun mecanisme de consentiment segons la implementació final.

## 4. Sistema de disseny i stack tècnic

### Direcció visual

| Token | Valor inicial | Ús |
| --- | --- | --- |
| `background` | `#F7F6F2` | Fons càlid, discret |
| `surface` | `#FFFFFF` | Formulari i superfícies |
| `foreground` | `#171717` | Text i logotip |
| `muted` | `#66645F` | Metadades i textos secundaris |
| `border` | `#D9D7D0` | Separadors subtils |
| `accent` | `#171717` | Botó principal |
| `accent-foreground` | `#FFFFFF` | Text del botó principal |

Tipografia: **Manrope** per als encapçalaments i **Inter** per al cos, amb fonts locals o optimitzades pel framework i fallbacks `sans-serif`. Revisar llicències en incorporar fitxers de font. H1 editorial gran però sense tapar la foto. Cos mínim 16 px; amplada de text aproximada 65–75 caràcters. Escala d'espaiat basada en 4/8 px; marges mòbil 20–24 px i escriptori 40–64 px. Contenidor màxim aproximat 1440 px. Botons amb cantonades molt lleugerament arrodonides, sense degradats ni ombres prominents. La marca existent «bcn SHOT» s'ha de reproduir des del fitxer final que aporti Oriol; mentre falti, fer un tractament tipogràfic provisional clarament substituïble.

### Implementació recomanada

- Next.js amb App Router, TypeScript, Tailwind CSS i components propis. shadcn/ui només per a peces que aportin accessibilitat i manteniment (per exemple Dialog i camps); adaptar-ne el disseny a la marca. Instal·lar les versions estables compatibles en el moment de crear el projecte, sense barrejar guies de Tailwind de versions diferents.
- Fotos i contingut en fitxers locals tipats, sense CMS ni base de dades en V1. Separar dades, components i rutes. Reservar un fitxer `siteConfig` per correu, domini, enllaç d'Instagram i metadades. No codificar secrets en el repositori.
- Desplegament a decidir amb Marc. Si hi ha formulari de servidor, seleccionar hosting que admeti aquesta ruta/funció; no activar `output: 'export'` per defecte. Amb exportació estàtica, l'optimització integrada d'imatges de Next pot necessitar un loader compatible i el formulari necessita un servei extern o un altre canal.
- Incloure `README.md` amb instal·lació, configuració d'entorn, com afegir/reordenar fotos, executar el projecte, publicar-lo, configurar domini/DNS i provar el formulari. No alterar els registres DNS de correu existents en connectar el domini; verificar la configuració abans de canviar-los.

Estructura orientativa: `app/` per rutes i metadades, `components/` per UI, `content/photos.ts`, `content/site.ts`, `public/images/` per versions web aprovades, `lib/` per validació i enviament, `styles/` si cal. Noms de fitxers estables i descriptius.

## 5. Estructura de dades del portafolis

Definir un tipus TypeScript i dades separades de la UI. Els valors següents són només exemple estructural: **no són fotos reals**.

```ts
export type PortfolioPhoto = {
  id: string;                 // estable i únic
  src: string;                // versió web, ruta local o URL controlada
  lightboxSrc?: string;       // versió més gran, optimitzada
  width: number;              // píxels reals de la versió web
  height: number;
  alt: string;                // descripció útil en castellà
  title?: string;
  shotDate?: string;          // ISO YYYY-MM-DD, només si és verificat
  location?: string;          // només si es pot publicar
  credit?: string;            // acordat amb la model / equip
  focalPoint?: { x: number; y: number }; // 0..100 per als retalls
  featured: boolean;
  published: boolean;
  order: number;
};

export const photos: PortfolioPhoto[] = [];
```

Validar en desenvolupament que `id` i `order` no es dupliquen, que les rutes existeixen, que `width`/`height` són positius i que totes les fotos publicades tenen `alt` adequat. `featured` controla la selecció de portada. El crèdit es mostra segons l'acord, i l'absència de dades opcionals no deixa etiquetes buides. Les fotos originals es guarden fora de `public/`; exportar derivats per web sense perdre el perfil de color adequat.

## Lliurament i definició d'acabat

L'agent ha de lliurar el repositori, instruccions de posada en marxa, vista local o de prova i llista breu de dades pendents. La web està llesta per publicar quan: totes les rutes i CTAs funcionen; portafolis i visor funcionen en mòbil i ordinador; el formulari arriba a `info@bcnshot.com` amb prova real i mostra errors reals; els actius i textos són aprovats; les pàgines legals estan completades; SEO bàsic i accessibilitat revisats; el DNS del correu continua funcionant.

### Material que Oriol ha de facilitar a Marc

1. Selecció d'unes 8–15 fotos definitives i autoritzades, indicant quines van a portada i l'ordre preferit.
2. Logotip final en format adequat i un retrat propi per a «Sobre mí».
3. URL exacta d'Instagram de BCN SHOT, text personal definitiu i preferències de contacte.
4. Dades necessàries per als textos legals i decisió sobre hosting/proveïdor del formulari.

**Fonts tècniques oficials per a Marc:** [Next.js App Router i metadades](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [exportació estàtica de Next.js](https://nextjs.org/docs/app/guides/static-exports), [Tailwind amb Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) i [shadcn/ui amb Next.js](https://ui.shadcn.com/docs/installation/next).
