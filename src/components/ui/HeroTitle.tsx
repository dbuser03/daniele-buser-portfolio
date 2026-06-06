"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { HeroTitleProps } from "@/types/ui";
import { cn } from "@/utils/cn";
import { createFadeUpVariants } from "@/constants/animations";

export default function HeroTitle({
  id,
  text,
  children,
  className = "",
  ariaLabel,
  once = false,
  yOffset = 40,
  duration = 0.45,
  delay = 0.35,
  as = "h1",
  showDot = true,
  trigger = "mount",
  viewport,
}: HeroTitleProps) {
  const titleVariants = useMemo(
    () => createFadeUpVariants(delay, yOffset, duration),
    [delay, yOffset, duration],
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      id={id}
      className={cn(
        "text-[10rem] leading-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]",
        className,
      )}
      variants={titleVariants}
      initial="initial"
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "inView" ? "visible" : undefined}
      viewport={viewport || { once, amount: 0.2 }}
      aria-label={ariaLabel}
    >
      {children || text}
      {showDot && (
        <span className="text-(--accent)" aria-hidden="true">
          .
        </span>
      )}
    </MotionTag>
  );
}

export const HeroTitleAnimated = (props: HeroTitleProps) => (
  <HeroTitle once={true} trigger="mount" {...props} />
);

export const HeroTitleStatic = (props: HeroTitleProps) => (
  <HeroTitle once={false} {...props} />
);
