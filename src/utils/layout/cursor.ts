import { CURSOR_SIZE } from "@/constants/layout/cursor";
import {
  CursorInteractionConfig,
  CursorInteractionType,
} from "@/types/layout/cursor";

export const getLabelColor = (variant: "dark" | "light"): string => {
  return variant === "light" ? "var(--neutral-dark)" : "var(--neutral)";
};

export const calculateLabelOffset = (size: number): string => {
  if (size >= CURSOR_SIZE.lg) return "56px";
  return `${size / 2 + 24}px`;
};

export const getIconSrc = (type: string): string => {
  switch (type) {
    case "copy":
      return "/icons/file_copy_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg";
    case "check":
      return "/icons/check_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg";
    default:
      return "/icons/touch_app_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg";
  }
};

export const getIconAlt = (type: string): string => {
  switch (type) {
    case "copy":
      return "Copy icon";
    case "check":
      return "Check icon";
    default:
      return "Touch icon";
  }
};

export const getCursorInteractionConfig = (
  type: CursorInteractionType,
  variant: "light" | "dark" | undefined,
  pageLabel: string,
): CursorInteractionConfig => {
  switch (type) {
    case "header":
      return {
        onEnter: {
          size: CURSOR_SIZE.xs,
          color: variant === "light" ? "var(--neutral)" : "var(--neutral-dark)",
          label: "",
        },
        onLeave: {
          size: CURSOR_SIZE.sm,
          color: "var(--accent)",
          label: pageLabel,
        },
      };
    case "footer":
      return {
        onEnter: {
          label: "",
        },
        onLeave: {
          label: pageLabel,
        },
      };
    case "hero":
      return {
        onEnter: {
          size: CURSOR_SIZE.xl,
          label: "",
          showIcon: false,
        },
        onLeave: {
          size: CURSOR_SIZE.sm,
          label: pageLabel,
        },
      };
    case "default":
    default:
      return {};
  }
};
