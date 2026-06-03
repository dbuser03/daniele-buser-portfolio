"use client";

import { motion } from "motion/react";

export default function Hello() {
  return (
    <motion.h1
      className="text-[10rem] leading-none text-[var(--foreground)] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      aria-label="Say Hello - Contact page heading"
    >
      Say Hello
      <span className="text-[var(--accent)]" aria-hidden="true">
        .
      </span>
    </motion.h1>
  );
}
