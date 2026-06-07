# Codebase Inconsistencies Report

> Audit generale del codebase a seguito del refactor del custom cursor system
> (commit `2bb0122`). Identifica pattern ricorrenti non ancora standardizzati,
> magic numbers, duplicazioni e potenziali bug prima di un'eventuale ondata di
> refactor di consolidamento.

**Scope:** tutti i 93 file TS/TSX in `src/`, i CSS globali e i CSS dei progetti
custom, i constants e i type files.

**Esclusioni:** la cartella `public/projects/...` contiene duplicati generati
dallo script `scripts/init-projects.ts` (build-time). Non inclusa nell'audit
manuale.

---

## Indice delle Aree Trovate

| # | Area | Severità | File Coinvolti |
|---|------|----------|----------------|
| 1 | Arbitrary values ricorrenti | Media | 6 |
| 2 | `CSS_VARIABLES` non usato in animate/inline style | Media | 5 |
| 3 | `cn()` vs template literal in className | Bassa | 4 |
| 4 | Focus-visible pattern non uniforme | Bassa | 9 |
| 5 | `cursor-pointer` come fallback solo in 2 file | Bassa | 2 |
| 6 | Transition class CSS pattern frammentato | Bassa | 4 |
| 7 | "Section label" pattern duplicato (uppercase tracking) | Media | 8 |
| 8 | "Display heading" scale pattern duplicato | Media | 6 |
| 9 | Inline `style={{ fontFamily }}` ridondante | Bassa | 2 |
| 10 | Hex colors in `constants/projects.ts` duplicati dai CSS vars | Bassa | 1 |
| 11 | `aria-label` malformato in `ProjectsTitle` | **Alta (bug)** | 1 |
| 12 | `createFadeUpVariants(...)` con args identici duplicati | Bassa | 2 |
| 13 | `animate.color` / `whileHover.color` block identico in 2 file | Bassa | 2 |
| 14 | `font-mono` con arbitrary sizes nel Leonardo UI | Media | 1 |
| 15 | `STAGGER_FADE_UP` vs `createFadeUpVariants` pattern sovrapposti | Bassa | 3 |
| 16 | `transition-all` senza `ease-out` in 2 file, con in 1 | Bassa | 3 |
| 17 | `text-md` (Tailwind 4 inesistente) usato come `text-base+1` | Bassa | 1 |
| 18 | `flex items-center justify-start gap-4` patterns ripetuti | Bassa | 3 |
| 19 | `cursor: none` solo in pointer:fine, `cursor-pointer` come fallback | OK (nota) | — |

---

## 1. Arbitrary values ricorrenti (token impliciti)

Tailwind 4 con la sintassi `text-[Xrem]` viene usata pesantemente per scale
tipografiche che sono in realtà token impliciti del design system. Molti
valori ricorrono in 3+ file e candidati naturali a essere promossi a classi
Tailwind in `globals.css` (`@theme`) o a costanti riutilizzabili.

### 1a. Scala "display mega" `text-[Nrem]`

| Valore | File |
|---|---|
| `text-[10rem]` | `HeroTitle.tsx:35`, `ProjectsTitle.tsx:20`, `DetailTypefacesCard.tsx:42` |
| `text-[12rem]` | `HeroTitle.tsx:35`, `ProjectsTitle.tsx:20`, `DetailTypefacesCard.tsx:42` |
| `text-[14rem]` | `HeroTitle.tsx:35`, `ProjectsTitle.tsx:20`, `DetailTypefacesCard.tsx:42` |
| `text-[16rem]` | `HeroTitle.tsx:35`, `DetailTypefacesCard.tsx:42` |
| `text-[3.5rem]` | `ProjectsTitle.tsx:20` |
| `text-[6rem]` | `ProjectsTitle.tsx:20` |
| `text-[8rem]` | `ProjectsTitle.tsx:20` |
| `text-[2rem]/[3rem]/[4rem]/[5rem]/[6rem]/[7rem]` | `ProjectDetailClient.tsx:59` |

**Tre scale diverse** sono in uso per lo stesso ruolo semantico (display title):

- `HeroTitle` (pages): `10/12/14/16rem`
- `ProjectsTitle` (home): `3.5/6/8/10/12/14rem` (più fine, con 6 step)
- `ProjectDetail` (project hero): `2/3/4/5/6/7rem` (la più piccola)

Questo **è** semanticamente corretto (dimensioni diverse per contesti diversi),
ma le 3 scale non sono documentate né centralizzate. Rischio: la prossima
aggiunta di una nuova pagina che mostra un display title scatterà di nuovo
valori ad hoc.

