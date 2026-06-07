import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { CursorInteractionConfig, CursorInteractionType } from "@/types/cursor";

export const getCursorInteractionConfig = (
  type: CursorInteractionType,
): CursorInteractionConfig => {
  switch (type) {
    case "current":
      return {
        onEnter: {
          size: CURSOR_SIZE.xs,
          color: CSS_VARIABLES.accent,
        },
        onLeave: {
          size: CURSOR_SIZE.sm,
          color: CSS_VARIABLES.accent,
        },
      };
    case "interactive":
      return {
        onEnter: {
          size: CURSOR_SIZE.xs,
          color: CSS_VARIABLES.neutral,
        },
        onLeave: {
          size: CURSOR_SIZE.sm,
          color: CSS_VARIABLES.accent,
        },
      };
    case "pulse":
      return {
        onEnter: {
          size: CURSOR_SIZE.sm,
          color: CSS_VARIABLES.accent,
          pulse: true,
        },
        onLeave: {
          size: CURSOR_SIZE.sm,
          color: CSS_VARIABLES.accent,
        },
      };
    case "default":
    default:
      return {};
  }
};
