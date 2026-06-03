import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  cursorVariants,
  cursorAnimationConfig,
  cursorIconVariants,
  CURSOR_ICON_SIZE,
} from "@/constants/layout/cursor";
import { CursorIconProps } from "@/types/layout/cursor";
import { getIconSrc, getIconAlt } from "@/utils/layout/cursor";

const CursorIcon: React.FC<CursorIconProps> = ({
  smoothX,
  smoothY,
  iconType = "touch",
}) => {
  return (
    <motion.div
      className="pointer-events-none fixed z-40 flex items-center justify-center"
      style={{
        left: smoothX,
        top: smoothY,
        x: "-50%",
        y: "-50%",
        width: "48px",
        height: "48px",
      }}
      initial={cursorVariants.icon.hidden}
      animate={cursorVariants.icon.visible}
      exit={cursorVariants.icon.exit}
      transition={cursorAnimationConfig.icon}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={iconType}
          initial={cursorIconVariants.initial}
          animate={cursorIconVariants.animate}
          exit={cursorIconVariants.exit}
          transition={cursorAnimationConfig.iconTransition}
        >
          <Image
            src={getIconSrc(iconType)}
            alt={getIconAlt(iconType)}
            width={CURSOR_ICON_SIZE.width}
            height={CURSOR_ICON_SIZE.height}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default CursorIcon;
