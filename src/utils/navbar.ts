export const isActiveNavLink = (pathname: string, href: string): boolean => {
  return pathname === href;
};

export const getNavbarTextColor = (
  variant: "dark" | "light",
  isActive: boolean,
): string => {
  if (variant === "light") {
    return isActive ? "var(--background)" : "var(--neutral-dark)";
  }
  return isActive ? "var(--foreground)" : "var(--neutral)";
};

export const getNavbarHoverColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--background)" : "var(--foreground)";
};
