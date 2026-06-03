import { useCursorContext } from "@/contexts/CursorContext";
import { CursorInteractionConfig, CursorInteractionType } from "@/types/cursor";
import { getCursorInteractionConfig } from "@/utils/cursor";

export const useCursorInteraction = (
  type: CursorInteractionType = "default",
  customConfig?: CursorInteractionConfig,
) => {
  const { cursorSize, setColor } = useCursorContext();

  const baseConfig = getCursorInteractionConfig(type);
  const config = {
    onEnter: { ...baseConfig.onEnter, ...customConfig?.onEnter },
    onLeave: { ...baseConfig.onLeave, ...customConfig?.onLeave },
  };

  const applyCursorState = (state: CursorInteractionConfig["onEnter"]) => {
    if (!state) return;
    if (state.size !== undefined) cursorSize.set(state.size);
    if (state.color) setColor(state.color);
  };

  const handleMouseEnter = () => applyCursorState(config.onEnter);
  const handleMouseLeave = () => applyCursorState(config.onLeave);

  return { handleMouseEnter, handleMouseLeave };
};
