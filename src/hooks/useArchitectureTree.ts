"use client";

import { useState, useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

interface UseArchitectureTreeProps {
  selectedFile?: string | null;
  onHover?: (path: string | null) => void;
  onFileSelect?: (path: string | null) => void;
}

export function useArchitectureTree({
  selectedFile,
  onHover,
  onFileSelect,
}: UseArchitectureTreeProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const hoveredRef = useRef<string | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  
  const onHoverRef = useRef(onHover);
  useEffect(() => {
    onHoverRef.current = onHover;
  }, [onHover]);

  const lenis = useLenis();

  useEffect(() => {
    if (selectedFile) {
      const parts = selectedFile.split("/");
      const pathsToExpand: string[] = [];
      let current = "";
      for (let i = 0; i < parts.length - 1; i++) {
        current = current ? `${current}/${parts[i]}` : parts[i];
        pathsToExpand.push(current);
      }
      if (pathsToExpand.length > 0) {
        const frame = requestAnimationFrame(() => {
          setExpandedPaths((prev) => {
            const next = new Set(prev);
            pathsToExpand.forEach((p) => next.add(p));
            return next;
          });
        });
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    const root = rootRef.current;
    const scrollContainer = root?.closest(
      ".overflow-y-auto",
    ) as HTMLElement | null;
    if (!root || !scrollContainer) return;

    const update = () => {
      const pos = mousePosRef.current;
      if (!pos) return;

      const el = document
        .elementsFromPoint(pos.x, pos.y)
        .find((e) => e === root || root.contains(e)) as HTMLElement | undefined;

      if (!el) {
        if (hoveredRef.current !== null) {
          hoveredRef.current = null;
          onHoverRef.current?.(null);
        }
        return;
      }

      const target = el.closest("[data-path]");
      const path = target?.getAttribute("data-path") ?? null;
      if (path !== hoveredRef.current) {
        hoveredRef.current = path;
        onHoverRef.current?.(path);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (root.contains(e.target as Node)) update();
    };
    const onScroll = () => update();

    window.addEventListener("pointermove", onPointerMove);
    scrollContainer.addEventListener("scroll", onScroll);
    lenis?.on("scroll", onScroll);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      scrollContainer.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, [lenis]);

  const handleToggle = (path: string) => {
    const isClosing = expandedPaths.has(path);
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (isClosing) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });

    if (isClosing && selectedFile && selectedFile.startsWith(path + "/")) {
      onFileSelect?.(null);
    }
  };

  const resetPaths = () => {
    setExpandedPaths(new Set());
    onFileSelect?.(null);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = null;
    onHover?.(null);
  };

  return {
    rootRef,
    expandedPaths,
    handleToggle,
    resetPaths,
    handleMouseLeave,
  };
}
