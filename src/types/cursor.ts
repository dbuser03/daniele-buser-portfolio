import { MotionValue } from "motion/react";

export interface CursorPosition {
  x: number;
  y: number;
}

export type CursorInteractionType = "header" | "footer" | "default";

export interface CursorProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  cursorSize: MotionValue<number>;
  opacity: MotionValue<number>;
  color?: string;
}

export interface CursorContextType {
  cursorSize: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  setColor: (color: string) => void;
}

export interface CursorInteractionConfig {
  onEnter?: {
    size?: number;
    color?: string;
  };
  onLeave?: {
    size?: number;
    color?: string;
  };
}
