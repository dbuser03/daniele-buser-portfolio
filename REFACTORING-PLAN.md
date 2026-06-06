# Refactoring Plan — daniele-buser-portfolio (v6)

**Generated:** 2026-06-06
**Revision:** v7 — C1-C2, H1-H3 completed; H2 → hardcoded delays (scroll lock removed)
**Framework:** Next.js 16.2.5 / React 19.2.6 / Tailwind CSS 4

---

## Baseline Metrics

Capture these **before touching a single file**.

| Metric         | How to capture                                                       |
| -------------- | -------------------------------------------------------------------- |
| Bundle size    | `ANALYZE=true pnpm build` — note main chunk + per-page JS            |
| Lighthouse     | Run on deployed preview — note Performance, CLS, FCP, TTI            |
| Render profile | React DevTools Profiler → record full scroll + hover → render counts |

---

## Hard Constraints

| Never use                                           | Why                                                                                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `suppressHydrationWarning`                          | Silences symptom without fixing cause. Mismatch still exists at runtime.                                                                |
| `// eslint-disable` / `// eslint-disable-next-line` | Suppresses a rule rather than resolving the issue. Accumulates technical debt.                                                          |
| `// @ts-ignore` / `// @ts-expect-error`             | Same principle — suppresses type evidence instead of fixing the type. Exception: upstream lib bugs with open issue + link. |

---

## Priority Overview

| Priority    | Count | Category                                    | User Impact |
| ----------- | ----- | ------------------------------------------- | ----------- |
| 🔴 Critical | 2     | Bundle size, missing directives             | 🎯 Visible  |
| 🟠 High     | 3     | Composition, duplicate logic, effect misuse | 🎯 / 🔧     |
| 🟡 Medium   | 10    | Re-renders, hydration, layout shift, config | 🎯 / 🔧     |
| 🟢 Low      | 6     | Micro-optimizations, consistency            | 🔧          |

> **🎯** Affects UX (bundle size, CLS, visible jank)
> **🔧** Code quality / DX — no direct user impact

---

## 🔴 Critical

### C1. `dynamic()` inside `useMemo()` — breaks code splitting  ✅ DONE

**File:** `src/components/projects/ProjectDetailClient.tsx`
**User impact:** 🎯 All lazy-loadable components bundled eagerly — direct JS payload increase

**What changed:** Moved `dynamic()` calls to module-level lookup maps (`UI_MAP`, `COOL_SHIT_MAP`).
Removed `useMemo` — bundles can now statically analyze import paths. `EarthGlobeAscii` uses
`.then(m => ({ default: m.EarthGlobeAscii }))` since it's a named export.

---

### C2. Missing `"use client"` on client-only hooks  ✅ DONE

**Files:**
- `src/hooks/useCursorInteraction.ts`
- `src/hooks/useHowIWork.ts`

**What changed:** Added `"use client"` as first line in both files.

---

## 🟠 High

### H1. `preventAnimation` boolean prop  ✅ DONE

**Files:** `Header.tsx`, `Logo.tsx`, `Navbar.tsx`, `Footer.tsx`, `types/layout.ts`
**User impact:** 🔧

**What changed:** Removed `preventAnimation` from all type definitions and component
signatures. Components are now unconditionally animated (which is what they were in
practice — no caller ever passed the prop). Eliminated ~50 lines of dead conditional
branches across 5 files.

---

### H2. Duplicate `checkVisibility` logic — hardcoded delays only  ✅ DONE

**Files:** `HowIWork.tsx`, `TechStack.tsx`, `ProjectsSection.tsx`
**User impact:** 🔧 Eliminated 3 copies of checkVisibility (49 lines each)

**Solution:** Removed all `checkVisibility()` scroll listeners and the `useIsInView`
hook. Delays are now simple constants — `baseDelay = 0.95` in `HowIWork.tsx` and
`TechStack.tsx`, `createFadeUpVariants(0.65)` / `createFadeUpVariants(0.5)` in
`ProjectsSection.tsx`. No scroll lock, no inView detection, no conditional delays.

---

