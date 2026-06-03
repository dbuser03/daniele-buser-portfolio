"use client";

import { motion } from "motion/react";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { FooterProps } from "@/types/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export default function Footer({
  preventAnimation = false,
}: FooterProps) {
  const currentTime = useCurrentTime();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("footer");

  return (
    <footer
      className="fixed bottom-0 z-30 flex w-full flex-col p-4 pointer-events-none mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-fit pointer-events-auto"
      >
        <motion.p
          className="text-xs leading-none md:text-sm text-(--foreground)"
          initial={
            preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            preventAnimation
              ? {}
              : { duration: 0.5, ease: "easeOut", delay: 0.8 }
          }
        >
          LUGANO - {currentTime}
        </motion.p>
        <motion.p
          className="text-xs md:text-sm text-(--neutral)"
          initial={
            preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            preventAnimation
              ? {}
              : { duration: 0.5, ease: "easeOut", delay: 0.9 }
          }
        >
          46° 00&apos; 13.24&quot; - 08° 57&apos; 03.79&quot;
        </motion.p>
      </div>
    </footer>
  );
}
