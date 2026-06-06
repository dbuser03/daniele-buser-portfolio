"use client";

import { motion } from "motion/react";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { STAGGER_FADE_UP } from "@/constants/animations";

export default function Footer() {
  const currentTime = useCurrentTime();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("footer");

  return (
    <footer
      className="pointer-events-none fixed bottom-0 z-30 flex w-full flex-col p-4 mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto w-fit"
      >
        <motion.p
          className="text-xs leading-none text-(--foreground) md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={STAGGER_FADE_UP(0.8)}
        >
          LUGANO - {currentTime}
        </motion.p>
        <motion.p
          className="text-xs text-(--neutral) md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={STAGGER_FADE_UP(0.9)}
        >
          46° 00&apos; 13.24&quot; - 08° 57&apos; 03.79&quot;
        </motion.p>
      </div>
    </footer>
  );
}