### H3. Derived state in `useEffect` — `TechStackIcon`  ✅ DONE

**File:** `src/components/about/tech-stack/TechStackIcon.tsx`
**User impact:** 🔧

**What changed:** The effect watching `[isFullyActive, isMouseOver]` was split into
two concerns:

1. **Mouse enter/leave** → handled directly in event handlers (no effect)
2. **`isFullyActive` changes** → minimal effect using a ref (`isMouseOverRef`) to
   avoid stale closures, with `handleMouseEnter`/`handleMouseLeave` in deps (they're
   stable `useCallback` references)

Removed unused `useState` for `isMouseOver` — replaced with `useRef`.

---

## 🟡 Medium

### M1. `React.memo` — per-component analysis (revised)

**User impact:** 🎯 Only where re-renders are actually expensive

`React.memo` is not free. Every parent render triggers a prop comparison. If the component
is cheap to render, the comparison cost may exceed the render cost. Do **not** apply
`memo()` blindly.

Before implementing any memoization:

1. Run React DevTools Profiler
2. Record a full scroll interaction
3. Record all hover interactions (How I Work, Tech Stack, Projects)
4. Inspect render counts and render durations
5. Apply memoization only where renders are both frequent and non-trivial

The analysis below is based on the current component signatures and rendering model.

---

## Decision Matrix

| Component       | Verdict          | Notes                                                                          |
| --------------- | ---------------- | ------------------------------------------------------------------------------ |
| `WorkWord`      | 🟡 Profile first | Likely candidate, but depends on `scrollProgress` stability and callback refs. |
| `TechStackCell` | ❌ Skip           | `children` prop likely defeats memoization.                                    |
| `TechStackIcon` | ✅ Apply          | Strong candidate after H3 and stable callbacks.                                |
| `ProjectCard`   | ✅ Apply          | Strong candidate if `project` reference is stable.                             |
| `VideoLayer`    | ✅ Apply          | Strong candidate after M9.                                                     |
| `Header`        | ❌ Skip           | Server Component.                                                              |
| `Logo`          | ❌ Skip           | Singleton; render driven by routing hooks.                                     |
| `NavItem`       | ❌ Skip           | Internal hooks trigger renders regardless of prop stability.                   |
| `Navbar`        | ❌ Skip           | Singleton with negligible render cost.                                         |
| `Footer`        | ❌ Skip           | M8 solves the actual issue more effectively.                                   |
| `Cursor`        | ❌ Skip           | Driven by MotionValues, already effectively static from React's perspective.   |

---

## `WorkWord`

**Verdict:** 🟡 Profile first

Props:

```ts
{
  word: string;
  index: number;
  scrollProgress: MotionValue<number>;
  isActive: boolean;
  onHover?: (word) => void;
}
```

At first glance this looks memo-friendly:

* primitive props
* stable MotionValue reference
* rendered multiple times

However there is one important assumption:

`scrollProgress` must be the same MotionValue instance across renders.

If the parent recreates it via `useTransform()` or similar logic during render,
memoization becomes ineffective.

### Required checks

Verify:

```tsx
const scrollProgress = useScroll(...);
```

or another stable hook result is passed directly.

Verify that `onHover` is wrapped with `useCallback` (see M9).

Only after confirming both conditions should memoization be considered.

Implementation:

```tsx
export default memo(WorkWord);
```

Do not introduce a custom comparator unless profiling proves it necessary.

---

## `TechStackCell`

**Verdict:** ❌ Do not memoize

Current signature:

```ts
{
  children: React.ReactNode;
  ...
}
```

The important detail is the `children` prop.

Typical usage:

```tsx
<TechStackCell>
  <TechStackIcon ... />
</TechStackCell>
```

In React, JSX usually creates a new ReactElement object on every parent render.

That means:

```ts
Object.is(prevChildren, nextChildren) === false
```

for most renders.

As a result:

```tsx
memo(TechStackCell)
```

will usually fail its comparison and re-render anyway.

The expected benefit is therefore negligible.

Optimization effort should target the leaf component (`TechStackIcon`) instead.

Note:

