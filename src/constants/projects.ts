import type { Project } from "@/types/projects";
import { LEONARDO_BRAND_COLORS } from "@/packages/leonardo-berselli-portfolio/constants/colors";

export const PROJECTS: Project[] = [
  {
    id: "leonardo-berselli-portfolio",
    title: "Leonardo Berselli's Portfolio",
    description:
      "Portfolio website for Machine Learning Engineer Leonardo Berselli, built with Next.js, Tailwind, and Motion, featuring custom WebGL and physics details.",
    descriptionCol1:
      "Leonardo Berselli is a Machine Learning Engineer. His portfolio features a highly interactive, techy aesthetic inspired by the world of informatics.",
    descriptionCol2:
      "The main site is built using Next.js, Tailwind, and Motion, with custom Three.js WebGL and Matter.js physics integrated as refined interactive details.",
    image:
      "/projects/leonardo-berselli-portfolio/leonardo-berselli-portfolio.webp",
    cardImage:
      "/projects/leonardo-berselli-portfolio/leonardo-berselli-portfolio.webp",
    tags: ["Next.js", "Tailwind", "Motion", "WebGL"],
    year: "2026",
    brandingColors: LEONARDO_BRAND_COLORS,
    brandingFonts: [
      {
        name: "PP Neue Montreal",
        familyVar: "var(--font-pp-montreal)",
        type: "sans",
        weights: [
          {
            name: "Light 300",
            value: 300,
            file: "pp-neue-montreal/PPNeueMontreal-Light.otf",
          },
          {
            name: "Regular 400",
            value: 400,
            file: "pp-neue-montreal/PPNeueMontreal-Regular.otf",
          },
          {
            name: "Semibold 600",
            value: 600,
            file: "pp-neue-montreal/PPNeueMontreal-Semibold.otf",
          },
        ],
      },
      {
        name: "PP Neue Montreal Mono",
        familyVar: "var(--font-pp-montreal-mono)",
        type: "mono",
        weights: [
          {
            name: "Thin 100",
            value: 100,
            file: "pp-neue-montreal-mono/PPNeueMontrealMono-Thin.otf",
          },
          {
            name: "Book 400",
            value: 400,
            file: "pp-neue-montreal-mono/PPNeueMontrealMono-Book.otf",
          },
          {
            name: "Bold 700",
            value: 700,
            file: "pp-neue-montreal-mono/PPNeueMontrealMono-Bold.otf",
          },
        ],
      },
    ],
    architectureTree: [
      {
        name: "app",
        type: "dir",
        children: [
          { name: "globals.css", type: "file" },
          { name: "icon.tsx", type: "file" },
          { name: "layout.tsx", type: "file" },
          { name: "page.tsx", type: "file" },
        ],
      },
      {
        name: "components",
        type: "dir",
        children: [
          {
            name: "layout",
            type: "dir",
            children: [
              { name: "index.ts", type: "file" },
              { name: "NavigationMenu.tsx", type: "file" },
              { name: "SystemDiagnostics.tsx", type: "file" },
              { name: "ThemeToggle.tsx", type: "file" },
            ],
          },
          {
            name: "providers",
            type: "dir",
            children: [
              { name: "index.ts", type: "file" },
              { name: "SmoothScroll.tsx", type: "file" },
              { name: "ThemeProvider.tsx", type: "file" },
            ],
          },
          {
            name: "sections",
            type: "dir",
            children: [
              {
                name: "skills",
                type: "dir",
                children: [
                  { name: "SkillCard.tsx", type: "file" },
                  { name: "SkillTree.tsx", type: "file" },
                ],
              },
              { name: "index.ts", type: "file" },
              { name: "AboutSection.tsx", type: "file" },
              { name: "ContactSection.tsx", type: "file" },
              { name: "ProjectsSection.tsx", type: "file" },
              { name: "SkillsSection.tsx", type: "file" },
            ],
          },
          {
            name: "ui",
            type: "dir",
            children: [
              { name: "Badge.tsx", type: "file" },
              { name: "Button.tsx", type: "file" },
              { name: "Card.tsx", type: "file" },
              { name: "ScrollArea.tsx", type: "file" },
              { name: "Switch.tsx", type: "file" },
              { name: "Tabs.tsx", type: "file" },
              { name: "TextArea.tsx", type: "file" },
            ],
          },
          {
            name: "visuals",
            type: "dir",
            children: [
              { name: "DottedGrid.tsx", type: "file" },
              { name: "EarthGlobeAscii.tsx", type: "file" },
              { name: "PhysicsTags.tsx", type: "file" },
              { name: "Preloader.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "constants",
        type: "dir",
        children: [
          { name: "animations.ts", type: "file" },
          { name: "contact.ts", type: "file" },
          { name: "index.ts", type: "file" },
          { name: "navigation.ts", type: "file" },
          { name: "visuals.ts", type: "file" },
        ],
      },
      {
        name: "hooks",
        type: "dir",
        children: [
          { name: "index.ts", type: "file" },
          { name: "useContactForm.ts", type: "file" },
          { name: "useCopyToClipboard.ts", type: "file" },
          { name: "useNavTypewriter.ts", type: "file" },
          { name: "usePreloaderCard.ts", type: "file" },
          { name: "useSectionObserver.ts", type: "file" },
          { name: "useSystemDiagnostics.ts", type: "file" },
          { name: "useTypewriter.ts", type: "file" },
          { name: "useUptime.ts", type: "file" },
        ],
      },
      {
        name: "lib",
        type: "dir",
        children: [{ name: "utils.ts", type: "file" }],
      },
      {
        name: "types",
        type: "dir",
        children: [{ name: "index.ts", type: "file" }],
      },
    ],
    showcaseFiles: {
      "components/ui/Button.tsx": "components/Button.tsx",
      "components/ui/Badge.tsx": "components/Badge.tsx",
      "components/ui/Switch.tsx": "components/Switch.tsx",
      "components/ui/Card.tsx": "components/Card.tsx",
      "components/visuals/EarthGlobeAscii.tsx": "components/EarthGlobeAscii.tsx",
      "hooks/usePreloaderCard.ts": "hooks/usePreloaderCard.ts",
      "hooks/useSystemDiagnostics.ts": "hooks/useSystemDiagnostics.ts",
      "types/index.ts": "types/index.ts",
    },
    architectureDescriptions: {
      app: "Entry point — pages, layout, global styles, and app icon.",
      components: "Reusable UI building blocks organized by responsibility.",
      "components/layout": "Layout-level components — navigation, system diagnostics, theme toggle.",
      "components/providers": "React context providers for smooth scrolling and theming.",
      "components/sections": "Top-level page sections — about, skills, projects, contact.",
      "components/sections/skills": "Skill display components — cards and interactive tree view.",
      "components/ui": "Primitive UI components — badge, button, card, tabs, textarea.",
      "components/visuals": "Visual effects — WebGL globe, ASCII globe, physics tags, preloader.",
      constants: "Shared constants — animations, contact, navigation, visuals.",
      hooks: "Custom React hooks — typewriter, preloader, scroll observer, contact form.",
      lib: "Utility functions and helpers.",
      types: "TypeScript type definitions.",
    },
    codeTechnologiesText: [
      "Next.js and Tailwind CSS drive the project’s performance and structure, while Motion and WebGL power the interactive visual experiences.",
    ],
    codeTechnologiesTokens: [
      { text: "Next.js", id: "next-js", href: "https://nextjs.org" },
      { text: "Tailwind CSS", id: "tailwind-css", href: "https://tailwindcss.com" },
      { text: "Motion", id: "motion", href: "https://motion.dev" },
      { text: "WebGL", id: "webgl", href: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" },
    ],
    codeTechnologiesDescription: "Mostly pnpm install and good intentions.",
    hasCustomComponents: true,
    hasCoolShit: true,
    coolShitName: "EarthGlobeAscii",
    shipImage1: "",
    shipImage2: "",
    shipText1:
      "The site ships as a single Next.js app — responsive, performant, accessible. Every micro-interaction and WebGL detail was tuned to load without friction.",
    shipText2:
      "Built so Leonardo can maintain it himself. Content updates don't require touching code, and deploys run automatically on push.",
  },
];
