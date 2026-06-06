"use client";

import { useRef } from "react";
import { useEarthGlobe } from "@/components/projects/leonardo-berselli-portfolio/hooks/useEarthGlobe";
import { useGlobeCursorPulse } from "@/components/projects/leonardo-berselli-portfolio/hooks/useGlobeCursorPulse";

interface EarthGlobeAsciiProps {
  dark?: boolean;
}

export function EarthGlobeAscii({ dark }: EarthGlobeAsciiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragEnd,
  } = useGlobeCursorPulse();

  useEarthGlobe({
    containerRef,
    dark,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
