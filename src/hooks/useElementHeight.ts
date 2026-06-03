"use client";

import { useState, useEffect, useRef } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, height] as const;
}
