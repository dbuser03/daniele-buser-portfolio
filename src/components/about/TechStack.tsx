"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
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

const INITIAL_LABEL_RANGE: [number, number] = [0.05, 0.25];

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
  const [isInteractive, setIsInteractive] = useState(false);
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);
  const [overlayRect, setOverlayRect] = useState<OverlayRect | null>(null);
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "start 25%"],
  });

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.98 && !isInteractive) {
      setIsInteractive(true);
      let detectedCellId: string | null = null;
      if (mousePosRef.current) {
        const { x, y } = mousePosRef.current;
        for (const [cellId, cellEl] of Object.entries(cellRefs.current)) {
          if (cellEl) {
            const rect = cellEl.getBoundingClientRect();
            if (
              x >= rect.left &&
              x <= rect.right &&
              y >= rect.top &&
              y <= rect.bottom
            ) {
              detectedCellId = cellId;
              break;
            }
          }
        }
      }
      setHoveredCellId(detectedCellId || TECH_STACK_DEFAULT_CELL_ID);
    } else if (latest < 0.98 && isInteractive) {
      setIsInteractive(false);
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      setHoveredCellId(null);
      handleMouseLeave();
      setOverlayRect(null);
    }
  });

  const labelOpacity = useTransform(scrollYProgress, INITIAL_LABEL_RANGE, [0, 1]);
  const labelY = useTransform(scrollYProgress, INITIAL_LABEL_RANGE, [12, 0]);

  const handleCellMouseEnter = (cellId: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredCellId(cellId);
  };

  const handleCellMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      if (isInteractive) {
        setHoveredCellId(TECH_STACK_DEFAULT_CELL_ID);
        handleMouseLeave();
      } else {
        setHoveredCellId(null);
        handleMouseLeave();
        setOverlayRect(null);
      }
    }, 50);
  };

  const handleMouseLeaveTechStack = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (isInteractive) {
      setHoveredCellId(TECH_STACK_DEFAULT_CELL_ID);
      handleMouseLeave();
    } else {
      setHoveredCellId(null);
      handleMouseLeave();
      setOverlayRect(null);
    }
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
        style={{ opacity: labelOpacity, y: labelY }}
      >
        MY TECH STACK
      </motion.h2>

      <AnimatePresence>
        {isInteractive && hoveredCellId && overlayRect && (
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

      <div className={`grid w-full grid-cols-1 gap-0 md:grid-cols-3 ${!isInteractive ? "pointer-events-none" : ""}`}>
        {TECH_STACK_FIRST_ROW_ICONS.map((icon, index) => {
          const cellId = getTechStackCellId("first", index);
          const cellIsActive = hoveredCellId === cellId && isInteractive;
          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              scrollYProgress={scrollYProgress}
              className="relative min-h-44 bg-(--foreground) lg:aspect-3/2 lg:min-h-0"
              cellRef={(node) => { if (node) cellRefs.current[cellId] = node; }}
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
              isInteractive={isInteractive}
            >
              <TechStackIcon
                icon={{ ...icon, hoverPaddingClass: icon.hoverPaddingClass ?? "p-8 sm:p-12" }}
                isActive={cellIsActive}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </div>

      <div className={`grid w-full grid-cols-2 gap-0 sm:grid-cols-4 lg:grid-cols-7 ${!isInteractive ? "pointer-events-none" : ""}`}>
        {Array.from({ length: 7 }, (_, index) => {
          const cellId = getTechStackCellId("second", index);
          const icon = TECH_STACK_SECOND_ROW_ICONS.find(
            (item) => item.cellIndex === index,
          )?.icon;

          if (!icon) return null;

          const cellIsActive = hoveredCellId === cellId && isInteractive;

          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              scrollYProgress={scrollYProgress}
              className="relative aspect-square bg-(--foreground)"
              cellRef={(node) => { if (node) cellRefs.current[cellId] = node; }}
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
              isInteractive={isInteractive}
            >
              <TechStackIcon
                icon={icon}
                isActive={cellIsActive}
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
