"use client";

import { useThemeVariant } from "@/hooks/useThemeVariant";
import GridLines from "@/components/layout/GridLines";

export default function Grid() {
  const variant = useThemeVariant();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mx-4"
      aria-hidden="true"
      data-variant={variant}
    >
      <GridLines variant={variant} />
    </div>
  );
}
