"use client";

import { m, AnimatePresence } from "motion/react";
import { useState, memo, RefObject } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { motionTokens } from "@/utils/motion";

interface VideoLayerProps {
  src: string;
  isActive: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  onEnded: () => void;
  className?: string;
}

function VideoLayer({
  src,
  isActive,
  videoRef,
  onEnded,
  className,
}: VideoLayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <m.div
      className={cn("absolute inset-0 overflow-hidden", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{
        duration: motionTokens.duration.smooth,
        ease: motionTokens.easing.standard,
      }}
    >
      <AnimatePresence>
        {isActive && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.standard,
            }}
          >
            <Skeleton isLoading={isLoading} variant="on-light" />
          </m.div>
        )}
      </AnimatePresence>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay={isActive}
        preload="none"
        onEnded={onEnded}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
    </m.div>
  );
}

export default memo(VideoLayer);