**Suggerimento:** introdurre in `src/constants/typography.ts` (o in
`globals.css` come `--text-display-page` / `--text-display-project`) tre costanti
tipografiche riusabili, oppure wrappare in tre componenti "scale variant".

### 1b. Scala "section title" `text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl`

Stesso pattern ripetuto identico in 3+ posti (con un "step down" al breakpoint
`lg` per ragioni di larghezza):

- `Contacts.tsx:113` — `text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl`
- `WorkWord.tsx:33` — `text-3xl font-medium sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl`
- `DetailTypefacesCard.tsx:56` — variante `text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl`
- `ProjectCard.tsx:51` — variante `text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl`
- `AboutIntro.tsx:22` — variante `text-xl sm:text-2xl md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl`

**Tre sotto-scale** ("xl/2xl/3xl/2xl/3xl/4xl", "2xl/3xl/4xl/3xl/4xl/4xl",
"3xl/4xl/5xl/6xl/7xl") usate per dimensioni di heading. Il pattern dello
"step down" a `lg` è una convenzione **implicita** del codebase: in 2 su 5
occorrenze il `lg:` è uguale al `md:`, in 1 è uno step indietro, in 2 non c'è.

**Suggerimento:** estrarre 3-4 varianti tipografiche (es. `text-display-1`,
`text-display-2`, `text-title`, `text-body-large`) in `globals.css` o in
`tailwind.config`.

### 1c. Arbitrary sizing in contesti one-off

- `h-[4.5rem] lg:w-[4.5rem]` — `constants/about.ts:68, 77` (2 icone tech stack)
- `h-[18.4px] data-[size=default]:h-[18.4px]` — `Switch.tsx:19`
- `min-h-[65vh]` — `app/page.tsx:25`
- `min-h-[calc(100%-40px)]` — `DetailCustomComponentsCard.tsx:16`
- `tracking-[0.2em]` — `LeonardoUI.tsx:141` (unico posto)
- `leading-[0.95]` — `DetailTypefacesCard.tsx:56` (unico posto)

L'arbitrary value `h-[4.5rem]` è un outlier rispetto al pattern standard
Tailwind (multipli di 0.25rem). Andrebbe promosso a `h-[4.5rem]` solo se
esiste un design rationale, altrimenti allineato a `h-[5rem]` o sostituito con
un'icona proporzionata.

---

## 2. `CSS_VARIABLES` non usato in animate / inline style

Il file `src/constants/theme.ts` definisce:

```ts
export const CSS_VARIABLES = {
  accent: "var(--accent)",
  foreground: "var(--foreground)",
  background: "var(--background)",
  neutral: "var(--neutral)",
  neutralDark: "var(--neutral-dark)",
} as const;
```

Questo constant è usato correttamente in `utils/cursor.ts` (per la mappa
varianti del cursore), ma **non** è usato in tutti gli altri punti dove i
valori CSS appaiono come stringa JS:

| File | Riga | Valore literal |
|---|---|---|
| `Navbar.tsx` | 54 | `animate={{ color: isActive ? "var(--foreground)" : "var(--neutral)" }}` |
| `Navbar.tsx` | 56 | `whileHover={{ color: "var(--foreground)" }}` |
| `DetailCoolShitCard.tsx` | 39 | `animate={{ color: "var(--neutral)" }}` |
| `DetailCoolShitCard.tsx` | 40 | `whileHover={{ color: "var(--foreground)" }}` |
| `TechStackIcon.tsx` | 72-73 | `backgroundColor: isActive ? "var(--foreground)" : "var(--background)"` |
| `DetailPaletteCard.tsx` | 32, 52 | `style={{ fontFamily: "var(--font-neue-haas), sans-serif" }}` |
| `DetailTypefacesCard.tsx` | 17-20 | `getFontFamily()` returns `var(--font-neue-haas)` string literal |
| `DetailTypefacesCard.tsx` | 43, 50, 58, 69 | inline `style={{ fontFamily: ... }}` |
| `AboutLayout.tsx` | 20 | `calc(100vh - ${bodyHeight}px)` (dinamico, OK) |

**Problema:** uno qualunque di questi luoghi può introdurre un typo
(`var(--neautral)`) e TypeScript non se ne accorge. Il constant `CSS_VARIABLES`
esiste proprio per evitare questo.

**Suggerimento:**

- Sostituire le stringhe literal in `animate`/`whileHover` con `CSS_VARIABLES.foreground`, ecc.
- Per il `fontFamily`, creare un constant `FONT_FAMILY = "var(--font-neue-haas), sans-serif"` (e magari `FONT_FAMILY_MONO`) in `constants/theme.ts` o `constants/typography.ts`.
- `getFontFamily` in `DetailTypefacesCard.tsx` può restare dinamico ma riusare il constant per la fallback.

