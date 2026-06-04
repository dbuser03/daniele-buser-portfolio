import { HoverableWord, TechStackIconConfig } from "@/types/about";
import { getTechStackCellId } from "@/utils/about";

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
    sizeClass: "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
    href: "https://react.dev/",
    label: "React",
  },
  {
    path: "/icons/nextjs-icon.svg",
    sizeClass: "h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36",
    href: "https://nextjs.org/",
    label: "Next.js",
    hoverPaddingClass: "px-10 py-3 sm:px-14 sm:py-4",
  },
  {
    path: "/icons/typescript-icon.svg",
    sizeClass: "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
    href: "https://www.typescriptlang.org/",
    label: "TypeScript",
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
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
      href: "https://kotlinlang.org/",
      label: "Kotlin",
    },
  },
  {
    cellIndex: 1,
    icon: {
      path: "/icons/motion-icon.svg",
      sizeClass: "h-14 w-14 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]",
      href: "https://motion.dev/",
      label: "Framer Motion",
    },
  },
  {
    cellIndex: 2,
    icon: {
      path: "/icons/tailwind-icon.svg",
      sizeClass: "h-14 w-14 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]",
      href: "https://tailwindcss.com/",
      label: "Tailwind CSS",
    },
  },
  {
    cellIndex: 3,
    icon: {
      path: "/icons/webflow-icon.svg",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
      href: "https://webflow.com/",
      label: "Webflow",
    },
  },
  {
    cellIndex: 4,
    icon: {
      path: "/icons/figma-icon.svg",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
      href: "https://www.figma.com/",
      label: "Figma",
    },
  },
  {
    cellIndex: 5,
    icon: {
      path: "/icons/vercel-icon.svg",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
      href: "https://vercel.com/home",
      label: "Vercel",
    },
  },
  {
    cellIndex: 6,
    icon: {
      path: "/icons/github-icon.svg",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
      href: "https://github.com/dbuser03",
      label: "GitHub",
    },
  },
];
