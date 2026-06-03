"use client";

import { motion } from "motion/react";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { getPrimaryColor, getSecondaryColor } from "@/utils/theme";
import { FooterProps } from "@/types/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

import { useThemeVariant } from "@/hooks/useThemeVariant";

export default function Footer({
  preventAnimation = false,
}: FooterProps) {
  const variant = useThemeVariant();
  const currentTime = useCurrentTime();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("footer");

  return (
    <footer
      className="fixed bottom-0 z-30 flex w-full flex-col p-4 pointer-events-none"
      aria-label="Site footer with location and time"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-fit pointer-events-auto"
      >
        <motion.p
          className="text-xs leading-none md:text-sm"
          style={{ color: getPrimaryColor(variant) }}
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
          className="text-xs md:text-sm"
          style={{ color: getSecondaryColor(variant) }}
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