---

## 3. `cn()` vs template literal in className

La maggior parte del codebase usa `cn()` (18+ file), ma 4 file usano template
literal `` className={`...`} `` per casi in cui `cn()` sarebbe equivalente
(o superiore in caso di merge con `twMerge`).

| File | Riga | Pattern |
|---|---|---|
| `app/layout.tsx` | 36 | `className={\`${neueHaasGrotesk.variable}\`}` |
| `DetailImage.tsx` | 27 | `className={\`object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}\`}` |
| `DetailCustomComponentsCard.tsx` | 16 | `className={\`project-theme-${projectId} mt-auto ...\`}` |
| `LeonardoUI.tsx` | 96 | `className={\`font-mono text-[10px] ... ${engineActive ? "animate-pulse-white-neutral" : "text-(--neutral)"}\`}` |

**Casi limite accettabili:**

- `layout.tsx:36` — è una sola variabile dinamica, template literal è leggibile.
- `DetailCustomComponentsCard.tsx:16` — `project-theme-${projectId}` richiede interpolazione dinamica della classe (è una classe custom, non Tailwind utility, quindi `twMerge` non la processerebbe comunque). Pattern OK, ma documentarlo.
- `LeonardoUI.tsx:96` — ternario in mezzo al `className` è OK con template literal, equivalente a `cn()`.

**Caso problematico:**

- `DetailImage.tsx:27` — un ternario `isLoading ? "opacity-0" : "opacity-100"` non ha bisogno di template literal. Sarebbe identico con `cn("object-cover transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")`. È un'incoerenza di stile.

**Suggerimento:** convertire `DetailImage.tsx:27` a `cn()` per allinearsi al
resto del codebase. Gli altri 3 sono casi accettabili.

---

## 4. Focus-visible pattern non uniforme

Il CSS globale in `app/globals.css:37-43` definisce già un focus-visible di
default per `a, button, [role="button"]`:

```css
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 2px;
}
```

**Tuttavia, in 9 file si applicano classi Tailwind `focus-visible:*` che
duplicano / ridefiniscono questo comportamento**, e lo fanno in modi
inconsistenti:

| File | Pattern |
|---|---|
| `ProjectCard.tsx:30` | `focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm` (5 classi, ordine: outline → outline-2 → outline-color → offset → radius) |
| `DetailCoolShitCard.tsx:35` | identico a ProjectCard |
| `error.tsx:74` | `focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-(--accent)` (4 classi, **ordine diverso**: radius → outline → offset → color) |
| `not-found.tsx:67` | `focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm` (4 classi, **manca outline-2**) |
| `Contacts.tsx:30, 102` | identico a not-found |
| `Navbar.tsx:44` | identico a not-found |
| `Logo.tsx:26` | identico a not-found |
| `WorkWord.tsx:33` | identico a not-found |
| `TechStackIcon.tsx:47` | `focus-visible:outline focus-visible:outline-(--accent) focus-visible:-outline-offset-2` (**usa `-outline-offset-2` con il `-` davanti**, valore -2 invece di 4) |

**Tre varianti dello stesso pattern**, con:
- numero di classi diverso (4 vs 5)
- ordine delle classi diverso
- `outline-2` presente in 2 file, assente in 6
- offset di `-2` (Tailwind, negativo) in TechStackIcon
- radius: `rounded-sm` (0.125rem) in alcuni, niente in altri (anche se il CSS globale lo applica già)

**Problema:** il CSS globale **già applica** `outline: 2px solid var(--accent);
outline-offset: 4px; border-radius: 2px;` a `a, button, [role="button"]`. Le
classi Tailwind `focus-visible:outline*` sono in gran parte **ridondanti** su
elementi `<a>` e `<button>`. Aggiungono solo `rounded-sm` (lo stesso che
border-radius 2px ≈ 0.125rem).

**Casi coperti / non coperti dal CSS globale:**

- `<Link>` di Next.js rende un `<a>` → **coperto**.
- `<button>` nativi → **coperto**.
- `<motion.button>` → **coperto** (è un button).
- `<div role="button">` → **coperto**.
- `TechStackIcon.tsx:47` (è un `<Link>` quindi `<a>`) → **coperto**, ma
  ridefinisce l'offset a `-2` (negativo). È una scelta intenzionale (outline
  verso l'interno del riquadro) oppure un errore? Da verificare.

**Suggerimento:**

