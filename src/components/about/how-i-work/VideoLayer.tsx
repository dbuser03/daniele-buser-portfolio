"use client";

import { m } from "motion/react";
import { memo, RefObject } from "react";
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

      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay={isActive}
        preload="none"
        onEnded={onEnded}
        className="size-full object-cover"
        aria-hidden="true"
      />
    </m.div>
  );
}

export default memo(VideoLayer);