This is not a theoretical impossibility. If children become referentially stable in a future
refactor, this conclusion may change. Re-evaluate if the rendering model changes.

---

## `TechStackIcon`

**Verdict:** ✅ Apply

This is currently the strongest candidate.

Reasons:

* many instances
* leaf component
* receives mostly primitive props
* hover state changes frequently
* parent updates can cascade through the grid

When `activeCell` changes, the parent re-renders many icons.

With memoization, only icons whose props actually changed will re-render.

### Prerequisites

H3 must be completed first.

The effect-based hover synchronization should be removed before introducing memoization.

Parent handlers must be wrapped in `useCallback`.

`icon` objects must come from a module-level config array so references remain stable.

Implementation:

```tsx
export default memo(TechStackIcon);
```

Default comparator is sufficient.

---

## `ProjectCard`

**Verdict:** ✅ Apply

Rendered in a collection.

Contains:

* Image
* Skeleton
* Tags
* Multiple layout nodes

The render cost is non-trivial.

### Critical verification

Memoization is effective only if:

```tsx
projects.map(project => (
  <ProjectCard project={project} />
))
```

is used.

Memoization is ineffective if:

```tsx
projects.map(project => (
  <ProjectCard project={{ ...project }} />
))
```

or any equivalent object reconstruction occurs.

The `project` reference must remain stable.

### Implementation

```tsx
export default memo(ProjectCard);
```

Default comparator is sufficient.

---

## `VideoLayer`

**Verdict:** ✅ Apply

Rendered multiple times simultaneously.

Only one layer is active at a time.

Without memoization:

* all layers participate in parent updates

With memoization:

* inactive layers can be skipped

### Prerequisites

M9 must be completed first.

Verify that:

```tsx
onEnded
```

is stable.

Bad:

```tsx
onEnded={() => handleEnded(word)}
```

Good:

```tsx
const handleEnded = useCallback(...);
```

### Implementation

```tsx
export default memo(VideoLayer);
```

Default comparator is sufficient.

---

## Components that should NOT be memoized

### Header

Server Component.

`memo()` is not applicable.

---

### Logo

Singleton.

Renders primarily on route changes through `usePathname()`.

Memoization provides no meaningful benefit.

---

### NavItem

Uses:

```tsx
usePathname()
useLenis()
```

internally.

Hook-driven updates still trigger renders.

Memoization cannot prevent those updates.

---

### Navbar

Singleton rendering only a few items.

Comparison overhead is likely greater than render savings.

---

### Footer

M8 already isolates the frequently updating time display.

After M8, Footer becomes effectively static.

Additional memoization is unnecessary.

---

### Cursor

Receives MotionValue references.

Visual updates occur outside React's render cycle.

Memoization does not meaningfully improve performance.

---

## Recommended Execution Order

1. Complete H3
2. Complete M9
3. Profile scroll + hover interactions
4. Implement:

   * `memo(TechStackIcon)`
   * `memo(ProjectCard)`
   * `memo(VideoLayer)`
5. Re-profile
6. Evaluate `WorkWord`
7. Leave all remaining components unchanged unless profiling identifies a regression

**Default recommendation without profiler evidence:**

Apply:

* `TechStackIcon`
* `ProjectCard`
* `VideoLayer`

Profile first:

* `WorkWord`

Skip:

* `TechStackCell`
* `Header`
* `Logo`
* `NavItem`
* `Navbar`
* `Footer`
* `Cursor`


---

### M2. `HeroTitle.tsx` — boolean prop explosion

**File:** `src/components/ui/HeroTitle.tsx`
**User impact:** 🔧

5 variant props (`once`, `showDot`, `trigger`, `as`, `viewport`) create 32 theoretical
configurations, most untested.

**Fix — audit usages first, extract named presets.**

Current usages in the codebase:

| File                    | Props                                        |
| ----------------------- | -------------------------------------------- |
| `ProjectDetailClient.tsx` | `once:true`, `trigger:"mount"`, `showDot:false` |
| `Hey.tsx`               | `once:true`, `trigger:"mount"`               |
| `AboutContacts.tsx`     | `as:"h2"`, trigger via `viewport` (inView)   |
| `Hello.tsx`             | `trigger:"mount"`                            |

