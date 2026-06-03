"use client";

import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import {
  logoAnimationConfig,
  logoVariants,
  logoDelays,
} from "@/constants/logo";
import { LogoProps } from "@/types/logo";
import { getLogoTitleColor, getLogoSubtitleColor } from "@/utils/logo";

const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  preventAnimation = false,
}) => {
  return (
    <Link href="/" className="flex flex-col items-start no-underline">
      <motion.h1
        className="text-base leading-none font-bold md:text-lg"
        style={{ color: getLogoTitleColor(variant) }}
        variants={preventAnimation ? {} : logoVariants}
        initial={preventAnimation ? "visible" : "hidden"}
        animate="visible"
        transition={
          preventAnimation
            ? {}
            : { ...logoAnimationConfig, delay: logoDelays.title }
        }
      >
        DANIELE BUSER
      </motion.h1>
      <motion.p
        className="text-xs md:text-sm"
        style={{ color: getLogoSubtitleColor(variant) }}
        variants={preventAnimation ? {} : logoVariants}
        initial={preventAnimation ? "visible" : "hidden"}
        animate="visible"
        transition={
          preventAnimation
            ? {}
            : { ...logoAnimationConfig, delay: logoDelays.subtitle }
        }
      >
        Creative Developer
      </motion.p>
    </Link>
  );
};

export default Logo;
