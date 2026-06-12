"use client";

import { cn } from "@/utils/cn";

import { m, AnimatePresence } from "motion/react";
import { motionTokens } from "@/utils/motion";

type SkeletonVariant = "on-dark" | "on-light";

interface SkeletonProps {
  isLoading: boolean;
  variant?: SkeletonVariant;
  className?: string;
}

const SHIMMER_GRADIENTS: Record<SkeletonVariant, string> = {
  "on-dark":
    "linear-gradient(105deg, #141414 0%, #1a1a1a 35%, #1e1e1e 50%, #1a1a1a 65%, #141414 100%)",
  "on-light":
    "linear-gradient(105deg, #e6e6e6 0%, #ececec 35%, #f0f0f0 50%, #ececec 65%, #e6e6e6 100%)",
};

export default function Skeleton({
  isLoading,
  variant = "on-dark",
  className = "",
}: SkeletonProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          className={cn("absolute inset-0 z-10", className)}
          style={{
            background: SHIMMER_GRADIENTS[variant],
            backgroundSize: "200% 100%",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundPosition: ["-200% 0", "200% 0"],
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: {
              duration: motionTokens.duration.smooth,
              ease: motionTokens.easing.standard,
            },
            backgroundPosition: {
              duration: 2.8,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