If only 2-3 distinct combinations, extract presets. If more varied, use compound component pattern.

```tsx
export const HeroTitleAnimated = (props) => <HeroTitle once trigger="mount" {...props} />;
export const HeroTitleStatic   = (props) => <HeroTitle once={false} {...props} />;
```

---

### M3. Layout shift from `useElementHeight`

**Files:** `src/hooks/useElementHeight.ts`, `src/components/about/AboutLayout.tsx`
**User impact:** 🎯 Visible CLS — height starts at `0` (`calc(100vh - 0px)`), jumps after paint

**Problem:** The current hook sets up a `ResizeObserver` inside a `useEffect`, which fires
**after** the browser paints the initial frame. Until then `bodyHeight` is `0`, causing a
layout jump.

**Fix — callback ref for the initial measure, ResizeObserver for subsequent changes:**

The callback ref fires synchronously during the first render commit, before the browser
paints. Once the node is available, a `ResizeObserver` is attached to handle dynamic
height changes (e.g., window resize, content reflow). Both are scoped to the same node
reference — no magic attributes, no secondary DOM queries.

```tsx
"use client";

import { useState, useCallback, useRef } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measuredRef = useCallback((node: T | null) => {
    // Disconnect any previous observer when the node changes
    observerRef.current?.disconnect();

    if (!node) return;

    // Measure synchronously on mount — no paint flash
    setHeight(node.getBoundingClientRect().height);

    // Watch for subsequent resize changes
    observerRef.current = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observerRef.current.observe(node);
  }, []);

  return [measuredRef, height] as const;
}
```

Usage in `AboutLayout.tsx` is unchanged — the ref is still passed to the element:

```tsx
const [headerRef, headerHeight] = useElementHeight<HTMLElement>();
<header ref={headerRef}>...</header>
```

> The `observerRef` here is necessary — unlike H2, the observer must persist between
> renders so it can be disconnected when the node changes or unmounts. The callback ref
> itself does not receive a cleanup return value, so the ref is the only way to hold
> the observer instance across re-renders.

---

### M4. Hydration mismatch — time, year, age hooks

**Files:** `src/hooks/useCurrentTime.ts`, `src/hooks/useCurrentYear.ts`, `src/hooks/useAge.ts`
**User impact:** 🎯 Console hydration error + content flash

Each hook has a different correct fix.

**`useCurrentYear` — eliminate the hook entirely.**

Year is static per request. Compute in a Server Component and pass as prop:

```tsx
// In Footer's server wrapper or parent layout
const year = new Date().getFullYear();
<Footer year={year} />;
```

**`useAge` — same approach.**

`src/utils/date.ts` already exports `getAgeFromBirthDate` — reuse it server-side:

```tsx
// In the server component:
const age = getAgeFromBirthDate(BIRTH_DATE);
<AboutIntro age={age} />;
```

**`useCurrentTime` — inherently client-side, use `useSyncExternalStore`.**

```ts
"use client";

import { useSyncExternalStore } from "react";

function getTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function subscribe(callback: () => void): () => void {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

export function useCurrentTime(): string {
  return useSyncExternalStore(
    subscribe,
    getTime,  // client snapshot — actual time
    () => "", // server snapshot — matches SSR output; no mismatch during hydration
  );
}
```

React uses `getServerSnapshot()` (`""`) during SSR and hydration so both sides agree,
then switches to `getSnapshot()` post-hydration. No mismatch, no suppression needed.

---

### M5. `AboutContacts.tsx` — inline viewport object ✅ DONE

**File:** `src/components/about/AboutContacts.tsx`

```tsx
// ❌ Component-level const — new reference every render
const viewportConfig = { once: false, amount: 0.6 };

// ✅ Module-level constant — stable reference
const VIEWPORT_CONFIG = { once: false, amount: 0.6 } as const;
```

---

### M6. `NavItem` — inline cursor config object ✅ DONE

