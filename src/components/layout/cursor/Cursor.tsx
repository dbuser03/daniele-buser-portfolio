"use client";

import { motion } from "motion/react";
import { CursorProps } from "@/types/cursor";

export default function Cursor({
  smoothX,
  smoothY,
  cursorSize,
  opacity,
  color = "var(--accent)",
}: CursorProps) {
  return (
    <motion.div
      className="pointer-events-none fixed z-40 hidden rounded-full pointer-fine:block"
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: cursorSize,
        height: cursorSize,
        opacity,
        backgroundColor: color,
      }}
      initial={{ scale: 0.8 }}
      animate={{
        scale: 1,
      }}
      transition={{
        scale: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
        backgroundColor: { duration: 0.25, ease: "easeOut" },
      }}
    />
  );
}
