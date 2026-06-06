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
      className="relative z-10 flex w-full items-baseline justify-between text-[3.5rem] leading-none text-(--background) sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]"
      aria-label={`Projects '${twoDigitYear}`}
    >
      <motion.span
        className="-ml-1 inline-block sm:-ml-2 md:-ml-3 lg:-ml-3.5"
        variants={projectsVariants}
        initial="initial"
        animate="visible"
      >
        Projects
      </motion.span>
      <motion.span
        className="-mr-1 inline-block text-right md:-mr-2"
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
