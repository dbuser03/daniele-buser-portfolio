export const getFooterTitleColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--background)" : "var(--foreground)";
};

export const getFooterCoordinatesColor = (
  variant: "dark" | "light",
): string => {
  return variant === "light" ? "var(--neutral-dark)" : "var(--neutral)";
};
