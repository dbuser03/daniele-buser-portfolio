# Copilot Instructions for `daniele-buser-portfolio`

## 1. Project overview

This repository is a Next.js 16 App Router personal portfolio site (currently prerendering `/`, `/about`, and `/contacts`) intended for standard Next.js deployment targets such as Vercel; when working here, the primary AI-agent goal is to preserve the existing interaction model (Lenis scroll + custom cursor + motion-driven transitions) while making minimal, type-safe changes that keep route theming and layout behavior consistent.

## 2. Commands

- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Production build: `pnpm build`
- Lint all files: `pnpm lint`
- Lint a single file: `pnpm eslint src/components/layout/header/Navbar.tsx`
- No test suite exists in this repo (`package.json` has no `test` script and there are no `*.test` / `*.spec` files under `src/`).
- Current lint status from scan: `pnpm lint` fails before rule evaluation with an ESLint config error (`TypeError: Converting circular structure to JSON`), so no project rule IDs were emitted.

## 3. Architecture

- **App Router shell:** `src/app/layout.tsx` is intentionally a **Client Component** because it uses `usePathname()`, cursor hooks (`useSmoothCursor`), and client-only wrappers (`SmoothScrolling`, context provider wiring). Do not convert this layout to a Server Component.
- **Route-driven theming:** layout derives `variant` from pathname (`"/"` and `"/about"` => `"light"`, everything else => `"dark"`), then passes it into `Grid`, `Header`, and `Footer`; theme helpers in `src/utils/theme.ts` consume this variant.
- **Bundled Next.js docs check:** `node_modules/next/dist/docs/` is **missing** in the current environment. If that directory exists in a future session, read it before implementing Next.js-specific behavior.

## 4. Component conventions

- Default to Server Components; add `"use client"` only when required for browser APIs, event handlers, motion values, or context consumers.
- Never add `"use client"` to `src/app/layout.tsx` as a "fix" for unrelated issues; it is already client and must stay client for routing/cursor/scroll wiring.
- Filename casing: PascalCase for components, kebab-case for utilities and hooks.
- Re-export components through local `index.ts` barrels (current examples: `src/components/contacts/index.ts`, `src/components/layout/*/index.ts`) and import from the folder entrypoint where available.
- Existing `"use client"` locations found in scan: `src/app/layout.tsx`, `src/components/contacts/Contacts.tsx`, `src/components/contacts/Hello.tsx`, `src/components/layout/cursor/Cursor.tsx`, `src/components/layout/cursor/SmoothScrolling.tsx`, `src/components/layout/footer/Footer.tsx`, `src/components/layout/header/Logo.tsx`, `src/components/layout/header/Navbar.tsx`, `src/contexts/CursorContext.tsx`, `src/hooks/useCurrentTime.ts`, `src/hooks/useGridBreakpoint.ts`.

## 5. TypeScript conventions

- `strict` mode is enabled in `tsconfig.json`; do not introduce `any`, and do not use `@ts-ignore` without an inline justification comment.
- Compiler target is `ES2017`.
- Use path alias imports (`@/*` => `./src/*`) for intra-repo imports; do not introduce deep relative imports (`../../`).
- Shared types currently exported from `src/types/`:
  - `src/types/contacts.ts`: `ContactLink`
  - `src/types/cursor.ts`: `CursorPosition`, `CursorInteractionType`, `CursorProps`, `CursorContextType`, `CursorInteractionConfig`
  - `src/types/grid.ts`: `GridBreakpoint`, `GridBreakpointConfig`, `GridConfig`, `GridProps`
  - `src/types/layout.ts`: `LayoutComponentProps`, `HeaderProps`, `FooterProps`, `LogoProps`, `NavbarProps`, `NavLink`

## 6. Styling conventions

- Tailwind v4 is enabled globally via `@import "tailwindcss";` in `src/app/globals.css`; keep styling aligned with this setup.
- Avoid introducing CSS Modules or CSS-in-JS in this project; existing global styling is centralized in `globals.css`.
- CSS variables defined in `src/app/globals.css`:
  - `--background: #0a0a0a`
  - `--foreground: #f6f6f6`
  - `--neutral: #9b9b9b`
  - `--neutral-dark: #6b6b6b`
  - `--accent: #ff4500`
  - `--grid-line-dark: #1a1a1a`
  - `--grid-line-light: #e8e8e8`
- Keep color transitions and variant color decisions routed through `src/utils/theme.ts` where applicable.
- The native cursor is intentionally hidden globally with `* { cursor: none !important; }`; do not remove this rule and do not introduce Tailwind `cursor-*` utilities.
- Global behavior in `globals.css` that can conflict with third-party assumptions: hidden scrollbars (`scrollbar-width: none`, `html::-webkit-scrollbar { display: none; }`), `overscroll-behavior: none`, and `user-select: none`.

