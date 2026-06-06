"use client";

import { useRef, useCallback, useEffect } from "react";
import { animate } from "motion/react";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";

export function useGlobeCursorPulse() {
  const { cursorSize, setColor } = useCursorContext();
  const pulseControls = useRef<ReturnType<typeof animate> | null>(null);

  const stopPulse = useCallback(() => {
    pulseControls.current?.stop();
    pulseControls.current = null;
  }, []);

  const startPulse = useCallback(() => {
    stopPulse();
    cursorSize.set(CURSOR_SIZE.sm);
    pulseControls.current = animate(
      cursorSize,
      [CURSOR_SIZE.sm, CURSOR_SIZE.xs],
      {
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    );
  }, [cursorSize, stopPulse]);

  const handleMouseEnter = useCallback(() => {
    setColor("var(--accent)");
    startPulse();
  }, [setColor, startPulse]);

  const handleMouseLeave = useCallback(() => {
    stopPulse();
    cursorSize.set(CURSOR_SIZE.sm);
  }, [stopPulse, cursorSize]);

  const handleDragStart = useCallback(() => {
    stopPulse();
    cursorSize.set(CURSOR_SIZE.xs);
  }, [stopPulse, cursorSize]);

  const handleDragEnd = useCallback(() => {
    startPulse();
  }, [startPulse]);

  useEffect(() => {
    return () => stopPulse();
  }, [stopPulse]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragEnd,
  };
}
