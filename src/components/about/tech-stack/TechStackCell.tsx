"use client";

import { m } from "motion/react";
import { motionTokens, useAnimations } from "@/utils/motion";

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
  const { itemVariants } = useAnimations();

  return (
    <m.div
      ref={cellRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={itemVariants}
    >
      {isActive && (
        <m.div
          layoutId="tech-stack-highlight"
          className="pointer-events-none absolute inset-0 z-20 bg-background"
          transition={motionTokens.spring.cell}
        />
      )}
      <div className="relative z-30 size-full">{children}</div>
    </m.div>
  );
}
