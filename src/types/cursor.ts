import { MotionValue } from "motion/react";

export type CursorInteractionType =
  | "default"
  | "current"
  | "interactive"
  | "pulse";

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
    pulse?: boolean;
  };
  onLeave?: {
    size?: number;
    color?: string;
  };
}
