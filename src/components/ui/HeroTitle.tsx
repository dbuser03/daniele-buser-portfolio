"use client";

import { motion } from "motion/react";
import type { HeroTitleProps } from "@/types/ui";

export default function HeroTitle({
  text,
  className = "",
  ariaLabel,
}: HeroTitleProps) {
  return (
    <motion.h1
      className={`text-[10rem] leading-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      aria-label={ariaLabel}
    >
      {text}
      <span className="text-(--accent)" aria-hidden="true">
        .
      </span>
    </motion.h1>
  );
}
