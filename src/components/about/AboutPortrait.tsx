"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT_EXPO, FADE_UP_TRANSITION } from "@/constants/animations";

export default function AboutPortrait() {
  return (
    <motion.figure
      className="relative aspect-3/4 w-full overflow-hidden"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.65 }}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.08, y: -12 }}
        transition={FADE_UP_TRANSITION}
      >
        <Image
          src="/portrait.webp"
          alt="Portrait of Daniele Buser"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 0px"
          priority
        />
      </motion.div>
    </motion.figure>
  );
}
