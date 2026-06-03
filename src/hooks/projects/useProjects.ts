import { useState, useEffect, useRef, useCallback } from "react";
import {
  getGridColumnCount,
  findMostVisibleProject,
  updateVisibilityMap,
} from "@/utils/projects";

export const useProjects = () => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [isNarrow, setIsNarrow] = useState<boolean>(false);

  const containerRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const gridRef = useRef<HTMLDivElement | null>(null);

  const registerProjectRef = useCallback(
    (id: string, node: HTMLDivElement | null) => {
      containerRefs.current.set(id, node);
    },
    [],
  );

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const checkIfNarrow = () => {
      const columnCount = getGridColumnCount(gridElement);
      setIsNarrow(columnCount === 1);
    };

    checkIfNarrow();

    const resizeObserver = new ResizeObserver(checkIfNarrow);
    resizeObserver.observe(gridElement);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isNarrow) {
      setHighlightedId(null);
      return;
    }

    const visibilityMap = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      updateVisibilityMap(entries, visibilityMap);
      const mostVisibleId = findMostVisibleProject(visibilityMap);
      setHighlightedId(mostVisibleId);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    containerRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [isNarrow]);

  return {
    highlightedId,
    setHighlightedId,
    gridRef,
    isNarrow,
    registerProjectRef,
  };
};
