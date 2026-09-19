"use client";

import {
  createContext,
  use,
  useEffect,
  useCallback,
  useMemo,
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
  const pathname = usePathname();

  const cursorSize = useSpring(CURSOR_SIZE.sm, motionTokens.spring.cursor);
  const smoothX = useMotionValue(-100);
  const smoothY = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const cursorColor = useMotionValue<string>(CSS_VARIABLES.accent);

  const setColor = useCallback(
    (newColor: string) => {
      cursorColor.set(newColor);
    },
    [cursorColor],
  );

  useEffect(() => {
    cursorSize.set(CURSOR_SIZE.sm);
    cursorColor.set(CSS_VARIABLES.accent);
  }, [pathname, cursorSize, cursorColor]);

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

    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

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

  const contextValue = useMemo(
    () => ({
      cursorSize,
      smoothX,
      smoothY,
      cursorColor,
      setColor,
    }),
    [cursorSize, smoothX, smoothY, cursorColor, setColor],
  );

  return (
    <CursorContext value={contextValue}>
      {!disabled && (
        <Cursor
          smoothX={smoothX}
          smoothY={smoothY}
          cursorSize={cursorSize}
          opacity={opacity}
          color={cursorColor}
        />
      )}
      {children}
    </CursorContext>
  );
};
