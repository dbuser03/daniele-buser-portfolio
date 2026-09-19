"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);

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

  const handleToggle = useCallback(
    (path: string) => {
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
    },
    [expandedPaths, selectedFile, onFileSelect],
  );

  const resetPaths = useCallback(() => {
    setExpandedPaths(new Set());
    onFileSelect?.(null);
  }, [onFileSelect]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);

  return {
    rootRef,
    expandedPaths,
    handleToggle,
    resetPaths,
    handleMouseLeave,
  };
}