**File:** `src/components/layout/header/Navbar.tsx` (NavItem inside)

When `isActive` is `true`, the cursor config `{ onEnter: { size, color } }` is created
inline and passed to `useCursorInteraction` as `customConfig`. This creates a new
reference every render, defeating the `useMemo` inside `useCursorInteraction`.

**Fix:**

```tsx
const cursorConfig = useMemo(
  () => isActive
    ? { onEnter: { size: CURSOR_SIZE.xs, color: "var(--accent)" } }
    : undefined,
  [isActive],
);

const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header", cursorConfig);
```

---

### M7. `Contacts.tsx` — inline default viewport object breaks child memo ✅ DONE

**File:** `src/components/contacts/Contacts.tsx`

```tsx
// ❌ New object every render when viewport is undefined
viewport={viewport || { once: false, amount: 0.1 }}
```

**Fix:** Module-level default:

```tsx
const DEFAULT_VIEWPORT = { once: false, amount: 0.1 } as const;
viewport={viewport ?? DEFAULT_VIEWPORT}
```

---

### M8. Footer re-renders every minute from `useCurrentTime`

**File:** `src/components/layout/Footer.tsx`

Extract time display to its own component so the Footer wrapper doesn't re-render:

```tsx
// TimeDisplay.tsx — isolated re-render scope
// useCurrentTime uses useSyncExternalStore — no hydration issues
const TimeDisplay = memo(() => {
  const time = useCurrentTime();
  return <span>{time}</span>;
});
```

---

### M9. Missing `useCallback` on handlers passed to children

**Files:**
- `src/hooks/useHowIWork.ts` — `handleWordHover`
- `src/hooks/useHowIWork.ts` — `playVideo`
- `src/components/layout/header/Navbar.tsx:35` — `handleClick` (NavItem)
- `src/components/layout/header/Logo.tsx:22` — `handleClick`

Wrap each in `useCallback`. For handlers that reference only the router or static config,
deps array will be `[]` or `[router]`.

```ts
const playVideo = useCallback((word: HoverableWord) => {
  videoRefs[word].current?.play().catch(() => {});
}, [videoRefs]);
```

---

### M10. `next.config.ts` — `cacheComponents: true` is not a valid Next.js option

**File:** `next.config.ts`

```ts
const nextConfig: NextConfig = {
  cacheComponents: true, // ← NOT a valid Next.js config key — silently ignored
  reactCompiler: true,
};
```

Remove `cacheComponents`. It has no effect and creates confusion about what the config
actually does.

---

## 🟢 Low

### L1. Template literals instead of `cn()`

**Files:** `Skeleton.tsx:29`, `DetailSectionCard.tsx:16`, `DetailTypefacesCard.tsx:34`

Replace template literals with `cn()` for consistency and to prevent Tailwind class merge
conflicts. No behavior change.

---

### L2. Missing `"use client"` on `DetailCoolShitCard.tsx`

**File:** `src/components/projects/project-detail/DetailCoolShitCard.tsx`

Add `"use client"` directive. Works today because the parent is a client boundary, but
incorrect by convention and fragile.

---

### L3. `notFound()` without `return`

**File:** `src/app/projects/[slug]/page.tsx`

```tsx
if (!project) {
  return notFound(); // ✅ Add return
}
```

`notFound()` throws internally, but omitting `return` makes the control flow misleading.
TypeScript infers `never` either way. Apply in both `generateMetadata` and `Page`.

---

### L4. `import type` for type-only imports

**File:** `src/contexts/CursorContext.tsx:6`

```tsx
import type { ReactNode } from "react";
```

Also check:
- `ProjectDetailClient.tsx` — `ComponentType` from `react`
- `DetailCoolShitCard.tsx` — already uses `import type { ComponentType }` ✅
- `DetailCustomComponentsCard.tsx` — already uses `import type { ComponentType }` ✅

---

### L5. TechStack — `Map` for index lookup

**File:** `src/components/about/tech-stack/TechStack.tsx`

```tsx
const techMap = new Map(techConfig.map((item) => [item.cellIndex, item]));
// techMap.get(index) replaces techConfig.find(...)
```

