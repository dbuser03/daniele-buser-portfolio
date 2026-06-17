"use client";

import {
  createContext,
  use,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { CursorContextType } from "@/types/cursor";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { motionTokens } from "@/utils/motion";
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
  const pathname = usePathname();

  const cursorSize = useSpring(CURSOR_SIZE.sm, motionTokens.spring.cursor);
  const smoothX = useMotionValue(-100);
  const smoothY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  useEffect(() => {
    cursorSize.set(CURSOR_SIZE.sm);
    const id = setTimeout(() => setColor(CSS_VARIABLES.accent), 0);
    return () => clearTimeout(id);
  }, [pathname, cursorSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    smoothX.set(clientX);
    smoothY.set(clientY);
    opacity.set(1);
  }, [smoothX, smoothY, opacity]);

  const handleMouseLeave = useCallback(() => {
    opacity.set(0);
  }, [opacity]);

  const handleMouseEnter = useCallback(() => {
    opacity.set(1);
  }, [opacity]);

  useEffect(() => {
    if (disabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    document.body.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [disabled, handleMouseEnter, handleMouseLeave, handleMouseMove]);

  const contextValue = {
    cursorSize,
    smoothX,
    smoothY,
    setColor,
  };

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
