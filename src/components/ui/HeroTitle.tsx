"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { motionTokens, entranceVariants } from "@/constants/animations";

interface HeroTitleMountProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  showDecorativeDot?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  duration?: number;
  yOffset?: number;
}

interface HeroTitleInViewProps extends HeroTitleMountProps {
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

interface HeroTitleStaticProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  showDecorativeDot?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Dot() {
  return (
    <span className="text-(--accent)" aria-hidden="true">.</span>
  );
}

export function HeroTitleMount({
  id,
  children,
  className = "",
  ariaLabel,
  showDecorativeDot = true,
  as = "h1",
  delay = 0.35,
  duration = motionTokens.duration.smooth,
  yOffset = 40,
}: HeroTitleMountProps) {
  const variants = useMemo(
    () => entranceVariants(delay, yOffset, duration),
    [delay, yOffset, duration],
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      id={id}
      className={cn("text-display-xl", className)}
      variants={variants}
      initial="initial"
      animate="visible"
      aria-label={ariaLabel}
    >
      {children}
      {showDecorativeDot && <Dot />}
    </MotionTag>
  );
}

export function HeroTitleInView({
  id,
  children,
  className = "",
  ariaLabel,
  showDecorativeDot = true,
  as = "h1",
  delay = 0.35,
  duration = motionTokens.duration.smooth,
  yOffset = 40,
  viewport,
}: HeroTitleInViewProps) {
  const variants = useMemo(
    () => entranceVariants(delay, yOffset, duration),
    [delay, yOffset, duration],
  );

  const MotionTag = motion[as] || motion.h1;

  return (
    <MotionTag
      id={id}
      className={cn("text-display-xl", className)}
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={viewport || { once: false, amount: 0.2 }}
      aria-label={ariaLabel}
    >
      {children}
      {showDecorativeDot && <Dot />}
    </MotionTag>
  );
}

export function HeroTitleStatic({
  id,
  children,
  className = "",
  ariaLabel,
  showDecorativeDot = true,
  as: Tag = "h1",
}: HeroTitleStaticProps) {
  return (
    <Tag
      id={id}
      className={cn("text-display-xl", className)}
      aria-label={ariaLabel}
    >
      {children}
      {showDecorativeDot && <Dot />}
    </Tag>
  );
}
