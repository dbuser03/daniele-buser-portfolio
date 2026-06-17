import { useState } from "react";

export function useBasicElementsShowcase() {
  const [isEngineActive, setEngineActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const incrementClick = () => setClickCount((c) => c + 1);
  const resetClick = () => setClickCount(0);

  return {
    isEngineActive,
    setEngineActive,
    clickCount,
    incrementClick,
    resetClick,
  };
}
