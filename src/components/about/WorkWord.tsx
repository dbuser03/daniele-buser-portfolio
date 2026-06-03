"use client";

import { motion, useTransform } from "motion/react";
import type { WorkWordProps } from "@/types/about";

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
      className="flex items-center overflow-visible bg-transparent border-none p-0 text-left text-3xl font-medium sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
      style={{ opacity, y, color: "inherit", fontFamily: "inherit" }}
      initial="rest"
      animate={isActive ? "hover" : "rest"}
      whileHover="hover"
      onMouseEnter={() => onHover?.(word)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(word)}
      onBlur={() => onHover?.(null)}
      aria-label={`View video for ${word}`}
    >
      <motion.span
        className="h-7 shrink-0 bg-(--background) sm:h-10 xl:h-12"
        variants={{
          rest: { width: 0, opacity: 0, marginRight: 0 },
          hover: { width: 56, opacity: 1, marginRight: 12 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
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
        aria-hidden="true"
      />
      <motion.span
        className="inline-block"
        variants={{
          rest: { x: 0 },
          hover: { x: 8 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {word}
      </motion.span>
    </motion.button>
  );
}
