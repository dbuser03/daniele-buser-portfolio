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
    hasCustomComponents: true,
    hasCoolShit: true,
    coolShitName: "EarthGlobeAscii",
  },
];
