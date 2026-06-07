"use client";

import { EarthGlobeAscii } from "@/components/projects/leonardo-berselli-portfolio/components/EarthGlobeAscii";
import { useGlobeCursorPulse } from "./useGlobeCursorPulse";

interface EarthGlobeAsciiWithCursorProps {
  dark?: boolean;
}

export function EarthGlobeAsciiWithCursor({
  dark,
}: EarthGlobeAsciiWithCursorProps) {
  const { handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd } =
    useGlobeCursorPulse();

  return (
    <EarthGlobeAscii
      dark={dark}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
