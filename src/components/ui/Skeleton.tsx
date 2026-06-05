"use client";

import { motion, AnimatePresence } from "motion/react";

type SkeletonVariant = "on-dark" | "on-light";

interface SkeletonProps {
  isLoading: boolean;
  variant?: SkeletonVariant;
  className?: string;
}

export default function Skeleton({
  isLoading,
  variant = "on-dark",
  className = "",
}: SkeletonProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`skeleton-shimmer--${variant} absolute inset-0 z-10 ${className}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
