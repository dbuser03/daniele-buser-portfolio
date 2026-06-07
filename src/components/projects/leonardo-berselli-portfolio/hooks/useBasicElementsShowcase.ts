import { useState } from "react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export function useBasicElementsShowcase() {
  const [engineActive, setEngineActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

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
