import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import {
  CURSOR_SIZE,
  cursorAnimationConfig,
  DEFAULT_CURSOR_LABEL,
} from "@/constants/layout/cursor";
import { useCursorTracking } from "./useCursorTracking";

export const useSmoothCursor = (
  initialSize: number = CURSOR_SIZE.sm,
  initialLabel: string = DEFAULT_CURSOR_LABEL,
) => {
  const { cursorPosition, isVisible } = useCursorTracking();
  const isInitialized = useRef(false);

  const [label, setLabel] = useState(initialLabel);
  const [color, setColor] = useState("var(--accent)");
  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState<"touch" | "copy" | "check">("touch");

  const cursorSize = useSpring(initialSize, cursorAnimationConfig.size);
  const smoothX = useMotionValue(-16);
  const smoothY = useMotionValue(-16);

  useEffect(() => {
    smoothX.set(cursorPosition.x);
    smoothY.set(cursorPosition.y);
    if (!isInitialized.current && cursorPosition.x !== 0) {
      isInitialized.current = true;
    }
  }, [cursorPosition.x, cursorPosition.y, smoothX, smoothY]);

  return {
    cursorPosition,
    smoothX,
    smoothY,
    cursorSize,
    isVisible: isVisible && isInitialized.current,
    label,
    setLabel,
    color,
    setColor,
    showIcon,
    setShowIcon,
    iconType,
    setIconType,
  };
};
