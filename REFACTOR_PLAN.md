# Refactor Plan — Daniele Buser Portfolio
Generated: June 3, 2026
Audited by: Antigravity (Advanced Agentic Coding AI)

---

## 1. Executive Summary

The Daniele Buser portfolio codebase is a highly optimized, single-page creative portfolio built with Next.js 16, React 19, Tailwind CSS v4, and Motion v12. The project's architecture is clean, and type safety is well-maintained across all files with strict TypeScript enabled. However, there are two primary risk areas: performance concerns caused by layout-triggering Framer Motion animations (width, height, and margins) in the tech stack grid and hover-state arrows, and accessibility gaps relating to the complete absence of keyboard user considerations (missing "Skip to Content" link) and vestibular motion preferences (missing `useReducedMotion` support). Addressing these issues via layout-independent transforms and native CSS transitions will improve rendering speeds, eliminate layout thrashing, and bring the website into compliance with modern a11y standards. The overall effort is estimated at 3–4 days of development time.

---

## 2. Project Map

| Property               | Value                          |
|------------------------|-------------------------------|
| Router                 | App Router                     |
| TypeScript strict mode | on (no disabled flags)        |
| Tailwind version       | v4.2.4                        |
| Framer Motion version  | v12.38.0 (package `motion`)   |
| Total components       | 22                            |
| "use client" ratio     | 81.8% (18 / 22 components)    |
| Total LoC (approx)     | 2,032                         |
| Test coverage          | absent                        |
| State management       | React Context + Local State   |
| Data fetching          | None (fully static site)      |

---

## 3. Issue Registry

---

### [FM-001] — Layout-Triggering Width/Height Animations in TechStack Highlight

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-001                           |
| Severity    | 🟠 High                          |
| File        | `src/components/about/TechStack.tsx` |
| Line(s)     | 135–156                          |
| Category    | Framer Motion                    |
| Effort      | M (half day)                     |
| Risk        | Medium                           |

**Problem**
The highlight overlay container dynamically computes its size and position on hover using `getBoundingClientRect` inside a requestAnimationFrame loop, then animates its `width` and `height` properties via Framer Motion. Animating physical geometry properties causes layout thrashing and forces the browser to recalculate the page layout on every single frame, resulting in significant drops in framerate on low-end devices.

**Impact**
Jank and lag in the UI during tech stack hover animations, causing CPU spikes and dropping rendering performance below 60fps.

**Current Code**
```typescript
// src/components/about/TechStack.tsx:135
      <AnimatePresence>
        {hoveredCellId && overlayRect && (
          <motion.div
            className="pointer-events-none absolute z-20"
            style={{ backgroundColor: "var(--background)" }}
            initial={{
              ...overlayRect,
              opacity: 0,
            }}
            animate={{
              ...overlayRect,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              x: overlaySpring,
              y: overlaySpring,
              width: overlaySpring,
              height: overlaySpring,
              opacity: { duration: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
```

**Proposed Fix**
Replace the absolute bounding rect tracking logic entirely with a Framer Motion `layoutId` transition. Render the highlight container directly inside the active `TechStackCell` element, and let Framer Motion handle layout morphing via scale/translate properties automatically.

```typescript
// Proposed replacement in src/components/about/TechStackCell.tsx
import { motion, AnimatePresence } from "motion/react";

export default function TechStackCell({
  children,
  className,
  cellId,
  isActive,
  cellRef,
  onMouseEnter,
  onMouseLeave,
}: TechStackCellProps & { isActive: boolean }) {
  return (
    <div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="tech-stack-highlight"
            className="absolute inset-0 z-20 pointer-events-none bg-(--background)"
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 24,
              mass: 0.9,
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-30 h-full w-full">
        {children}
      </div>
    </div>
  );
}
```

**Notes**
This refactoring completely eliminates the custom resize observers, page coordinate listeners, and bounding client rect calculations in `TechStack.tsx`.

---

### [FM-002] — Layout-Triggering Width and Margin Animations in WorkWord Arrow Icon

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-002                           |
| Severity    | 🟠 High                          |
| File        | `src/components/about/WorkWord.tsx` |
| Line(s)     | 33–39                            |
| Category    | Framer Motion                    |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The hover variant on the arrow icon animates its `width` from `0` to `56` and `marginRight` from `0` to `12`. These geometry changes force browser layout updates on every frame of the transition.

