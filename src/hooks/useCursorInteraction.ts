"use client";

import { useEffect, useRef, useCallback } from "react";
import { animate } from "motion/react";
import { useCursorContext } from "@/components/layout/cursor/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CursorInteractionType } from "@/types/cursor";
import { getCursorInteractionConfig } from "@/utils/cursor";

interface CursorInteractionCallbacks {
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useCursorInteraction = (
  type: CursorInteractionType = "default",
  callbacks?: CursorInteractionCallbacks,
) => {
  const { cursorSize, setColor } = useCursorContext();
  const pulseControls = useRef<ReturnType<typeof animate> | null>(null);
  const callbacksRef = useRef(callbacks);
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  const config = getCursorInteractionConfig(type);

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

  const handleMouseEnter = () => {
    callbacksRef.current?.onEnter?.();
    const state = config.onEnter;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
    if (state.pulse) startPulse();
  };

  const handleMouseLeave = () => {
    stopPulse();
    callbacksRef.current?.onLeave?.();
    const state = config.onLeave;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
  };

  useEffect(() => {
    return () => stopPulse();
  }, [stopPulse]);

  return { handleMouseEnter, handleMouseLeave, startPulse, stopPulse };
};
