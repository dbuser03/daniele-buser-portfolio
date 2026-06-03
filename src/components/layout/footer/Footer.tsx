"use client";

import React from "react";
import { motion } from "motion/react";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import {
  footerVariants,
  footerAnimationConfig,
  footerDelays,
} from "@/constants/footer";
import { getFooterTitleColor, getFooterCoordinatesColor } from "@/utils/footer";
import { FooterProps } from "@/types/footer";

const Footer: React.FC<FooterProps> = ({
  variant = "dark",
  preventAnimation = false,
}) => {
  const currentTime = useCurrentTime();

  return (
    <footer className="flex w-full flex-col p-4">
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
    </footer>
  );
};

export default Footer;
