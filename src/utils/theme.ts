export const getPrimaryColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--background)" : "var(--foreground)";
};

export const getSecondaryColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--neutral-dark)" : "var(--neutral)";
};

export const getNavbarTextColor = (
  variant: "dark" | "light",
  isActive: boolean,
): string => {
  return isActive ? getPrimaryColor(variant) : getSecondaryColor(variant);
};

export const isActiveNavLink = (pathname: string, href: string): boolean => {
  return pathname === href;
};
