export const getLogoTitleColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--background)" : "var(--foreground)";
};

export const getLogoSubtitleColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--neutral-dark)" : "var(--neutral)";
};