1. Verificare che il CSS globale applichi davvero a tutti gli elementi
   focusabili usati (motion.button, link Next.js). Se sì, **rimuovere le
   classi `focus-visible:outline*` da tutti i 9 file** tranne dove servono
   offset/radius diversi da quelli di default.
2. Standardizzare l'ordine e i casi: definire un constant `FOCUS_VISIBLE_CLASSES`
   (o un plugin Tailwind) per i pochi casi che davvero ne hanno bisogno.
3. Decidere se `TechStackIcon` vuole davvero `-outline-offset-2` (outline
   interno). Se sì, documentarlo.

---

## 5. `cursor-pointer` come fallback solo in 2 file

Il CSS globale (`globals.css:31-35`) imposta `cursor: none !important` su tutti
gli elementi quando il dispositivo ha un puntatore fine:

```css
@media (pointer: fine) {
  * { cursor: none !important; }
}
```

Per i **dispositivi touch** (che non hanno cursor custom) `cursor-pointer` è
un fallback utile sui CTA principali. Attualmente è applicato solo a:

- `app/not-found.tsx:67` — "Go home" button (Link)
- `app/error.tsx:74` — "Try again" button (`<button>`)

**Mancano** (probabilmente):

- `app/page.tsx` (cards, link interni)
- `ProjectCard.tsx` (Link alla pagina progetto)
- `Navbar.tsx` (Link di navigazione)
- `Contacts.tsx` (email e social link)
- `Footer.tsx` (se ha link)

**Incoerenza:** se l'intenzione è "tutti gli elementi cliccabili devono
mostrare un cursore pointer su touch", allora è inconsistente. Se l'intenzione
è "solo i CTA primari invertiti", allora è OK e i due file sono allineati.

**Suggerimento:** chiarire l'intenzione e applicare `cursor-pointer` in modo
uniforme, oppure rimuoverlo da entrambi i file se la regola globale è già
sufficiente (i browser di default mostrano pointer su `<a>` e `<button>`).

---

## 6. Transition CSS pattern frammentato

| File | Pattern |
|---|---|
| `ProjectCard.tsx:30` | `transition-all duration-300 ease-out` |
| `error.tsx:74` | `transition-all duration-300` (manca `ease-out`) |
| `not-found.tsx:67` | `transition-all duration-300` (manca `ease-out`) |
| `Contacts.tsx:34` | `transition-colors duration-300 ease-out` (specifica `colors`, non `all`) |
| `ProjectCard.tsx:40` | `transition-all duration-700 ease-out` (700, outlier) |

