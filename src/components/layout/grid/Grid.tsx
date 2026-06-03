"use client";

import { useGridBreakpoint } from "@/hooks/useGridBreakpoint";
import { GridProps } from "@/types/grid";
import { GRID_CONFIG } from "@/constants/grid";

export default function Grid({ variant = "dark" }: GridProps) {
  const breakpoint = useGridBreakpoint();
  const config = GRID_CONFIG[breakpoint];
  const gridLineColor =
    variant === "light" ? "var(--grid-line-light)" : "var(--grid-line-dark)";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${config.margin}`}
      aria-hidden="true"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
          gap: `${config.gutter}px`,
        }}
      >
        {Array.from({ length: config.columns }).map((_, index) => (
          <div key={index} className="relative h-full">
            <div
              className="absolute top-0 left-0 h-full w-px"
              style={{ backgroundColor: gridLineColor }}
            />
            <div
              className="absolute top-0 right-0 h-full w-px"
              style={{ backgroundColor: gridLineColor }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
