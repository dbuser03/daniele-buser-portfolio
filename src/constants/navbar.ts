import { NavLink } from "@/types/navbar";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contacts", label: "CONTACTS" },
];

export const navbarItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const navbarAnimationConfig = {
  duration: 0.6,
  ease: "easeInOut" as const,
};

export const navbarHoverAnimationConfig = {
  duration: 0.2,
  ease: "easeInOut" as const,
};

export const navbarDelays = {
  baseDelay: 0.2,
  itemIncrement: 0.2,
};
