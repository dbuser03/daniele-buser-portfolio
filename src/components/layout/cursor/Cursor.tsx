"use client";

import { motion } from "motion/react";
import { CursorProps } from "@/types/cursor";

export default function Cursor({
  smoothX,
  smoothY,
  cursorSize,
  isVisible,
  color = "var(--accent)",
}: CursorProps) {
  return (
    <motion.div
      className="pointer-events-none fixed z-40 rounded-full"
      style={{
        left: smoothX,
        top: smoothY,
        width: cursorSize,
        height: cursorSize,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        backgroundColor: color,
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
        backgroundColor: { duration: 0.25, ease: "easeOut" },
      }}
    />
  );
}
