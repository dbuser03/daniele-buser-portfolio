"use client";

import { motion, useTransform, MotionValue } from "motion/react";
import type { HoverableWord } from "@/types/about";
import { motionTokens } from "@/constants/animations";

interface WorkWordProps {
  word: HoverableWord;
  index: number;
  scrollProgress: MotionValue<number>;
  isActive?: boolean;
  onHover?: (word: HoverableWord | null) => void;
  className?: string;
}
import { cn } from "@/utils/cn";

const arrowVariants = {
  rest: { x: -56, opacity: 0 },
  hover: { x: 0, opacity: 1 },
} as const;

const labelVariants = {
  rest: { x: 0 },
  hover: { x: 76 },
} as const;

export default function WorkWord({
  word,
  index,
  scrollProgress,
  isActive = false,
  onHover,
  className,
}: WorkWordProps) {
  const start = index * 0.1;
  const end = start + 0.16;
  const progress = useTransform(scrollProgress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [0, 1], [0.2, 1]);
  const y = useTransform(progress, [0, 1], [20, 0]);

  return (
    <motion.button
      type="button"
      className={cn("relative flex items-center overflow-visible border-none bg-transparent p-0 text-left text-display-sm font-medium", className)}
      style={{ opacity, y, color: "inherit", fontFamily: "inherit" }}
      initial="rest"
      animate={isActive ? "hover" : "rest"}
      onMouseEnter={() => onHover?.(word)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(word)}
      onBlur={() => onHover?.(null)}
      aria-label={`View video for ${word}`}
    >
      <span
        className="absolute left-0 h-12 w-14 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full bg-(--background)"
          variants={arrowVariants}
          transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
          style={{
            WebkitMaskImage: "url(/icons/right-arrow.svg)",
            maskImage: "url(/icons/right-arrow.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </span>
      <motion.span
        className="inline-block"
        variants={labelVariants}
        transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
      >
        {word}
      </motion.span>
    </motion.button>
  );
}
