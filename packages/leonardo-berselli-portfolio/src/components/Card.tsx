"use client";

import { m } from "motion/react";
import { cn } from "../utils/cn";
import { PACKAGE_MOTION } from "../utils/motion";

interface CardProps {
  variant?: "default" | "square";
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <m.div
      className={cn(
        "flex flex-col overflow-hidden rounded-none border border-(--foreground)/10 bg-transparent",
        className,
      )}
      variants={{
        initial: { opacity: 0, y: PACKAGE_MOTION.yOffset.card },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: PACKAGE_MOTION.duration.card,
            ease: PACKAGE_MOTION.easing.standard,
          },
        },
      }}
      initial="initial"
      animate="visible"
    >
      {children}
    </m.div>
  );
}
