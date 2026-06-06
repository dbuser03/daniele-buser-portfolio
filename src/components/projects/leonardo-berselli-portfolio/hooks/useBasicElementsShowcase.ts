import { useState } from "react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";

export function useBasicElementsShowcase() {
  const [engineActive, setEngineActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header", {
    onEnter: {
      size: CURSOR_SIZE.xs,
      color: CSS_VARIABLES.neutral,
    },
    onLeave: {
      size: CURSOR_SIZE.sm,
      color: CSS_VARIABLES.accent,
    },
  });

  const incrementClick = () => setClickCount((c) => c + 1);
  const resetClick = () => setClickCount(0);

  return {
    engineActive,
    setEngineActive,
    clickCount,
    incrementClick,
    resetClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}
