import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { CursorInteractionConfig, CursorInteractionType } from "@/types/cursor";

export const getCursorInteractionConfig = (
  type: CursorInteractionType,
): CursorInteractionConfig => {
  switch (type) {
    case "header":
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
    case "footer":
    case "default":
    default:
      return {};
  }
};
