"use client";

import { motion, useTransform } from "motion/react";
import type { TechStackCellProps } from "@/types/about";

const getCellRanges = (cellId: string) => {
  const isFirstRow = cellId.startsWith("first");
  const index = parseInt(cellId.split("-").pop() || "0");

  const startRange = isFirstRow ? 0.0 : 0.35;
  const endRange = isFirstRow ? 0.6 : 1.0;
  const yDisplacement = isFirstRow ? 120 : 90;

  const rowCount = isFirstRow ? 3 : 7;
  const step = (endRange - startRange) / rowCount;
  const start = startRange + index * step;
  const end = Math.min(start + 0.35, 1);

  return { start, end, yDisplacement };
};

export default function TechStackCell({
  children,
  cellId,
  scrollYProgress,
  className,
  cellRef,
  onMouseEnter,
  onMouseLeave,
  isInteractive,
}: TechStackCellProps) {
  const { start, end, yDisplacement } = getCellRanges(cellId);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [yDisplacement, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

  return (
    <motion.div
      ref={cellRef}
      className={className}
      style={
        isInteractive
          ? ({
              transform: "none",
              opacity: 1,
            } as React.CSSProperties)
          : { opacity, y, scale }
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
