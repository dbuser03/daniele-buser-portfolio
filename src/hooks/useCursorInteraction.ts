"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { animate } from "motion/react";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CursorInteractionType } from "@/types/cursor";
import { getCursorInteractionConfig } from "@/utils/cursor";

export const useCursorInteraction = (
  type: CursorInteractionType = "default",
) => {
  const { cursorSize, setColor } = useCursorContext();
  const pulseControls = useRef<ReturnType<typeof animate> | null>(null);

  const config = useMemo(() => getCursorInteractionConfig(type), [type]);

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
    const state = config.onEnter;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
    if (state.pulse) startPulse();
  }, [config.onEnter, cursorSize, setColor, startPulse]);

  const handleMouseLeave = useCallback(() => {
    stopPulse();
    const state = config.onLeave;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
  }, [config.onLeave, cursorSize, setColor, stopPulse]);

  useEffect(() => {
    return () => stopPulse();
  }, [stopPulse]);

  return { handleMouseEnter, handleMouseLeave };
};
