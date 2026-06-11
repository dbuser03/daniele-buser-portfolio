"use client";

import { m } from "motion/react";
import { motionTokens } from "@/utils/motion";
import { CSS_VARIABLES } from "@/constants/theme";
import { CursorProps } from "@/types/cursor";

export default function Cursor({
  smoothX,
  smoothY,
  cursorSize,
  opacity,
  color = CSS_VARIABLES.accent,
}: CursorProps) {
  return (
    <m.div
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
        scale: { duration: motionTokens.duration.fast, ease: "backOut" },
        backgroundColor: {
          duration: motionTokens.duration.fast,
          ease: motionTokens.easing.standard,
        },
      }}
    />
  );
}
