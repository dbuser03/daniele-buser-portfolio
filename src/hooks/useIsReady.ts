"use client";

import { useState, useEffect } from "react";

export function useIsReady(delay = 150): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isReady;
}
