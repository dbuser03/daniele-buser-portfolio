"use client";

import { useRef, useCallback } from "react";
import { useEarthGlobe } from "../hooks/useEarthGlobe";
import { useInteraction } from "../context/InteractionProvider";

interface EarthGlobeAsciiProps {
  dark?: boolean;
}

export function EarthGlobeAscii({ dark }: EarthGlobeAsciiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onHoverStart, onHoverEnd, onDragStart, onDragEnd } = useInteraction();

  const handleDragStart = useCallback(() => {
    onDragStart();
  }, [onDragStart]);

  const handleDragEnd = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

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
        className="size-full"
        onMouseEnter={() => onHoverStart("pulse")}
        onMouseLeave={onHoverEnd}
      />
    </div>
  );
}
