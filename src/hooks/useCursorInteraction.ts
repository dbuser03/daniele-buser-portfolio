import { useCursorContext } from "@/contexts/CursorContext";
import { CursorInteractionConfig, CursorInteractionType } from "@/types/cursor";
import { getCursorInteractionConfig } from "@/utils/cursor";
import { useCallback, useMemo } from "react";

export const useCursorInteraction = (
  type: CursorInteractionType = "default",
  customConfig?: CursorInteractionConfig,
) => {
  const { cursorSize, setColor } = useCursorContext();

  const config = useMemo(() => {
    const baseConfig = getCursorInteractionConfig(type);
    return {
      onEnter: { ...baseConfig.onEnter, ...customConfig?.onEnter },
      onLeave: { ...baseConfig.onLeave, ...customConfig?.onLeave },
    };
  }, [type, customConfig]);

  const handleMouseEnter = useCallback(() => {
    const state = config.onEnter;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
  }, [config.onEnter, cursorSize, setColor]);

  const handleMouseLeave = useCallback(() => {
    const state = config.onLeave;
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
  }, [config.onLeave, cursorSize, setColor]);

  return { handleMouseEnter, handleMouseLeave };
};
