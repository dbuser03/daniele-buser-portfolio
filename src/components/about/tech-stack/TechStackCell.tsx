"use client";

import { motion } from "motion/react";
import { motionTokens, itemVariants } from "@/constants/animations";

interface TechStackCellProps {
  children: React.ReactNode;
  cellId: string;
  className?: string;
  cellRef?: (node: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActive: boolean;
}

export default function TechStackCell({
  children,
  className,
  cellRef,
  onMouseEnter,
  onMouseLeave,
  isActive,
}: TechStackCellProps) {
  return (
    <motion.div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={itemVariants}
    >
      {isActive && (
        <motion.div
          layoutId="tech-stack-highlight"
          className="pointer-events-none absolute inset-0 z-20 bg-(--background)"
          transition={motionTokens.spring.cell}
        />
      )}
      <div className="relative z-30 h-full w-full">{children}</div>
    </motion.div>
  );
}
