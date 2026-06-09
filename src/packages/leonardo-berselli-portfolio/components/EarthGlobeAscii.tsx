"use client";

import { useRef, useCallback } from "react";
import { useEarthGlobe } from "../hooks/useEarthGlobe";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";

interface EarthGlobeAsciiProps {
  dark?: boolean;
}

export function EarthGlobeAscii({ dark }: EarthGlobeAsciiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseEnter, handleMouseLeave, startPulse, stopPulse } =
    useCursorInteraction("pulse");
  const { cursorSize, setColor } = useCursorContext();

  const handleDragStart = useCallback(() => {
    stopPulse();
    cursorSize.set(CURSOR_SIZE.xs);
    setColor("var(--accent)");
  }, [cursorSize, setColor, stopPulse]);

  const handleDragEnd = useCallback(() => {
    startPulse();
  }, [startPulse]);

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
