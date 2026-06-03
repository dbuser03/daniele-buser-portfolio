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
