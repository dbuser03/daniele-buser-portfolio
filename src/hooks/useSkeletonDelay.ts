import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Development-only skeleton delay.
 *
 * Returns an `isLoading` flag that stays `true` for at least `delayMs`
 * milliseconds, regardless of when the real content loads.
 *
 * Call `markLoaded()` from your `onLoad` / `onLoadedData` handler — the
 * skeleton will then fade out only once both the delay AND the real load
 * have completed.
 *
 * @example
 * const { isLoading, markLoaded } = useSkeletonDelay(2000);
 * <Skeleton isLoading={isLoading} />
 * <Image onLoad={markLoaded} ... />
 */
export function useSkeletonDelay(delayMs: number) {
  const [delayDone, setDelayDone] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDelayDone(true), delayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delayMs]);

  const markLoaded = useCallback(() => setContentLoaded(true), []);

  const isLoading = !(delayDone && contentLoaded);

  return { isLoading, markLoaded };
}
