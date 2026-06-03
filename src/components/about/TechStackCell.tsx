"use client";

import { motion } from "motion/react";
import type { TechStackCellProps } from "@/types/about";

export default function TechStackCell({
  children,
  className,
  cellRef,
  onMouseEnter,
  onMouseLeave,
  isActive,
}: TechStackCellProps & { isActive: boolean }) {
  return (
    <div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isActive && (
        <motion.div
          layoutId="tech-stack-highlight"
          className="absolute inset-0 z-20 pointer-events-none bg-(--background)"
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 24,
            mass: 0.9,
          }}
        />
      )}
      <div className="relative z-30 h-full w-full">
        {children}
      </div>
    </div>
  );
}
