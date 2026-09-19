"use client";

import { useState, useCallback } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node: T | null) => {
    if (!node) return;

    setHeight(node.getBoundingClientRect().height);

    const observer = new ResizeObserver(() => {
      setHeight(node.getBoundingClientRect().height);
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [measuredRef, height] as const;
}
