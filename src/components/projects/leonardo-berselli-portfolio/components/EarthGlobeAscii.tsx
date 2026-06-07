"use client";

import { useRef } from "react";
import { useEarthGlobe } from "@/components/projects/leonardo-berselli-portfolio/hooks/useEarthGlobe";

interface EarthGlobeAsciiProps {
  dark?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function EarthGlobeAscii({
  dark,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDragEnd,
}: EarthGlobeAsciiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEarthGlobe({
    containerRef,
    dark,
    onDragStart,
    onDragEnd,
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}
