import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { CursorPosition } from "@/types/cursor";

export const useCursorTracking = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastPosition = useRef<CursorPosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    lastPosition.current = { x: e.clientX, y: e.clientY };

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        setCursorPosition(lastPosition.current);
        setIsVisible(true);
        rafId.current = null;
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return { cursorPosition, isVisible };
};

export const useSmoothCursor = (initialSize: number = CURSOR_SIZE.sm) => {
  const { cursorPosition, isVisible } = useCursorTracking();
  const [color, setColor] = useState<string>(CSS_VARIABLES.accent);

  const cursorSize = useSpring(initialSize, { stiffness: 500, damping: 40 });
  const smoothX = useMotionValue(-16);
  const smoothY = useMotionValue(-16);

  useEffect(() => {
    smoothX.set(cursorPosition.x);
    smoothY.set(cursorPosition.y);
  }, [cursorPosition.x, cursorPosition.y, smoothX, smoothY]);

  const hasMoved = cursorPosition.x !== 0 || cursorPosition.y !== 0;

  return {
    smoothX,
    smoothY,
    cursorSize,
    isVisible: isVisible && hasMoved,
    color,
    setColor,
  };
};
