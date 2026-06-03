"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function AboutPortrait() {
  return (
    <motion.div
      className="relative aspect-3/4 w-full overflow-hidden"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.08, y: -12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/CV_SUPSI_6394.jpg"
          alt="Portrait of Daniele Buser"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 0px"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