## 7. Animation and scroll conventions

- Lenis (`src/components/layout/cursor/SmoothScrolling.tsx`) is the project scroll controller; do not add manual smooth-scroll APIs.
- Do not add `window.scrollTo(...)`, `element.scrollIntoView(...)`, or CSS `scroll-behavior: smooth` while Lenis owns root scroll.
- Motion comes from `motion/react` across the codebase (`Cursor`, `Logo`, `Navbar`, `Footer`, `Hello`, `Contacts`, `useCursor.ts` motion values/spring). Keep using this library and do not add a second animation package.
- Current scan found no direct `window.scrollTo` / `scrollIntoView` calls and no `scroll-behavior` rule.

## 8. Cursor system

- Cursor pipeline:
  1. `useCursorTracking()` (`src/hooks/useCursor.ts`) listens to mouse movement/enter/leave and stores `{x,y}` + visibility.
  2. `useSmoothCursor()` converts position to motion values (`smoothX`, `smoothY`), cursor spring size (`cursorSize`), and color state (`color`, `setColor`).
  3. `src/app/layout.tsx` creates the shared cursor context via `CursorProvider` and renders `Cursor`.
  4. `Cursor` (`src/components/layout/cursor/Cursor.tsx`) animates visual state from the motion values.
  5. `useCursorInteraction()` (`src/hooks/useCursorInteraction.ts`) merges a preset from `getCursorInteractionConfig()` with optional overrides and applies enter/leave changes.
- Presets in `src/utils/cursor.ts`:
  - `header`: shrink to `CURSOR_SIZE.xs` and use neutral on enter; restore `CURSOR_SIZE.sm` + accent on leave.
  - `footer`: no default mutation (empty preset).
  - `default`: no default mutation (empty preset).
- For interactive elements, use `useCursorInteraction(...)` handlers instead of mutating context state directly inside components.
- Direct cursor context usage found in scan is centralized to `useCursorInteraction` (components do not call `useCursorContext` directly), and this pattern should be preserved.

## 9. Constants and utilities

- Repeated values should live in `src/constants/*`; shared behavior should live in `src/utils/*`; components/hooks should import from them rather than duplicating literals.
- Constant modules:
  - `src/constants/contacts.ts`: `EMAIL` and `CONTACT_LINKS` link metadata.
  - `src/constants/cursor.ts`: `CURSOR_SIZE` scale values.
  - `src/constants/grid.ts`: `GRID_BREAKPOINTS` and `GRID_CONFIG` responsive grid structure.
  - `src/constants/layout.ts`: `NAV_LINKS` site nav entries.
  - `src/constants/theme.ts`: `CSS_VARIABLES` map and `CSSVariable` type alias.
- Utility modules:
  - `src/utils/cursor.ts`: `getCursorInteractionConfig(type)` cursor preset factory.
  - `src/utils/date.ts`: `formatTime(date)` display formatter for footer time.
  - `src/utils/grid.ts`: **present but currently empty**.
  - `src/utils/theme.ts`: `getPrimaryColor`, `getSecondaryColor`, `getNavbarTextColor`, `isActiveNavLink`.
- Repetition currently observed that should not spread further: hardcoded `"var(--accent)"` appears in multiple components (`Logo`, `Navbar`, `Cursor` default) instead of consistently using `CSS_VARIABLES.accent`.

## 10. Known pitfalls

- **Client vs. Server boundary**
  - Wrong: `"use client"; export default function Header() { return <header />; }`
  - Correct: `export default function Header() { return <header />; }`
- **Import alias**
  - Wrong: `import { NAV_LINKS } from "../../constants/layout";`
  - Correct: `import { NAV_LINKS } from "@/constants/layout";`
- **Scroll conflict with Lenis**
  - Wrong: `window.scrollTo({ top: 0, behavior: "smooth" });`
  - Correct: `<ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>{children}</ReactLenis>`
- **Animation library conflict**
  - Wrong: `import { gsap } from "gsap";`
  - Correct: `import { motion } from "motion/react";`
- **Cursor utility class**
  - Wrong: `<a className="cursor-pointer">Contact</a>`
  - Correct: `<a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</a>`
- **Inline color hardcoding**
  - Wrong: `<motion.span whileHover={{ color: "#ff4500" }} />`
  - Correct: `<motion.span whileHover={{ color: getPrimaryColor(variant) }} />`
- **Bypassing cursor presets**
  - Wrong: `const { setColor } = useCursorContext(); setColor("var(--accent)");`
  - Correct: `const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");`
- **Assuming lint rule output exists**
  - Wrong: `pnpm lint # parse rule IDs from output`
  - Correct: `pnpm lint # currently fails at config load; fix ESLint config first, then rely on rule diagnostics`
