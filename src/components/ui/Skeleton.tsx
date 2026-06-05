"use client";

import { motion, AnimatePresence } from "motion/react";

type SkeletonVariant = "on-dark" | "on-light";

interface SkeletonProps {
  /** Whether the skeleton is still visible (content hasn't loaded yet) */
  isLoading: boolean;
  /**
   * "on-dark"  → light shimmer for dark backgrounds (default)
   * "on-light" → dark shimmer for light/white backgrounds
   */
  variant?: SkeletonVariant;
  /** Additional class names to apply to the skeleton container */
  className?: string;
}

/**
 * Full-coverage skeleton shimmer that sits absolutely over its parent.
 * Fade it out by setting `isLoading={false}` once media fires onLoad / onLoadedData.
 *
 * Usage: wrap the parent in `position: relative` (or `relative` Tailwind class)
 * and place <Skeleton> as a sibling of the media element.
 */
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