**Problema:** `duration-300 ease-out` è il pattern de facto (usato in
`createFadeUpVariants` con durate 0.3s / 0.4s / 0.5s), ma 2 file su 4 lo
omettono (`error.tsx`, `not-found.tsx`). Anche `ProjectCard` ha due duration
diverse (300 per la card, 700 per l'immagine) — 700 è un caso intenzionale
(zoom on hover), ma è un magic number non documentato.

**Suggerimento:**

- Aggiungere `ease-out` ai due file mancanti.
- Estrarre le durate comuni in constant (`DURATION_HOVER = 0.3`,
  `DURATION_CARD_HOVER = 0.7`) in `constants/animations.ts`.

---

## 7. "Section label" pattern duplicato

Pattern visivo ricorrente per le etichette delle sezioni:
`text-xs text-(--neutral) [oppure text-(--neutral-dark)] tracking-wider uppercase md:text-sm`.

**File che lo usano (8+):**

| File | Riga | Variante |
|---|---|---|
| `ProjectCard.tsx` | 58 | `text-xs text-(--neutral) uppercase tracking-wider leading-none` (no `md:text-sm`) |
| `DetailSectionCard.tsx` | 20 | `text-xs tracking-wider text-(--neutral) uppercase md:text-sm` |
| `DetailCoolShitCard.tsx` | 24 | `text-xs tracking-wider text-(--neutral) uppercase md:text-sm` |
| `ProjectsSection.tsx` | 19 | `pb-3 text-xs text-(--neutral-dark) md:text-sm` (no `uppercase tracking-wider`!) |
| `ProjectDetailClient.tsx` | 96 | `text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm` |
| `ProjectDetailClient.tsx` | 110 | `text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm` |
| `TechStack.tsx` | 34 | `pb-3 text-xs text-(--neutral-dark) md:text-sm` (no `uppercase tracking-wider`!) |
| `ContactLinkItem.tsx` (Contacts) | 30 | `text-md md:text-lg` (non è una label) |

**Incoerenze interne:**

- 5 file usano `text-(--neutral)`, 4 usano `text-(--neutral-dark)`. Le label delle sezioni **interne** (in fondo pagina) sembrano voler essere leggermente più scure rispetto a quelle in cima.
- `ProjectsSection.tsx:19` e `TechStack.tsx:34` **mancano** `uppercase tracking-wider` rispetto al pattern standard, ma visivamente mostrano lo stesso contenuto uppercase ("SELECTED WORKS", "MY TECH STACK"). Probabilmente è `uppercase` su un `<h2>` con testo già scritto in maiuscolo, quindi non serve. Da verificare.
- `ProjectCard.tsx:58` ha `leading-none` ma gli altri no.

**Suggerimento:**

- Estrarre un componente `<SectionLabel>{children}</SectionLabel>` (o una
  costante `SECTION_LABEL_CLASSES`) e usarlo in tutti i posti.
- Oppure definire una classe utility in `globals.css` con `@apply`.

---

## 8. "Display heading" scale pattern

Vedi sezione 1b sopra. Le tre sotto-scale di display heading non sono
documentate né centralizzate. Le occorrenze principali:

- `text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl`
  - `Contacts.tsx:113` (email h2)
  - `WorkWord.tsx:33` (How I Work button)
- `text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl`
  - `DetailTypefacesCard.tsx:56` (font name)
  - `AboutIntro.tsx:22` (intro paragraph, leggermente diverso)
- `text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl`
  - `ProjectCard.tsx:51` (project title)

**Suggerimento:** vedi 1b.

---

## 9. Inline `style={{ fontFamily }}` ridondante

`globals.css:25-29` imposta già sul body:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-neue-haas), sans-serif;
}
```

Tutti gli elementi dentro `<body>` ereditano `var(--font-neue-haas), sans-serif`
di default. Tuttavia 4 file applicano lo stesso valore via inline style:

| File | Riga | Valore |
|---|---|---|
| `DetailPaletteCard.tsx` | 32, 52 | `style={{ fontFamily: "var(--font-neue-haas), sans-serif" }}` |
| `DetailTypefacesCard.tsx` | 50, 58 | inline (alcuni dinamici con getFontFamily) |

I casi **dinamici** in `DetailTypefacesCard` (cambiano font in base al tipo
sans/mono) sono legittimi. I casi **statici** in `DetailPaletteCard` e la
riga 50 di `DetailTypefacesCard` sono **ridondanti** — l'elemento ha già il
font giusto per ereditarietà.

**Suggerimento:** rimuovere `style={{ fontFamily: "var(--font-neue-haas),
sans-serif" }}` dai 3 punti statici. Lasciare solo dove il font è dinamico
(font.type === "mono").

---

## 10. Hex colors in `constants/projects.ts` duplicati dai CSS vars

`src/constants/projects.ts:18-22` definisce i 5 colori del palette brand:

```ts
{ hex: "#0A0A0A", pantone: "Black 6 C" },     // --background
{ hex: "#262626", pantone: "426 C" },          // --neutral-dark
{ hex: "#737373", pantone: "424 C" },          // --neutral
{ hex: "#E5E5E5", pantone: "Cool Gray 1 C" },  // --accent
{ hex: "#F7F7F7", pantone: "7541 C" },         // --foreground
```

Questi valori sono **identici** a quelli in `app/globals.css:4-12`
(`--background`, `--neutral-dark`, `--neutral`, `--accent`, `--foreground`).
E in `components/projects/leonardo-berselli-portfolio/theme.css:52-56`
l'unica differenza è che Leonardo **sovrascrive** questi valori con una palette
leggermente diversa (più "fredda"):

| Var | Globals | Leonardo | projects.ts |
|---|---|---|---|
| background | `#0a0a0a` | `#0A0A0A` | `#0A0A0A` |
| neutral-dark | `#6b6b6b` | `#262626` | `#262626` |
| neutral | `#9b9b9b` | `#737373` | `#737373` |
| accent | `#ff4500` | `#E5E5E5` | `#E5E5E5` |
| foreground | `#f6f6f6` | `#F7F7F7` | `#F7F7F7` |

**I 5 hex in `projects.ts` corrispondono a Leonardo, non al default**. È OK
per il caso d'uso (le palette cards mostrano i colori del brand Leonardo) ma:

- Se in futuro viene aggiunto un altro progetto con palette custom, bisogna
  duplicare di nuovo.
- Non c'è un commento che spieghi che quei hex sono **validi per il
  progetto Leonardo**, non globali.

**Suggerimento:**

- Spostare la palette Leonardo in
  `components/projects/leonardo-berselli-portfolio/constants/colors.ts` e
  rimuoverla da `projects.ts`.
- Oppure aggiungere un commento (NON JSDoc, un `//` semplice) che spieghi la
  provenienza.

---

## 11. `aria-label` malformato in `ProjectsTitle` — **BUG**

`src/components/projects/ProjectsTitle.tsx:21`:

```tsx
aria-label={`Projects '${twoDigitYear}`}
```

**Il literal è `Projects '25`** (con apostrofo iniziale e SENZA chiusura).
Il backtick di chiusura è subito dopo `${twoDigitYear}`, quindi il valore è
corretto come stringa, **ma l'intento è ambiguo**:

- L'utente vede visivamente "Projects '25" dove l'apostrofo è un elemento
  stilistico (closing single quote prima del year).
- Lo screen reader leggerà "Projects apostrophe 25" o, con la modalità
  letterale, "Projects ' 2 5".
- Le altre pagine usano label pulite:
  - `Hey.tsx`: `"Hey - About page heading"`
  - `Hello.tsx`: `"Say Hello - Contact page heading"`
  - `WorkWord.tsx:41`: `` `View video for ${word}` ``
  - `not-found.tsx:46`: `"404 - Page not found"`
  - `error.tsx:53`: `"Hell Nah - Something went wrong"`
  - `ProjectDetailClient.tsx:60`: `` `${project.title} - Project heading` ``

**Suggerimento:** correggere l'aria-label a `"Projects 25"` (o
`` `Projects ${twoDigitYear}` ``) per coerenza con il pattern delle altre
pagine. Da fare nel prossimo refactor.

---

## 12. `createFadeUpVariants(...)` con args identici duplicati

Gli stessi args per le varianti fade-up sono dichiarati due volte in `error.tsx`
e `not-found.tsx`:

```ts
// not-found.tsx
const paragraphVariants = useMemo(
  () => createFadeUpVariants(0.35, 20, 0.4),
  [],
);
const buttonVariants = useMemo(
  () => createFadeUpVariants(0.5, 20, 0.4),
  [],
);

// error.tsx
const paragraphVariants = useMemo(
  () => createFadeUpVariants(0.35, 20, 0.4),
  [],
);
const buttonVariants = useMemo(() => createFadeUpVariants(0.5, 20, 0.4), []);
```

**Suggerimento:** estrarre in un file condiviso `app/(shared)/fade-up.ts`:

```ts
export const FADE_UP_PARAGRAPH = () => createFadeUpVariants(0.35, 20, 0.4);
export const FADE_UP_BUTTON = () => createFadeUpVariants(0.5, 20, 0.4);
```

Oppure accettare la duplicazione (è 1 riga × 2 file = 4 righe totali).

---

## 13. `animate.color` / `whileHover.color` block identico in 2 file

`Navbar.tsx:52-58` e `DetailCoolShitCard.tsx:38-42` condividono esattamente
lo stesso pattern di animazione colore per i link testuali:

```tsx
<motion.span
  animate={{ color: isActive ? "var(--foreground)" : "var(--neutral)" }}
  whileHover={{ color: "var(--foreground)" }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```

**Suggerimento:** estrarre un componente `<AnimatedTextLink>` (o un constant
`ANIMATED_LINK_TRANSITION`) in `constants/animations.ts` o un nuovo file
`components/ui/AnimatedTextLink.tsx`. Risparmia ~6 righe per occorrenza e
assicura coerenza (le 2 occorrenze potrebbero divergere in futuro).

Bonus: usare `CSS_VARIABLES.foreground` / `CSS_VARIABLES.neutral` invece dei
literal string (vedi sezione 2).

---

## 14. `font-mono` con arbitrary sizes nel Leonardo UI

`leonardo-berselli-portfolio-UI.tsx` ha 10+ occorrenze del pattern
`font-mono text-[Npx] tracking-widest/wider uppercase`:

- Line 51, 61, 71: `px-4 font-mono text-xs uppercase` (Button overrides)
- Line 81: `font-mono text-[10px] leading-none tracking-widest text-(--neutral) uppercase`
- Line 96: `font-mono text-[10px] leading-none tracking-wider uppercase ${...}`
- Line 110, 116, 122, 128: `font-mono text-[9.5px]` (Badge overrides)
- Line 141: `font-mono text-[9px] tracking-[0.2em] text-(--neutral) uppercase md:text-xs`
- Line 158: `font-mono text-[8px] tracking-widest uppercase md:text-[9px]`
- Line 160, 173, 188, 203: `text-[7px] text-(--neutral)` (sotto-label)
- Line 227, 270: `font-mono text-[9px] text-(--neutral)` (card badge)
- Line 233, 276: `font-mono text-[11px] tracking-wider text-(--neutral) uppercase`
- Line 237, 280: `font-mono text-[10px]` (data list)

**Scala mono del Leonardo:**
- `7px` (sotto-label, unico)
- `8px` (data labels, unico)
- `9px` (badges, multiple)
- `9.5px` (badges, multiple) — `0.5px` è un arbitrary value senza giustificazione
- `10px` (labels, multiple)
- `11px` (card titles, multiple)

**Problema:** `text-[9.5px]` è arbitrario in un modo che non si vede in nessun
altro punto del codebase. Perché 9.5 e non 10? Probabilmente per aggiustamenti
fatti a mano. Andrebbe standardizzato a 10px (o promosso a 9px).

**Suggerimento:** estrarre in una CSS class (Tailwind `@apply` o CSS variables
in `theme.css`):

```css
.leo-text-mono-xs { @apply font-mono text-[7px] tracking-widest uppercase; }
.leo-text-mono-sm { @apply font-mono text-[9px] tracking-wider uppercase; }
.leo-text-mono-md { @apply font-mono text-[10px] tracking-wider uppercase; }
.leo-text-mono-lg { @apply font-mono text-[11px] tracking-wider uppercase; }
```

E rimuovere `text-[9.5px]` in favore di `text-[10px]` o `text-[9px]`.

---

## 15. `STAGGER_FADE_UP` vs `createFadeUpVariants` pattern sovrapposti

In `src/constants/animations.ts` esistono due funzioni simili:

```ts
export const STAGGER_FADE_UP = (delay: number) => ({
  duration: 0.35,
  ease: "easeOut" as const,
  delay,
});

export const createFadeUpVariants = (delay, yOffset = 30, duration = 0.4) => ({
  initial: { opacity: 0, y: yOffset, transition: { duration: 0.25, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT, delay } },
});
```

`STAGGER_FADE_UP` è usato in `Logo.tsx`, `Navbar.tsx` (per i singoli link con
delay incrementale), `ProjectsSection.tsx` no (usa `createFadeUpVariants`).

`createFadeUpVariants` è usato in `ProjectsTitle.tsx`, `ProjectCard.tsx`
(indirettamente), `not-found.tsx`, `error.tsx`, `AboutIntro.tsx`,
`AboutPortrait.tsx`, `ProjectsSection.tsx`.

**Problema:** `STAGGER_FADE_UP` non applica l'animazione iniziale (opacity
0, y offset), assume che l'elemento parta da `opacity: 0, y: 20` settato
inline. È usato in modo leggermente inconsistente:

