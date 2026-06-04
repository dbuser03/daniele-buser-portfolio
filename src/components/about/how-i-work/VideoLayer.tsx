"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import type { VideoLayerProps } from "@/types/about";

export default function VideoLayer({
  src,
  active,
  videoRef,
  onEnded,
}: VideoLayerProps) {
  useEffect(() => {
    if (active && videoRef.current) {
      videoRef.current.load();
    }
  }, [active, videoRef]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay={active}
        preload="none"
        onEnded={onEnded}
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
    </motion.div>
  );
}
