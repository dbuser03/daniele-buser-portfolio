import { MotionValue } from "motion/react";

export interface CursorPosition {
  x: number;
  y: number;
}

export interface CursorProps {
  cursorPosition: CursorPosition;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  cursorSize: MotionValue<number>;
  isVisible: boolean;
  label: string;
  variant?: "dark" | "light";
  color?: string;
  showIcon?: boolean;
  iconType?: "touch" | "copy" | "check";
}

export interface CursorIconProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  iconType?: "touch" | "copy" | "check";
}

export interface CursorContextType {
  cursorSize: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  setColor: (color: string) => void;
  setLabel: (label: string) => void;
  pageLabel: string;
  showIcon: boolean;
  setShowIcon: (show: boolean) => void;
  iconType: "touch" | "copy" | "check";
  setIconType: (type: "touch" | "copy" | "check") => void;
}

export type CursorInteractionType = "header" | "footer" | "hero" | "default";

export interface CursorInteractionConfig {
  onEnter?: {
    size?: number;
    color?: string;
    label?: string;
    showIcon?: boolean;
    iconType?: "touch" | "copy" | "check";
  };
  onLeave?: {
    size?: number;
    color?: string;
    label?: string;
    showIcon?: boolean;
    iconType?: "touch" | "copy" | "check";
  };
}
