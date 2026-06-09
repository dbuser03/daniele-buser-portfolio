"use client";

import { motion } from "motion/react";
import { cn } from "../utils/cn";
import { PACKAGE_MOTION } from "../lib/motion";

interface CardProps {
  variant?: "default" | "square";
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  className,
  children,
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col overflow-hidden border border-(--foreground)/10 bg-transparent",
        variant === "default" ? "rounded-xl" : "rounded-none",
        className,
      )}
      variants={{
        initial: { opacity: 0, y: PACKAGE_MOTION.yOffset.card },
        visible: { opacity: 1, y: 0, transition: { duration: PACKAGE_MOTION.duration.card, ease: PACKAGE_MOTION.easing.standard } },
      }}
      initial="initial"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
