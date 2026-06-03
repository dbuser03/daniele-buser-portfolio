"use client";

import { useThemeVariant } from "@/hooks/useThemeVariant";

export default function Grid() {
  const variant = useThemeVariant();

  const gridLineColor =
    variant === "light"
      ? "var(--grid-line-light)"
      : "var(--grid-line-dark)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mx-4"
      aria-hidden="true"
      data-variant={variant}
    >
      <div
        className="grid h-full w-full grid-cols-4 gap-4 md:grid-cols-8 xl:grid-cols-12"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className={`relative h-full border-x border-(--grid-line-color) ${
              index >= 4 ? "hidden md:block" : ""
            } ${index >= 8 ? "md:hidden xl:block" : ""}`}
            style={
              {
                "--grid-line-color": gridLineColor,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
