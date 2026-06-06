import { Project } from "@/types/projects";

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
    cardImage:
      "/projects/leonardo-berselli-portfolio/leonardo-berselli-portfolio.webp",
    tags: ["Next.js", "Tailwind", "Motion", "WebGL"],
    year: "2025",
    brandingColors: [
      { hex: "#0A0A0A", pantone: "Black 6 C" },
      { hex: "#262626", pantone: "426 C" },
      { hex: "#737373", pantone: "424 C" },
      { hex: "#E5E5E5", pantone: "Cool Gray 1 C" },
      { hex: "#F7F7F7", pantone: "7541 C" },
    ],
    brandingFonts: [
      {
        name: "PP Neue Montreal",
        familyVar: "var(--font-pp-montreal)",
        type: "sans",
        weights: [
          { name: "Light 300", value: 300 },
          { name: "Regular 400", value: 400 },
          { name: "Semibold 600", value: 600 },
        ],
      },
      {
        name: "PP Neue Montreal Mono",
        familyVar: "var(--font-pp-montreal-mono)",
        type: "mono",
        weights: [
          { name: "Thin 100", value: 100 },
          { name: "Book 400", value: 400 },
          { name: "Bold 700", value: 700 },
        ],
      },
    ],
    hasCustomComponents: true,
    hasCoolShit: true,
    coolShitName: "EarthGlobeAscii",
  },
];
