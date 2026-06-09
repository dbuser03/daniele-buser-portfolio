"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { TECH_STACK_DEFAULT_CELL_ID } from "@/constants/about";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export function useTechStack() {
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hoveredCellId, setHoveredCellId] = useState<string | null>(
    TECH_STACK_DEFAULT_CELL_ID,
  );
  const [fullyHighlightedCellId, setFullyHighlightedCellId] = useState<
    string | null
  >(null);

  const { handleMouseEnter: onCursorEnter, handleMouseLeave: onCursorLeave } =
    useCursorInteraction("interactive");

  useEffect(() => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
      highlightTimeoutRef.current = null;
    }

    if (hoveredCellId) {
      highlightTimeoutRef.current = setTimeout(() => {
        setFullyHighlightedCellId(hoveredCellId);
      }, 150);
    }

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [hoveredCellId]);

  const updateHoveredCell = useCallback((cellId: string) => {
    setHoveredCellId(cellId);
    setFullyHighlightedCellId(null);
  }, []);

  const handleCellMouseEnter = useCallback(
    (cellId: string) => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      updateHoveredCell(cellId);
    },
    [updateHoveredCell],
  );

  const handleCellMouseLeave = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      updateHoveredCell(TECH_STACK_DEFAULT_CELL_ID);
      onCursorLeave();
    }, 50);
  }, [updateHoveredCell, onCursorLeave]);

  const handleMouseLeaveTechStack = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    updateHoveredCell(TECH_STACK_DEFAULT_CELL_ID);
    onCursorLeave();
  }, [updateHoveredCell, onCursorLeave]);

  return {
    hoveredCellId,
    fullyHighlightedCellId,
    handleCellMouseEnter,
    handleCellMouseLeave,
    handleMouseLeaveTechStack,
    onCursorEnter,
    onCursorLeave,
  };
}
