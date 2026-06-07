"use client";

import { useCallback } from "react";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export function useGlobeCursorPulse() {
  const { cursorSize } = useCursorContext();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("pulse");

  const handleDragStart = useCallback(() => {
    handleMouseLeave();
    cursorSize.set(CURSOR_SIZE.xs);
  }, [handleMouseLeave, cursorSize]);

  const handleDragEnd = useCallback(() => {
    handleMouseEnter();
  }, [handleMouseEnter]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragEnd,
  };
}