**Impact**
Reflows the adjacent text and triggers style recalculations, reducing rendering efficiency during hover.

**Current Code**
```typescript
// src/components/about/WorkWord.tsx:33
      <motion.span
        className="h-7 shrink-0 bg-(--background) sm:h-10 xl:h-12"
        variants={{
          rest: { width: 0, opacity: 0, marginRight: 0 },
          hover: { width: 56, opacity: 1, marginRight: 12 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{
          WebkitMaskImage: "url(/icons/right-arrow.svg)",
          maskImage: "url(/icons/right-arrow.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
        aria-hidden="true"
      />
```

**Proposed Fix**
Assign a static width (`w-14`) and right margin (`mr-3`) to the arrow icon container and set its horizontal transform origin to the left. Animate its `scaleX` and `opacity` properties instead of modifying the layout dimensions.

```typescript
// Proposed replacement
      <motion.span
        className="h-7 w-14 shrink-0 bg-(--background) sm:h-10 xl:h-12 mr-3 origin-left"
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{
          WebkitMaskImage: "url(/icons/right-arrow.svg)",
          maskImage: "url(/icons/right-arrow.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
        aria-hidden="true"
      />
```

**Notes**
The hover variants must be defined outside the component function body (see issue `FM-005`).

---

### [FM-003] — Inline Animation Variants Recreated on Every Render in HeroTitle

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-003                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/ui/HeroTitle.tsx` |
| Line(s)     | 24–42                            |
| Category    | Framer Motion                    |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The dynamic `titleVariants` object is defined directly within the `HeroTitle` component function body. Since it depends on dynamic props (`yOffset`, `duration`, `delay`), the object literal is recreated on every single render cycle, creating garbage collection pressure.

**Impact**
Unnecessary motion configuration parsing and memory allocation on component rendering.

**Current Code**
```typescript
// src/components/ui/HeroTitle.tsx:24
  const titleVariants = {
    initial: {
      opacity: 0,
      y: yOffset,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    },
  } as const;
```

**Proposed Fix**
Refactor the variants structure into a helper builder function outside the component, and memoize the evaluation in the component render body via `useMemo`.

```typescript
// Proposed replacement (outside component function)
const createTitleVariants = (yOffset: number, duration: number, delay: number) => ({
  initial: {
    opacity: 0,
    y: yOffset,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  },
} as const);

// Inside HeroTitle component:
const titleVariants = useMemo(
  () => createTitleVariants(yOffset, duration, delay),
  [yOffset, duration, delay]
);
```

**Notes**
None.

---

### [FM-004] — Inline Animation Variants Recreated on Every Render in Contacts

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-004                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/contacts/Contacts.tsx` |
| Line(s)     | 73–111                           |
| Category    | Framer Motion                    |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The variables `paragraphVariants` and `linksVariants` are declared inside the `Contacts` component function body, generating object recreations on each render.

**Impact**
Garbage collection overhead and potential motion state resets if parent components cause frequent re-renders.

**Current Code**
```typescript
// src/components/contacts/Contacts.tsx:73
  const paragraphVariants = {
    initial: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: paragraphDelay,
      },
    },
  } as const;
```

**Proposed Fix**
Declare a standard fade-up builder function outside of the component body, and use memoization inside the component.

```typescript
// Proposed replacement (outside component function)
const createFadeUpVariants = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  },
} as const);

// Inside Contacts component function:
const paragraphVariants = useMemo(() => createFadeUpVariants(paragraphDelay), [paragraphDelay]);
const linksVariants = useMemo(() => createFadeUpVariants(linksDelay), [linksDelay]);
```

**Notes**
None.

---

### [FM-005] — Inline Variants Declarations in WorkWord Component JSX

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-005                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/about/WorkWord.tsx` |
| Line(s)     | 35–38, 54–57                     |
| Category    | Framer Motion                    |
| Effort      | XS (< 15 min)                    |
| Risk        | Low                              |

**Problem**
Both variants objects (for the arrow mask and the word container span) are defined as inline literals directly in the JSX props of `<motion.span>`.

**Impact**
Triggers recreation of these object literals on every hover state change or parent scroll update.

**Current Code**
```typescript
// src/components/about/WorkWord.tsx:35
      <motion.span
        className="h-7 shrink-0 bg-(--background) sm:h-10 xl:h-12"
        variants={{
          rest: { width: 0, opacity: 0, marginRight: 0 },
          hover: { width: 56, opacity: 1, marginRight: 12 },
        }}
