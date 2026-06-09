"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { motionTokens } from "@/constants/animations";

interface ImageWithSkeletonProps {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  skeletonVariant?: "on-dark" | "on-light";
  className?: string;
}

export default function ImageWithSkeleton({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  skeletonVariant = "on-light",
  className,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  const showSkeleton = !src || isLoading || hasError;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Skeleton isLoading={showSkeleton} variant={skeletonVariant} />
      <AnimatePresence>
        {src && !hasError && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.smooth, ease: motionTokens.easing.standard }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes={sizes}
              priority={priority}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
