import { useCursorContext } from "@/contexts/CursorContext";
import {
  CursorInteractionConfig,
  CursorInteractionType,
} from "@/types/layout/cursor";
import { getCursorInteractionConfig } from "@/utils/layout/cursor";

export const useCursorInteraction = (
  type: CursorInteractionType = "default",
  variant?: "light" | "dark",
  customConfig?: CursorInteractionConfig,
) => {
  const {
    cursorSize,
    setColor,
    setLabel,
    pageLabel,
    setShowIcon,
    setIconType,
  } = useCursorContext();

  const config = {
    onEnter: {
      ...getCursorInteractionConfig(type, variant, pageLabel).onEnter,
      ...customConfig?.onEnter,
    },
    onLeave: {
      ...getCursorInteractionConfig(type, variant, pageLabel).onLeave,
      ...customConfig?.onLeave,
    },
  };

  const handleMouseEnter = () => {
    if (config.onEnter?.size !== undefined) {
      cursorSize.set(config.onEnter.size);
    }
    if (config.onEnter?.color) {
      setColor(config.onEnter.color);
    }
    if (config.onEnter?.label !== undefined) {
      setLabel(config.onEnter.label);
    }
    if (config.onEnter?.showIcon !== undefined) {
      setShowIcon(config.onEnter.showIcon);
    }
    if (config.onEnter?.iconType !== undefined) {
      setIconType(config.onEnter.iconType);
    }
  };

  const handleMouseLeave = () => {
    if (config.onLeave?.size !== undefined) {
      cursorSize.set(config.onLeave.size);
    }
    if (config.onLeave?.color) {
      setColor(config.onLeave.color);
    }
    if (config.onLeave?.label !== undefined) {
      setLabel(config.onLeave.label);
    }
    if (config.onLeave?.showIcon !== undefined) {
      setShowIcon(config.onLeave.showIcon);
    }
    if (config.onLeave?.iconType !== undefined) {
      setIconType(config.onLeave.iconType);
    }
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