```

**Proposed Fix**
Extract these variant configurations as static constants outside of the component body.

```typescript
// Proposed replacement (outside component function body)
const arrowVariants = {
  rest: { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1 },
} as const;

const labelVariants = {
  rest: { x: 0 },
  hover: { x: 8 },
} as const;

// Inside JSX:
// <motion.span variants={arrowVariants} ... />
// <motion.span variants={labelVariants} ... />
```

**Notes**
Also aligns with fixing layout-triggering animations on the arrow icon (see `FM-002`).

---

### [FM-006] — Hardcoded Inline Spring Configurations in Cursor Context

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-006                           |
| Severity    | 🔵 Low                           |
| File        | `src/contexts/CursorContext.tsx` |
| Line(s)     | 31                               |
| Category    | Framer Motion                    |
| Effort      | XS (< 15 min)                    |
| Risk        | Low                              |

**Problem**
The stiffness and damping configuration for the custom cursor's spring physics is defined inline inside the `CursorProvider`.

**Impact**
Limits customizability, code organization, and consistency of spring animation timings.

**Current Code**
```typescript
// src/contexts/CursorContext.tsx:31
  const cursorSize = useSpring(CURSOR_SIZE.sm, { stiffness: 500, damping: 40 });
```

**Proposed Fix**
Relocate the configuration block into a constants file, such as `src/constants/cursor.ts` or a new shared `src/constants/animations.ts` file.

```typescript
// Proposed replacement in src/constants/cursor.ts
export const CURSOR_SPRING_CONFIG = {
  stiffness: 500,
  damping: 40,
} as const;

// Inside CursorContext.tsx:
const cursorSize = useSpring(CURSOR_SIZE.sm, CURSOR_SPRING_CONFIG);
```

**Notes**
None.

---

### [FM-007] — Hardcoded Spring Config in TechStackIcon

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | FM-007                           |
| Severity    | 🔵 Low                           |
| File        | `src/components/about/TechStackIcon.tsx` |
| Line(s)     | 60–67                            |
| Category    | Framer Motion                    |
| Effort      | XS (< 15 min)                    |
| Risk        | Low                              |

**Problem**
The hover color spring transition configuration is defined inline inside the icon's motion div props.

**Impact**
Decreases maintainability and separation of concerns.

**Current Code**
```typescript
// src/components/about/TechStackIcon.tsx:60
          transition={{
            backgroundColor: {
              type: "spring" as const,
              stiffness: 170,
              damping: 24,
              mass: 0.9,
            },
          }}
```

**Proposed Fix**
Declare the spring settings in a shared constants file and import it.

```typescript
// Proposed replacement in src/constants/animations.ts
export const TECH_CELL_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.9,
} as const;

