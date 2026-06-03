export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface GridBreakpointConfig {
  columns: number;
  gutter: number;
  margin: string;
}

export type GridConfig = Record<GridBreakpoint, GridBreakpointConfig>;

export interface GridProps {
  variant?: "dark" | "light";
}
