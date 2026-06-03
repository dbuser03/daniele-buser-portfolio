"use client";

import React from "react";
import { motion } from "motion/react";
import { useCurrentTime } from "@/hooks/layout/useCurrentTime";
import {
  footerVariants,
  footerAnimationConfig,
  footerDelays,
} from "@/constants/layout/footer";
import {
  getFooterTitleColor,
  getFooterCoordinatesColor,
} from "@/utils/layout/footer";
import { FooterProps } from "@/types/layout/footer";
import { useCursorInteraction } from "@/hooks/layout/cursor/useCursorInteraction";

const Footer: React.FC<FooterProps> = ({
  variant = "dark",
  preventAnimation = false,
}) => {
  const currentTime = useCurrentTime();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("footer");

  return (
    <footer className="fixed bottom-0 z-30 flex w-full flex-col p-4">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-fit"
      >
        <motion.h1
          className="text-xs leading-none md:text-sm"
          style={{ color: getFooterTitleColor(variant) }}
          initial={preventAnimation ? "visible" : "hidden"}
          animate="visible"
          variants={preventAnimation ? {} : footerVariants}
          transition={
            preventAnimation
              ? {}
              : { ...footerAnimationConfig, delay: footerDelays.title }
          }
        >
          LUGANO - {currentTime}
        </motion.h1>
        <motion.p
          className="text-xs md:text-sm"
          style={{ color: getFooterCoordinatesColor(variant) }}
          initial={preventAnimation ? "visible" : "hidden"}
          animate="visible"
          variants={preventAnimation ? {} : footerVariants}
          transition={
            preventAnimation
              ? {}
              : {
                  ...footerAnimationConfig,
                  delay: footerDelays.coordinates,
                }
          }
        >
          46° 00&apos; 13.24&quot; - 08° 57&apos; 03.79&quot;
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
