"use client";

import { motion } from "motion/react";
import type { TechStackCellProps } from "@/types/about";
import { TECH_CELL_SPRING_CONFIG } from "@/constants/animations";

export default function TechStackCell({
  children,
  className,
  cellRef,
  onMouseEnter,
  onMouseLeave,
  isActive,
  delay = 0,
}: TechStackCellProps & { delay?: number }) {
  return (
    <motion.div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {isActive && (
        <motion.div
          layoutId="tech-stack-highlight"
          className="absolute inset-0 z-20 pointer-events-none bg-(--background)"
          transition={TECH_CELL_SPRING_CONFIG}
        />
      )}
      <div className="relative z-30 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
