"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { createFadeUpVariants } from "@/constants/animations";

export const PROJECTS_TITLE_ID = "projects-title";

export default function ProjectsTitle({ year }: { year: string }) {
  const twoDigitYear = year;
  const projectsVariants = useMemo(
    () => createFadeUpVariants(0.35, 40, 0.45),
    [],
  );
  const yearVariants = useMemo(() => createFadeUpVariants(0.5, 40, 0.45), []);

  return (
    <h1
      id={PROJECTS_TITLE_ID}
      className="text-display-lg relative z-10 flex w-full items-baseline justify-between text-(--background)"
      aria-label={`Projects ${twoDigitYear}`}
    >
      <motion.span
        className="-ml-3.5 inline-block"
        variants={projectsVariants}
        initial="initial"
        animate="visible"
      >
        Projects
      </motion.span>
      <motion.span
        className="-mr-2 inline-block text-right"
        variants={yearVariants}
        initial="initial"
        animate="visible"
      >
        <span className="text-(--accent)">&apos;</span>
        {twoDigitYear}
      </motion.span>
    </h1>
  );
}
