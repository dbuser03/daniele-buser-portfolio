"use client";

import { usePathname } from "next/navigation";

export type ThemeVariant = "dark" | "light";

export const useThemeVariant = (): ThemeVariant => {
  const pathname = usePathname();

  return pathname === "/" || pathname === "/about" ? "light" : "dark";
};