- `Logo.tsx:36-37`: `initial={{ opacity: 0, y: 20 }}, animate={{ opacity: 1, y: 0 }}, transition={STAGGER_FADE_UP(0)}` (passa delay 0)
- `Navbar.tsx:37-39`: stesso pattern con `delay={0.15 + idx * 0.05}`
- `ProjectsTitle.tsx`: usa `createFadeUpVariants` per le 2 motion.span

Sono semanticamente simili (entrambi fade-up con stagger), ma la forma è
diversa. `STAGGER_FADE_UP` potrebbe essere deprecato in favore di
`createFadeUpVariants(delay, yOffset, duration)` che è più espressivo.

**Suggerimento:** valutare se unificare le due funzioni. Per ora sono
accettabili entrambe, ma documentare la differenza in JSDoc... anzi, no,
ricordarsi: **niente JSDoc aggiunti**. Aggiungere un commento in
`constants/animations.ts` (un `//` semplice è accettabile come guida interna,
oppure no — meglio evitare).

---

## 16. `transition-all` senza `ease-out` in 2 file

Vedi sezione 6. Caso specifico: `error.tsx:74` e `not-found.tsx:67` (le due
pagine appena allineate nel refactor cursor) usano `transition-all
duration-300` **senza** `ease-out`, mentre il resto del codebase lo include.

