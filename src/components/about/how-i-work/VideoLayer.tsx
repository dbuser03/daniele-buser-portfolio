"use client";

import { motion } from "motion/react";
import { useState, memo } from "react";
import type { VideoLayerProps } from "@/types/about";
import Skeleton from "@/components/ui/Skeleton";

function VideoLayer({
  src,
  active,
  videoRef,
  onEnded,
}: VideoLayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {active && <Skeleton isLoading={isLoading} variant="on-light" />}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay={active}
        preload="none"
        onEnded={onEnded}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default memo(VideoLayer);
