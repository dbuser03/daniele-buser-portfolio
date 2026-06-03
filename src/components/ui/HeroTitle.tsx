"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { HeroTitleProps } from "@/types/ui";

export default function HeroTitle({
  text,
  className = "",
  ariaLabel,
  once = false,
  yOffset = 40,
  duration = 0.7,
  delay = 0.35,
}: HeroTitleProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const titleVariants = {
    initial: {
      opacity: 0,
      y: yOffset,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    },
  } as const;

  return (
    <motion.h1
      className={`text-[10rem] leading-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] ${className}`}
      variants={titleVariants}
      initial="initial"
      whileInView={isReady ? "visible" : undefined}
      viewport={{ once, amount: 0.2 }}
      aria-label={ariaLabel}
    >
      {text}
      <span className="text-(--accent)" aria-hidden="true">
        .
      </span>
    </motion.h1>
  );
}
