"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Skeleton from "@/components/ui/Skeleton";
import { EASE_OUT } from "@/constants/animations";

interface DetailImageProps {
  src: string;
  alt: string;
}

export default function DetailImage({ src, alt }: DetailImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-full w-full">
      {(isLoading || hasError) && (
        <Skeleton isLoading={true} variant="on-light" />
      )}
      {!hasError && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
