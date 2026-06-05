"use client";

import { usePathname } from "next/navigation";
import type { ThemeVariant } from "@/types/theme";

export const useThemeVariant = (): ThemeVariant => {
  const pathname = usePathname();

  return pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/projects/")
    ? "light"
    : "dark";
};
