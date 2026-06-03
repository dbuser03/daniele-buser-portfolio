"use client";

import { useState, useEffect } from "react";
import { GridBreakpoint } from "@/types/grid";
import { GRID_BREAKPOINTS } from "@/constants/grid";

export const useGridBreakpoint = (): GridBreakpoint => {
  const [breakpoint, setBreakpoint] = useState<GridBreakpoint>("base");

  useEffect(() => {
    const getBreakpoint = (): GridBreakpoint => {
      const width = window.innerWidth;
      if (width >= GRID_BREAKPOINTS["2xl"]) return "2xl";
      if (width >= GRID_BREAKPOINTS.xl) return "xl";
      if (width >= GRID_BREAKPOINTS.lg) return "lg";
      if (width >= GRID_BREAKPOINTS.md) return "md";
      if (width >= GRID_BREAKPOINTS.sm) return "sm";
      return "base";
    };

    const handleResize = () => setBreakpoint(getBreakpoint());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
