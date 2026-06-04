"use client";

import { motion, useTransform } from "motion/react";
import type { WorkWordProps } from "@/types/about";
import { EASE_OUT } from "@/constants/animations";

const arrowVariants = {
  rest: { x: -56, opacity: 0 },
  hover: { x: 0, opacity: 1 },
} as const;

const labelVariants = {
  rest: { x: 0 },
  hover: { x: 76 }, // 56px arrow width + 20px spacing
} as const;

export default function WorkWord({
  word,
  index,
  scrollProgress,
  isActive = false,
  onHover,
}: WorkWordProps) {
  const start = index * 0.1;
  const end = start + 0.16;
  const progress = useTransform(scrollProgress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [0, 1], [0.2, 1]);
  const y = useTransform(progress, [0, 1], [22, 0]);

  return (
    <motion.button
      type="button"
      className="relative flex items-center overflow-visible border-none bg-transparent p-0 text-left text-3xl font-medium sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
      style={{ opacity, y, color: "inherit", fontFamily: "inherit" }}
      initial="rest"
      animate={isActive ? "hover" : "rest"}
      onMouseEnter={() => onHover?.(word)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(word)}
      onBlur={() => onHover?.(null)}
      aria-label={`View video for ${word}`}
    >
      <span className="absolute left-0 h-7 w-14 overflow-hidden sm:h-10 xl:h-12" aria-hidden="true">
        <motion.div
          className="h-full w-full bg-(--background)"
          variants={arrowVariants}
          transition={{ duration: 0.3, ease: EASE_OUT }}
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
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        {word}
      </motion.span>
    </motion.button>
  );
}
