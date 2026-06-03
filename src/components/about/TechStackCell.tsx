"use client";

import type { TechStackCellProps } from "@/types/about";

export default function TechStackCell({
  children,
  className,
  cellRef,
  onMouseEnter,
  onMouseLeave,
}: TechStackCellProps) {
  return (
    <div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
