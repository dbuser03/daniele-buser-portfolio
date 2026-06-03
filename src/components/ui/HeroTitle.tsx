"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { HeroTitleProps } from "@/types/ui";
import { cn } from "@/utils/cn";
import { useIsReady } from "@/hooks/useIsReady";

const createTitleVariants = (yOffset: number, duration: number, delay: number) => ({
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
} as const);

export default function HeroTitle({
  text,
  className = "",
  ariaLabel,
  once = false,
  yOffset = 40,
  duration = 0.7,
  delay = 0.35,
  as = "h1",
}: HeroTitleProps) {
  const isReady = useIsReady(150);

  const titleVariants = useMemo(
    () => createTitleVariants(yOffset, duration, delay),
    [yOffset, duration, delay],
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      className={cn(
        "text-[10rem] leading-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]",
        className,
      )}
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
    </MotionTag>
  );
}