O(7×N) for a portfolio-size array has zero measurable impact. Listed for code clarity only.

---

### L6. Passive event listeners

**File:** `src/contexts/CursorContext.tsx`

```tsx
// ✅ Already correct
window.addEventListener("mousemove", handleMouseMove, { passive: true });

// ❌ Missing passive flag
document.body.addEventListener("mouseleave", handleMouseLeave);
document.body.addEventListener("mouseenter", handleMouseEnter);
```

`mouseenter`/`mouseleave` don't support `preventDefault()`, so `{ passive: true }` is
safe. It has no behavioral effect here, but it clarifies intent and future-proofs the
listeners.

---

### ~~L7. `useState` initializer with SSR-incompatible DOM access~~ (removed)

Rendered moot by H2 — scroll lock approach removed all `checkVisibility` code
from `HowIWork.tsx` and `TechStack.tsx`. The `useState` initializer with DOM access
no longer exists in the codebase.

---

## Effort Summary

| Phase             | Issues | Est. Effort | User-visible impact                      |
| ----------------- | ------ | ----------- | ---------------------------------------- |
| Phase 1: Critical | C1–C2  | 2–3h        | Bundle size ↓, correctness ✓             |
| Phase 2: High     | H1–H3  | 3–5h        | Hover jank ↓, maintainability ↑          |
| Phase 3: Medium   | M1–M10 | 5–9h        | CLS ↓, hydration errors ↓, re-renders ↓  |
| Phase 4: Low      | L1–L7  | 1–2h        | Code hygiene only                        |

**Total estimated effort: 11–19h** across ~30 files.

---

## Execution Checklist

### Phase 1 (Critical)  ✅
- [x] `pnpm build` passes
- [x] Bundle analyzer shows project-specific chunks as separate files
- [x] `pnpm lint` passes

### Phase 2 (High)  ✅
- [x] Manual QA: header/footer render correctly (hardcoded delays, no scroll lock)
- [x] Manual QA: `TechStackIcon` hover animations + cursor change work
- [x] `tsc --noEmit` passes
- [x] `pnpm lint` + `pnpm build` pass

### Phase 3 (Medium)
- [ ] Lighthouse CLS: compare with baseline (M3, M4)
- [ ] No hydration warnings in browser console
- [ ] React Profiler: re-run scroll + hover, compare render counts vs baseline
- [ ] Manual QA: time display in Footer updates correctly
- [ ] Verify `next.config.ts` no longer contains `cacheComponents`

### Phase 4 (Low)
- [ ] `pnpm lint` clean
- [ ] `tsc --noEmit` clean

### Final
- [ ] Deploy preview → full manual QA: scroll, hover, cursor, project detail navigation
- [ ] Compare Lighthouse before/after
- [ ] Compare bundle size before/after Phase 1

---

## Changes vs. v4

| Change | Reason |
| --- | --- |
| H1: two-step approach (remove dead prop → extract variants) | No caller passes `preventAnimation` — doing extraction before removal adds abstraction on top of dead code. Step 2 only when a static variant is concretely needed. |
| H2: scroll lock + hardcoded delays (instead of custom hook) | Scroll lock guarantees intro elements are always in view at load time. Entire `useIsInView` hook and all `checkVisibility` logic removed — delays are now constants. Simpler and zero runtime overhead. |
| H2: `observerRef` removed, local variable used | The observer is created, used, and cleaned up entirely inside one effect. A `useRef` adds indirection with no benefit; a local variable is correct and simpler. |
| M3: rewritten — no `data-height-ref`, no dead `heightRef` | v4 introduced a magic attribute coupling (caller must add `data-height-ref`) and unused code. New fix uses callback ref + ResizeObserver on the same node reference, self-contained. |
| M3: `observerRef` retained | Unlike H2, the ResizeObserver here must survive between renders to be disconnectable when the node changes. The ref is necessary; the note in the document explains the distinction. |
| L7: removed entirely | H2's scroll lock approach makes this moot — `useState` initializer with DOM access no longer exists in the codebase. |