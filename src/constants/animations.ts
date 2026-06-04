export const CURSOR_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
} as const;

export const TECH_CELL_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.9,
} as const;

export const SCROLL_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 110,
  damping: 26,
  mass: 0.35,
} as const;

export const EASE_OUT = "easeOut" as const;

export const FADE_UP_TRANSITION = {
  duration: 0.4,
  ease: EASE_OUT,
} as const;

export const STAGGER_FADE_UP = (delay: number) => ({
  duration: 0.35,
  ease: "easeOut" as const,
  delay,
}) as const;

export const createFadeUpVariants = (
  delay: number,
  yOffset = 30,
  duration = 0.4,
) => ({
  initial: {
    opacity: 0,
    y: yOffset,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: EASE_OUT,
      delay,
    },
  },
} as const);