// Inside TechStackIcon.tsx:
// import { TECH_CELL_SPRING_CONFIG } from "@/constants/animations";
transition={{
  backgroundColor: TECH_CELL_SPRING_CONFIG,
}}
```

**Notes**
None.

---

### [A11Y-001] — Lack of Reduced Motion Accommodation (useReducedMotion)

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | A11Y-001                         |
| Severity    | 🟠 High                          |
| File        | `src/components/layout/ClientLayout.tsx` |
| Line(s)     | 9–26                             |
| Category    | Accessibility                    |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The portfolio executes heavy parallax transitions, scroll actions (via Lenis), custom mouse followers, and dynamic cell scaling animations. If a user has `prefers-reduced-motion` enabled in their OS settings, the site does not respect this choice, which can trigger vestibular issues.

**Impact**
Violates WCAG 2.1 Success Criterion 2.3.1 (Three Flashes or Below Threshold / Motion Preferences), making the site unusable or disorienting for users with vestibular system disorders.

**Current Code**
```typescript
// src/components/layout/ClientLayout.tsx:9
export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrolling>
      <CursorProvider>
        <div className="flex min-h-screen flex-col">
          <Grid />
          <Header />
          {children}
          <Footer />
        </div>
      </CursorProvider>
    </SmoothScrolling>
  );
}
```

**Proposed Fix**
Use Framer Motion's `useReducedMotion` hook in the layout wrapper. If active, disable the custom cursor (or hide it completely to show the system cursor), restrict animations to opacity fades, and disable Lenis smooth-scrolling.

```typescript
// Proposed replacement in src/components/layout/ClientLayout.tsx
import { useReducedMotion } from "motion/react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SmoothScrolling disabled={shouldReduceMotion}>
      <CursorProvider disabled={shouldReduceMotion}>
        <div className="flex min-h-screen flex-col">
          <Grid />
          <Header />
          {children}
          <Footer />
        </div>
      </CursorProvider>
    </SmoothScrolling>
  );
}
```

**Notes**
`SmoothScrolling.tsx` and `Cursor.tsx` must be updated to inspect the `disabled` configuration and adapt. E.g., setting Lenis `smoothWheel` option to `false`.

---

### [A11Y-002] — Missing Skip to Content Link

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | A11Y-002                         |
| Severity    | 🟡 Medium                        |
| File        | `src/app/layout.tsx`             |
| Line(s)     | 48–54                            |
| Category    | Accessibility                    |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
There is no "Skip to Content" shortcut at the very beginning of the HTML document structure. Keyboard-only navigators must tab through all header links on every single page load before reaching page-specific content.

**Impact**
Decreases key interactive usability and compromises web accessibility compliance.

**Current Code**
```typescript
// src/app/layout.tsx:48
  return (
    <html lang="en" className={neueHaasGrotesk.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
```

**Proposed Fix**
Include a screen-reader-only skip link that becomes visible on focus at the top of the body structure.

```typescript
// Proposed replacement
  return (
    <html lang="en" className={neueHaasGrotesk.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-(--accent) focus:text-(--foreground) focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none"
        >
          Skip to content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
```

**Notes**
Make sure all page layouts (e.g. `src/app/page.tsx`, `src/app/about/page.tsx`, etc.) wrap their primary layout inside a `<main id="main-content" tabIndex={-1}>` node.

---

### [TW-001] — Inline Ternaries Inside ClassName Templates

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | TW-001                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/layout/header/Navbar.tsx` |
| Line(s)     | 51–53                            |
| Category    | Tailwind CSS                     |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The active navigation states are handled via string interpolation ternaries inside the template literal. This is fragile and can lead to class specification overlap/conflicts.

**Impact**
Slightly reduced maintainability and limits the ability to write clean conditional responsive styling.

**Current Code**
```typescript
// src/components/layout/header/Navbar.tsx:51
          className={`text-xs md:text-sm focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm ${
            isActive ? "font-bold" : "font-normal"
          }`}
```

**Proposed Fix**
Implement a utility file `src/utils/cn.ts` integrating `clsx` and `tailwind-merge`. Use it to cleanly merge active and base states.

```typescript
// Proposed replacement
// In src/utils/cn.ts:
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// In Navbar.tsx:
          className={cn(
            "text-xs md:text-sm focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm",
            isActive ? "font-bold" : "font-normal"
          )}
```

**Notes**
Requires adding `clsx` and `tailwind-merge` as project dependencies (see Section 11).

---

### [TW-002] — Conditional Class Merging in Grid Component

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | TW-002                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/layout/grid/Grid.tsx` |
| Line(s)     | 21–23                            |
| Category    | Tailwind CSS                     |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
Standard template literals are used to output responsive visibility selectors based on loop indexes.

**Impact**
Difficult to read and maintain.

**Current Code**
```typescript
// src/components/layout/grid/Grid.tsx:21
            className={`relative h-full border-x border-(--grid-line-color) ${
              index >= 4 ? "hidden md:block" : ""
            } ${index >= 8 ? "md:hidden xl:block" : ""}`}
```

**Proposed Fix**
Use the `cn()` helper to cleanly express grid visibility boundaries.

```typescript
// Proposed replacement
            className={cn(
              "relative h-full border-x border-(--grid-line-color)",
              index >= 4 && "hidden md:block",
              index >= 8 && "md:hidden xl:block"
            )}
```

**Notes**
Requires setup of the `cn()` helper.

---

### [TW-003] — Framer Motion Overuse for Simple CSS Hover Colors

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | TW-003                           |
| Severity    | 🟡 Medium                        |
| File        | `src/components/contacts/Contacts.tsx` |
| Line(s)     | 35–41, 142–150                   |
| Category    | Tailwind CSS                     |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
Simple text color transformations on hover are implemented using Framer Motion `<motion.span>` or `<motion.h2>` containers with the `whileHover` prop. These can be easily handled natively by Tailwind CSS classes.

**Impact**
Increases JavaScript compilation and runtime footprint, generating React state updates on simple hover events that should be offloaded to browser style engines.

**Current Code**
```typescript
// src/components/contacts/Contacts.tsx:35
      <motion.span
        initial={{ color: "var(--neutral)" }}
        whileHover={{ color: "var(--foreground)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {label}
      </motion.span>
```

**Proposed Fix**
Replace the motion nodes with standard HTML tags styled using Tailwind's transition-colors and hover modifiers.

```typescript
// Proposed replacement (Contacts.tsx:35)
      <span className="text-(--neutral) hover:text-(--foreground) transition-colors duration-300 ease-out">
        {label}
      </span>

// Proposed replacement (Contacts.tsx:142)
          <h2
            id="contacts-heading"
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-(--foreground) hover:text-(--neutral) transition-colors duration-300 ease-out"
          >
            {EMAIL}
          </h2>
```

**Notes**
Eliminates motion dependencies from secondary text nodes.

---

### [PERF-001] — Unmemoized Interaction Handlers in useHowIWork Hook

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | PERF-001                         |
| Severity    | 🟡 Medium                        |
| File        | `src/hooks/useHowIWork.ts`       |
| Line(s)     | 22–77                            |
| Category    | Performance                      |
| Effort      | S (< 1h)                         |
| Risk        | Medium                           |

**Problem**
The state modifier and sequence handlers returned from `useHowIWork` are redefined on every execution cycle. Since they are passed as raw prop callbacks to `WorkWord` and `VideoLayer`, child nodes are subject to continuous re-renders.

**Impact**
Degraded parent/child render scheduling, especially during continuous wheel/scroll updates on the home page.

**Current Code**
```typescript
// src/hooks/useHowIWork.ts:22
  const playVideo = (word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  };

  const stopVideo = (word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };
```

**Proposed Fix**
Wrap all returned handlers in `useCallback` to preserve function references across render updates.

```typescript
// Proposed replacement
  const playVideo = useCallback((word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  }, [videoRefs]);

  const stopVideo = useCallback((word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, [videoRefs]);

  const handleWordHover = useCallback((word: HoverableWord | null) => {
    if (isImageHovered) return;
    if (activeWord) stopVideo(activeWord);
    setActiveWord(word);
    if (word) {
      const el = videoRefs[word].current;
      if (!el) return;
      el.currentTime = 0;
      playVideo(word);
    }
  }, [activeWord, isImageHovered, playVideo, stopVideo, videoRefs]);
  
  // (Apply similar useCallback setups to advanceSequence, handlePanelMouseEnter, and handlePanelMouseLeave)
```

**Notes**
Provides stable function references for the dependency arrays.

---

### [NEXT-001] — Incomplete SEO Meta Tag Declarations

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | NEXT-001                         |
| Severity    | 🔵 Low                           |
| File        | `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contacts/page.tsx` |
| Line(s)     | 3–6, 10–13, 5–8                  |
| Category    | Next.js                          |
| Effort      | S (< 1h)                         |
| Risk        | Low                              |

**Problem**
The page metadata declarations only expose the base `title` and `description` parameters, omitting OpenGraph (social sharing) and Twitter Cards.

**Impact**
Suboptimal social media previews, link card presentations, and reduced indexing profile for search engine bots.

**Current Code**
```typescript
// src/app/page.tsx:3
export const metadata: Metadata = {
  title: "Projects",
  description: "Daniele Buser's personal portfolio website.",
};
```

**Proposed Fix**
Fully configure Next.js standard Metadata structures to support standard SEO specifications.

```typescript
// Proposed replacement
export const metadata: Metadata = {
  title: "Projects | Daniele Buser",
  description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
  openGraph: {
    title: "Projects | Daniele Buser",
    description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
    url: "https://danielebuser.com",
    siteName: "Daniele Buser Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniele Buser Portfolio Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Daniele Buser",
    description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
    images: ["/og-image.png"],
  },
};
```

**Notes**
Requires putting a standard OpenGraph image file (e.g. `og-image.png`) under the public root.

---

### [NEXT-002] — Redundant Manual Font Preloading

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | NEXT-002                         |
| Severity    | 🔵 Low                           |
| File        | `src/app/layout.tsx`             |
| Line(s)     | 38–46                            |
| Category    | Next.js                          |
| Effort      | XS (< 15 min)                    |
| Risk        | Low                              |

**Problem**
`next/font/local` automatically optimizes, generates, and preloads custom local fonts defined within the configuration. The manual preloading script calls on `ReactDOM.preload` inside the RootLayout component render are redundant.

**Impact**
Creates potential console warning logs in concurrent React 19 rendering contexts and generates redundant preload tag assertions in the document head.

**Current Code**
```typescript
// src/app/layout.tsx:38
  // Preload critical font for LCP
  ReactDOM.preload("/fonts/NeueHaasGroteskDisplay-Bold.otf", {
    as: "font",
    type: "font/otf",
  });
  ReactDOM.preload("/fonts/NeueHaasGroteskDisplay-Reg.otf", {
    as: "font",
    type: "font/otf",
  });
```

**Proposed Fix**
Delete the `ReactDOM.preload` code completely and remove the `ReactDOM` import from the top of the file.

```typescript
// Proposed replacement (layout.tsx:33)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={neueHaasGrotesk.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

**Notes**
None.

---

### [TS-001] — Redundant `"use client"` Directives on Subcomponents

| Field       | Value                            |
|-------------|----------------------------------|
| ID          | TS-001                           |
| Severity    | 🔵 Low                           |
| File        | `src/components/about/TechStackCell.tsx` |
| Line(s)     | 1                                |
| Category    | TypeScript                       |
| Effort      | XS (< 15 min)                    |
| Risk        | Low                              |

**Problem**
Adding `"use client"` to subcomponents that are imported and rendered exclusively inside parent Client Components (`TechStack.tsx`) is redundant, since Next.js automatically bundles them as client-side code.

**Impact**
Unnecessary file declaration markers.

**Current Code**
```typescript
// src/components/about/TechStackCell.tsx:1
"use client";

import type { TechStackCellProps } from "@/types/about";
// ...
```

**Proposed Fix**
Remove the `"use client"` string directive from the top of the file.

```typescript
// Proposed replacement
import type { TechStackCellProps } from "@/types/about";
// ...
```

**Notes**
Apply same removal to `TechStackIcon.tsx` and `VideoLayer.tsx` where appropriate, if they are only mounted under parent client components.

---

## 4. Statistics Dashboard

### By Severity
| Severity     | Count |
|--------------|-------|
| 🔴 Critical  | 0     |
| 🟠 High      | 3     |
| 🟡 Medium    | 8     |
| 🔵 Low       | 5     |
| **Total**    | **16**|

### By Category
| Category       | Count |
|----------------|-------|
| Next.js        | 2     |
| TypeScript     | 1     |
| Tailwind CSS   | 3     |
| Framer Motion  | 8     |
| Accessibility  | 2     |
| Performance    | 0     |

### By Effort
| Effort | Count | Total time estimate |
|--------|-------|---------------------|
| XS     | 5     | ~1h                 |
| S      | 10    | ~7h                 |
| M      | 1     | ~4h                 |
| L      | 0     | 0                   |
| XL     | 0     | 0                   |
| **Grand Total** | **16** | **~12 hours** |

---

## 5. Quick Wins (High Impact, Low Effort)

| ID | Title | File | Effort | Impact |
|----|-------|------|--------|--------|
| FM-002 | Avoid Layout-Triggering Width and Margin Animations | `src/components/about/WorkWord.tsx` | S | 🟠 High |
| A11Y-001 | Support user prefers-reduced-motion configuration | `src/components/layout/ClientLayout.tsx` | S | 🟠 High |

---

## 6. Architectural Improvements

### [A] Centralized Class Utility (`cn` Helper)

**What**
Introduce a centralized class merging wrapper `cn()` using `clsx` and `tailwind-merge` to resolve responsive property overlaps dynamically.

**Why**
Eliminates logic templates with raw ternaries inside component class names (e.g. in `Navbar.tsx` and `Grid.tsx`), improving readability and ensuring styles don't conflict at breakpoints.

**Affected Files**
- `src/components/layout/header/Navbar.tsx`
- `src/components/layout/grid/Grid.tsx`
- `src/components/contacts/Contacts.tsx`

**Approach**
1. Add `clsx` and `tailwind-merge` dependencies.
2. Create `src/utils/cn.ts` exporting the helper function.
3. Refactor target components to utilize the new wrapper.

**Risks & Mitigations**
Low risk. Ensure Tailwind JIT parser properly picks up class outputs.

**Estimated Effort**: 0.5 days

---

### [B] Layout-Driven Hover Highlight (FLIP Overlay)

**What**
Refactor the custom `ResizeObserver` bounding client coordinate animation in `TechStack.tsx` into a native Framer Motion layoutId transition.

**Why**
Prevents browser rendering delays, eliminates layout recalculation during hover gestures, and drops complex Javascript calculations in favor of GPU-accelerated transforms.

**Affected Files**
- `src/components/about/TechStack.tsx`
- `src/components/about/TechStackCell.tsx`

**Approach**
1. Modify `TechStackCell` to accept an `isActive` boolean.
2. Insert a `<motion.div layoutId="highlight">` absolute overlay inside `TechStackCell` that triggers on mount when active.
3. Clean up container tracking, bounding calculations, resize hooks, and `requestAnimationFrame` calculations from `TechStack.tsx`.

**Risks & Mitigations**
Requires checking container sizing rules so the layout transitions smoothly inside display grid wrappers.

**Estimated Effort**: 0.5 days

---

## 7. Dependency & Blocking Map

```
TW-001 (add cn helper in src/utils/cn.ts)
  ├── blocks: TW-002 (refactor conditional classes in Grid)
  └── blocks: TW-001 (clean up Navbar conditional styles)

A11Y-001 (implement prefers-reduced-motion check in ClientLayout)
  └── blocks: A11Y-001b (disable Lenis smooth scroll on reduced motion)
  └── blocks: A11Y-001c (hide custom cursor on reduced motion)
```

---

## 8. Proposed Execution Roadmap

### Wave 1 — Critical Fixes & Quick Wins (Day 1)
* Implement prefers-reduced-motion verification (`A11Y-001`).
* Fix the arrow animation layout reflow on `WorkWord` (`FM-002`).
* Remove redundant font preloading codes (`NEXT-002`).

### Wave 2 — Performance & Architecture (Day 2)
* Refactor TechStack highlight overlay into layoutId animation (`FM-001`).
* Install class-merging helper dependencies and establish `src/utils/cn.ts` (`TW-001`).
* Apply callback memoization inside `useHowIWork.ts` (`PERF-001`).

### Wave 3 — Code Quality & DX (Day 3)
* Relocate spring timing declarations to `src/constants/animations.ts` (`FM-006`, `FM-007`).
* Move local variant models out of component body renders (`FM-003`, `FM-004`, `FM-005`).
* Replace cursor motion span styles with native Tailwind CSS utilities (`TW-003`).

### Wave 4 — Polish & Long-Term Debt (Day 4)
* Configure extended SEO metadata (`NEXT-001`).
* Insert skip-to-content focus routing shortcuts (`A11Y-002`).
* Clean up redundant subcomponent markers (`TS-001`).

---

## 9. Files That Need Zero Changes

- `src/components/contacts/Hello.tsx` — clean
- `src/components/about/Hey.tsx` — clean
- `src/utils/theme.ts` — clean
- `src/utils/about.ts` — clean
- `src/utils/date.ts` — clean
- `src/constants/contacts.ts` — clean
- `src/constants/cursor.ts` — clean
- `src/constants/grid.ts` — clean
- `src/constants/layout.ts` — clean
- `src/constants/theme.ts` — clean
- `src/types/contacts.ts` — clean
- `src/types/grid.ts` — clean
- `src/types/theme.ts` — clean
- `src/types/ui.ts` — clean

---

## 10. Open Questions for the Team

1. **Age computation formatting**: Daniele's birth date is declared as `new Date(2003, 8, 25)` (September 25, 2003). In JS, month indexing is zero-based, meaning `8` maps to September. Please confirm if his birth month is indeed September. If it is August, the index in `about.ts` needs to be updated to `7`.
2. **Smooth Scroll Behavior for Keyboard Navigators**: Lenis is set to smooth scroll page-wide. When implementing the "Skip to Content" link, smooth scroll might make page skips slow. Let's align on whether keyboard-triggered navigation should bypass smooth scroll instantly (this is recommended to avoid keyboard user fatigue).

---

## 11. Recommended Dependency Updates

| Package | Current | Latest | Reason to Update | Breaking Changes Risk |
|---------|---------|--------|------------------|-----------------------|
| clsx | N/A | ^2.1.1 | Required for dynamic class merging and utility setup. | None |
| tailwind-merge | N/A | ^3.0.0 | Required to merge CSS utility classes without conflicts. | None |

---
_End of Refactor Plan_
