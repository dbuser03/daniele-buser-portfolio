"use client";

import { useState, useRef } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measuredRef = (node: T | null) => {
    observerRef.current?.disconnect();

    if (!node) return;

    setHeight(node.getBoundingClientRect().height);

    observerRef.current = new ResizeObserver(() => {
      if (node) setHeight(node.getBoundingClientRect().height);
    });
    observerRef.current.observe(node);
  };

  return [measuredRef, height] as const;
}
