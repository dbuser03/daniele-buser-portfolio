export const CSS_VARIABLES = {
  accent: "var(--accent)",
  foreground: "var(--foreground)",
  background: "var(--background)",
  neutral: "var(--neutral)",
  neutralDark: "var(--neutral-dark)",
} as const;

export type CSSVariable = (typeof CSS_VARIABLES)[keyof typeof CSS_VARIABLES];
