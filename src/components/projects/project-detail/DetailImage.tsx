"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "@/components/ui/Skeleton";

interface DetailImageProps {
  src: string;
  alt: string;
}

export default function DetailImage({
  src,
  alt,
}: DetailImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-full w-full">
      {(isLoading || hasError) && <Skeleton isLoading={true} variant="on-light" />}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
          sizes="100vw"
          priority
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
}
