"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CursorProps } from "@/types/layout/cursor";
import { getLabelColor, calculateLabelOffset } from "@/utils/layout/cursor";
import {
  cursorVariants,
  cursorAnimationConfig,
} from "@/constants/layout/cursor";
import CursorIcon from "./CursorIcon";
import { useTransform } from "motion/react";

const Cursor: React.FC<CursorProps> = ({
  smoothX,
  smoothY,
  cursorSize,
  isVisible,
  label,
  variant = "dark",
  color = "var(--accent)",
  showIcon = false,
  iconType = "touch",
}) => {
  const labelColor = getLabelColor(variant);
  const labelOffset = useTransform(cursorSize, calculateLabelOffset);

  return (
    <>
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
        initial={cursorVariants.circle.hidden}
        animate={{
          ...cursorVariants.circle.visible(isVisible),
          backgroundColor: color,
        }}
        transition={cursorAnimationConfig.circle}
      />
      <AnimatePresence>
        {isVisible && showIcon && (
          <CursorIcon smoothX={smoothX} smoothY={smoothY} iconType={iconType} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isVisible && label && (
          <motion.div
            key={label}
            className="pointer-events-none fixed z-40 text-sm font-medium whitespace-nowrap"
            style={{
              color: labelColor,
              left: smoothX,
              top: smoothY,
              x: labelOffset,
              y: "-50%",
            }}
            initial={cursorVariants.label.hidden}
            animate={cursorVariants.label.visible}
            exit={cursorVariants.label.exit}
            transition={cursorAnimationConfig.label}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cursor;
