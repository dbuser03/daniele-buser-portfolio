"use client";

import { cn } from "@/utils/cn";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

interface DetailImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DetailImage({ src, alt, className }: DetailImageProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <ImageWithSkeleton
        src={src}
        alt={alt}
        skeletonVariant="on-light"
        priority
        sizes="100vw"
      />
    </div>
  );
}