**Suggerimento:** aggiungere `ease-out` ai due file (è un'omissione
probabilmente involontaria data l'allineazione recente).

---

## 17. `text-md` — Tailwind 4 inesistente

`src/components/contacts/Contacts.tsx:30`:

```tsx
className="text-md text-(--neutral) md:text-lg ..."
```

**`text-md` non è una classe Tailwind valida.** In Tailwind 3 c'era `text-md`
(1.125rem), in Tailwind 4 è stato rimosso perché coincideva con `text-lg` o
`text-base+1` in modo confuso. Probabilmente è un residuo di quando il
codebase era su Tailwind 3.

**Effetto:** la classe viene ignorata, l'elemento ha effective `text-base`
(default) o eredita la size dal parent.

**Suggerimento:** sostituire `text-md` con `text-base` (default 1rem) o
`text-lg` (1.125rem, allineato al `md:text-lg` subito dopo). Verificare
l'intento originale e correggere.

---

## 18. `flex items-center ...` patterns ripetuti

Pattern minori ma degni di nota:

- `flex flex-col items-center gap-10 text-center md:col-span-8 xl:col-span-12` in
  `error.tsx:46` e `not-found.tsx:40` (identico, vedi già il refactor cursor
  che li ha allineati).
- `flex items-center gap-3` in 5+ posti.
- `flex flex-col gap-4` in 10+ posti.

Questi sono pattern **accettabili** e non vale la pena estrarre, ma un
componente `<VStack gap={4}>` potrebbe aiutare la leggibilità (dipendenza da
preferenze del team).

---

## 19. `cursor: none` e `cursor-pointer`

`globals.css:31-35` definisce:

```css
@media (pointer: fine) {
  * { cursor: none !important; }
}
```

Quindi:

- **Desktop (mouse):** nessun cursor nativo, custom cursor prende il
  sopravvento.
- **Touch (mobile):** cursor nativo del browser, default `auto` su tutti
  gli elementi. `cursor-pointer` su `<a>` e `<button>` è implicito, ma
  esplicito sui CTA primari è una garanzia in più.

`cursor-pointer` esplicito è presente in:

- `not-found.tsx:67` (CTA invertito "Go home")
- `error.tsx:74` (CTA invertito "Try again")

Nessun altro file. Coerente con l'intenzione "solo CTA primari invertiti"
o no? Se sì, OK. Se no, applicarlo uniformemente a tutti i CTA.

---

## Riepilogo delle Azioni Raccomandate (per priorità)

| # | Azione | Impatto | Effort |
|---|---|---|---|
| 11 | Correggere `aria-label` malformato in `ProjectsTitle.tsx:21` | **Alto (bug)** | 1 min |
| 4 | Rimuovere le classi `focus-visible:outline*` ridondanti (9 file) | Alto (manutenzione) | 30 min |
| 17 | Correggere `text-md` invalido in `Contacts.tsx:30` | **Medio (bug latente)** | 5 min |
| 2 | Usare `CSS_VARIABLES.*` in animate/whileHover/inline style (5 file) | Medio (type safety) | 20 min |
| 1+8 | Centralizzare le scale tipografiche in costanti / Tailwind theme | Medio | 1-2 ore |
| 7 | Estrarre `<SectionLabel>` o `SECTION_LABEL_CLASSES` (8 file) | Medio | 30 min |
| 14 | Estrarre classi `.leo-text-mono-*` per Leonardo UI | Medio (manutenzione) | 1 ora |
| 9 | Rimuovere `style={{ fontFamily }}` ridondanti (3 punti) | Basso | 10 min |
| 6+16 | Aggiungere `ease-out` a `error.tsx` e `not-found.tsx` | Basso (UX) | 5 min |
| 3 | Convertire `DetailImage.tsx:27` a `cn()` | Basso (stile) | 5 min |
| 10 | Aggiungere un commento `//` o spostare palette in costanti Leonardo | Basso (manutenzione) | 10 min |
| 5+19 | Chiarire l'intenzione di `cursor-pointer` (uniformare o rimuovere) | Basso (coerenza) | 10 min |
| 12 | Estrarre `FADE_UP_PARAGRAPH/BUTTON` shared per error/not-found | Basso (DRY) | 10 min |
| 13 | Estrarre `<AnimatedTextLink>` o constant per Navbar/Download icon | Basso (DRY) | 20 min |
| 15 | Documentare (o unificare) `STAGGER_FADE_UP` vs `createFadeUpVariants` | Basso | — |
| 18 | Considerare `<VStack>` / `<HStack>` (opzionale) | Basso (DX) | — |

---

## Note Finali

- **Bug critico prioritario:** #11 (aria-label) e #17 (text-md).
- **Refactor ad alto ROI:** #4 (focus-visible cleanup) + #2 (CSS_VARIABLES
  adoption) — insieme eliminano ~20 linee di ridondanza e garantiscono
  coerenza a lungo termine.
- **Refactor di design system:** #1+#7+#8+#14 sono prerequisiti se in futuro
  si vuole aggiungere un nuovo progetto custom (es. un secondo portfolio stile
  Leonardo) o una nuova pagina con scale tipografiche diverse.
- **Tutto il resto** (5, 9, 12, 13, 15, 18, 19) è nice-to-have, non bloccante.

**Nessuno di questi è un blocker per produzione** — il codebase è già in ottimo
stato post-refactor cursor. Queste sono opportunità di consolidamento per
future PR singole (una per categoria, come da convenzione commit).
