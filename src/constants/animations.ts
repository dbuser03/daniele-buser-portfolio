export const CURSOR_SPRING_CONFIG = {
  stiffness: 500,
  damping: 40,
} as const;

export const TECH_CELL_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.9,
} as const;

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const FADE_UP_TRANSITION = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
} as const;

export const STAGGER_FADE_UP = (delay: number) => ({
  duration: 0.5,
  ease: "easeOut" as const,
  delay,
}) as const;
