"use client";

import { useRef } from "react";
import { useEarthGlobe } from "@/hooks/useEarthGlobe";

interface EarthGlobeAsciiProps {
  dark?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function EarthGlobeAscii({
  dark,
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
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
