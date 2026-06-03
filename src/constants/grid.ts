import { GridConfig } from "@/types/grid";

export const GRID_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const GRID_CONFIG: GridConfig = {
  base: { columns: 4, gutter: 16, margin: "mx-4" },
  sm: { columns: 4, gutter: 16, margin: "mx-4" },
  md: { columns: 8, gutter: 16, margin: "mx-4" },
  lg: { columns: 8, gutter: 16, margin: "mx-4" },
  xl: { columns: 12, gutter: 16, margin: "mx-4" },
  "2xl": { columns: 12, gutter: 16, margin: "mx-4" },
};
