"use client";

import {
  createContext,
  use,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useMotionValue, useSpring } from "motion/react";
import { CursorContextType } from "@/types/cursor";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { CURSOR_SPRING_CONFIG } from "@/constants/animations";
import Cursor from "@/components/layout/cursor/Cursor";

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorContext = () => {
  const context = use(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within CursorProvider");
  }
  return context;
};

export const CursorProvider = ({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) => {
  const [color, setColor] = useState<string>(CSS_VARIABLES.accent);

  const cursorSize = useSpring(CURSOR_SIZE.sm, CURSOR_SPRING_CONFIG);
  const smoothX = useMotionValue(-100);
  const smoothY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const lastX = useRef(-100);
  const lastY = useRef(-100);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      lastX.current = clientX;
      lastY.current = clientY;
      smoothX.set(clientX);
      smoothY.set(clientY);
      opacity.set(1);
    },
    [smoothX, smoothY, opacity],
  );

  const handleMouseLeave = useCallback(() => {
    opacity.set(0);
  }, [opacity]);

  const handleMouseEnter = useCallback(() => {
    opacity.set(1);
  }, [opacity]);

  const handleScroll = useCallback(() => {
    const event = new MouseEvent("mousemove", {
      clientX: lastX.current,
      clientY: lastY.current,
    });
    window.dispatchEvent(event);
  }, []);

  useEffect(() => {
    if (disabled) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [disabled, handleMouseMove, handleMouseLeave, handleMouseEnter, handleScroll]);

  const contextValue = useMemo(
    () => ({
      cursorSize,
      smoothX,
      smoothY,
      setColor,
    }),
    [cursorSize, smoothX, smoothY],
  );

  return (
    <CursorContext.Provider value={contextValue}>
      {!disabled && (
        <Cursor
          smoothX={smoothX}
          smoothY={smoothY}
          cursorSize={cursorSize}
          opacity={opacity}
          color={color}
        />
      )}
      {children}
    </CursorContext.Provider>
  );
};
