import { HoverableWord, TechStackIconConfig } from "@/types/about";
import { getTechStackCellId } from "@/utils/about";
import { GITHUB_URL } from "@/constants/site";

export const BIRTH_DATE = new Date(2003, 8, 25);

/** Display order of words in the How I Work section */
export const HOW_I_WORK_WORDS: HoverableWord[] = [
  "Obsess",
  "Design",
  "Code",
  "Ship",
];

export const VIDEO_MAP: Record<HoverableWord, string> = {
  Obsess: "/videos/cosmos_1029327048.mp4",
  Design: "/videos/cosmos_236671030.mp4",
  Code: "/videos/cosmos_2067680266.mp4",
  Ship: "/videos/cosmos_341236427.mp4",
};

/** Sequence order for auto-play rotation (may differ from display order) */
export const HOW_I_WORK_SEQUENCE = HOW_I_WORK_WORDS;

export const TECH_STACK_DEFAULT_CELL_ID = getTechStackCellId("first", 0);

export const TECH_STACK_FIRST_ROW_ICONS: TechStackIconConfig[] = [
  {
    path: "/icons/react-icon.svg",
    sizeClass: "h-24 w-24",
    href: "https://react.dev/",
    label: "React",
    hoverPaddingClass: "p-12",
  },
  {
    path: "/icons/nextjs-icon.svg",
    sizeClass: "h-36 w-36",
    href: "https://nextjs.org/",
    label: "Next.js",
    hoverPaddingClass: "px-14 py-4",
  },
  {
    path: "/icons/typescript-icon.svg",
    sizeClass: "h-24 w-24",
    href: "https://www.typescriptlang.org/",
    label: "TypeScript",
    hoverPaddingClass: "p-12",
  },
];

export const TECH_STACK_SECOND_ROW_ICONS: Array<{
  cellIndex: number;
  icon: TechStackIconConfig;
}> = [
  {
    cellIndex: 0,
    icon: {
      path: "/icons/kotlin-icon.svg",
      sizeClass: "h-16 w-16",
      href: "https://kotlinlang.org/",
      label: "Kotlin",
    },
  },
  {
    cellIndex: 1,
    icon: {
      path: "/icons/motion-icon.svg",
      sizeClass: "h-[4.5rem] w-[4.5rem]",
      href: "https://motion.dev/",
      label: "Framer Motion",
    },
  },
  {
    cellIndex: 2,
    icon: {
      path: "/icons/tailwind-icon.svg",
      sizeClass: "h-[4.5rem] w-[4.5rem]",
      href: "https://tailwindcss.com/",
      label: "Tailwind CSS",
    },
  },
  {
    cellIndex: 3,
    icon: {
      path: "/icons/webflow-icon.svg",
      sizeClass: "h-16 w-16",
      href: "https://webflow.com/",
      label: "Webflow",
    },
  },
  {
    cellIndex: 4,
    icon: {
      path: "/icons/figma-icon.svg",
      sizeClass: "h-16 w-16",
      href: "https://www.figma.com/",
      label: "Figma",
    },
  },
  {
    cellIndex: 5,
    icon: {
      path: "/icons/vercel-icon.svg",
      sizeClass: "h-16 w-16",
      href: "https://vercel.com/home",
      label: "Vercel",
    },
  },
  {
    cellIndex: 6,
    icon: {
      path: "/icons/github-icon.svg",
      sizeClass: "h-16 w-16",
      href: GITHUB_URL,
      label: "GitHub",
    },
  },
];
