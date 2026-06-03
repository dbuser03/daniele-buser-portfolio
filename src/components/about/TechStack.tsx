"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TECH_STACK_FIRST_ROW_ICONS,
  TECH_STACK_SECOND_ROW_ICONS,
  TECH_STACK_DEFAULT_CELL_ID,
} from "@/constants/about";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import type { OverlayRect } from "@/types/about";
import { getTechStackCellId } from "@/utils/about";
import TechStackCell from "./TechStackCell";
import TechStackIcon from "./TechStackIcon";

const overlaySpring = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.9,
};

export default function TechStack() {
  const containerRef = useRef<HTMLElement | null>(null);
  const cellRefs = useRef<Record<string, HTMLElement | null>>({});
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(
    TECH_STACK_DEFAULT_CELL_ID,
  );
  const [fullyHighlightedCellId, setFullyHighlightedCellId] = useState<string | null>(
    null,
  );
  const [overlayRect, setOverlayRect] = useState<OverlayRect | null>(null);
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");

  useEffect(() => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
      highlightTimeoutRef.current = null;
    }

    setFullyHighlightedCellId(null);

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

  const getOverlayRect = useCallback((): OverlayRect | null => {
    if (!hoveredCellId || !containerRef.current) return null;
    const cell = cellRefs.current[hoveredCellId];
    if (!cell) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    return {
      x: cellRect.left - containerRect.left,
      y: cellRect.top - containerRect.top,
      width: cellRect.width,
      height: cellRect.height,
    };
  }, [hoveredCellId]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setOverlayRect(getOverlayRect());
    });
    return () => cancelAnimationFrame(frame);
  }, [getOverlayRect]);

  useEffect(() => {
    const handleResize = () => setOverlayRect(getOverlayRect());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [getOverlayRect]);

  const handleCellMouseEnter = (cellId: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    updateHoveredCell(cellId);
  };

  const handleCellMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      updateHoveredCell(TECH_STACK_DEFAULT_CELL_ID);
      handleMouseLeave();
    }, 50);
  };

  const handleMouseLeaveTechStack = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    updateHoveredCell(TECH_STACK_DEFAULT_CELL_ID);
    handleMouseLeave();
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 flex w-full flex-col gap-0"
      onMouseLeave={handleMouseLeaveTechStack}
      aria-labelledby="tech-stack-heading"
    >
      <motion.h2
        id="tech-stack-heading"
        className="pb-3 text-xs text-(--neutral-dark) md:text-sm"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        MY TECH STACK
      </motion.h2>

      <AnimatePresence>
        {hoveredCellId && overlayRect && (
          <motion.div
            className="pointer-events-none absolute z-20"
            style={{ backgroundColor: "var(--background)" }}
            initial={{
              ...overlayRect,
              opacity: 0,
            }}
            animate={{
              ...overlayRect,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              x: overlaySpring,
              y: overlaySpring,
              width: overlaySpring,
              height: overlaySpring,
              opacity: { duration: 0.2 },
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-3">
        {TECH_STACK_FIRST_ROW_ICONS.map((icon, index) => {
          const cellId = getTechStackCellId("first", index);
          const cellIsActive = hoveredCellId === cellId;
          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              className="relative min-h-44 bg-(--foreground) lg:aspect-3/2 lg:min-h-0"
              cellRef={(node) => {
                if (node) cellRefs.current[cellId] = node;
              }}
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
            >
              <TechStackIcon
                icon={{
                  ...icon,
                  hoverPaddingClass: icon.hoverPaddingClass ?? "p-8 sm:p-12",
                }}
                isActive={cellIsActive}
                isFullyActive={fullyHighlightedCellId === cellId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-2 gap-0 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }, (_, index) => {
          const cellId = getTechStackCellId("second", index);
          const icon = TECH_STACK_SECOND_ROW_ICONS.find(
            (item) => item.cellIndex === index,
          )?.icon;

          if (!icon) return null;

          const cellIsActive = hoveredCellId === cellId;

          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              className="relative aspect-square bg-(--foreground)"
              cellRef={(node) => {
                if (node) cellRefs.current[cellId] = node;
              }}
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
            >
              <TechStackIcon
                icon={icon}
                isActive={cellIsActive}
                isFullyActive={fullyHighlightedCellId === cellId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </div>
    </section>
  );
}
