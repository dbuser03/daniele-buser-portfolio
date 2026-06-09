import { useState, useEffect } from "react";
import { PRELOADER_CONSTANTS } from "../constants/preloader";

export function usePreloaderCard() {
  const [progress, setProgress] = useState(0);
  const [coreLoad, setCoreLoad] = useState(12);

  const isReset = progress === 0;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const coreInterval = setInterval(() => {
      setCoreLoad(Math.floor(Math.random() * 33) + 65);
    }, PRELOADER_CONSTANTS.CORE_LOAD_INTERVAL);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(coreInterval);
          setCoreLoad(12);
          timeoutId = setTimeout(() => {
            setProgress(0);
          }, PRELOADER_CONSTANTS.HOLD_RESET_DELAY);
          return 100;
        }

        const increment = Math.random() * 4 + 2;
        return Math.min(prev + increment, 100);
      });
    }, PRELOADER_CONSTANTS.TIMER_INTERVAL);

    return () => {
      clearInterval(timer);
      clearInterval(coreInterval);
      clearTimeout(timeoutId);
    };
  }, [isReset]);

  return { progress, coreLoad };
}
