"use client";

import { useState, useCallback, useRef } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measuredRef = useCallback((node: T | null) => {
    // Disconnect any previous observer when the node changes
    observerRef.current?.disconnect();

    if (!node) return;

    // Measure synchronously on mount — no paint flash
    setHeight(node.getBoundingClientRect().height);

    // Watch for subsequent resize changes
    observerRef.current = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observerRef.current.observe(node);
  }, []);

  return [measuredRef, height] as const;
}
