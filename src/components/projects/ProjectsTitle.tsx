"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useIsReady } from "@/hooks/useIsReady";
import { createFadeUpVariants } from "@/constants/animations";
import { getCurrentTwoDigitYear } from "@/utils/date";

export default function ProjectsTitle() {
  const isReady = useIsReady(150);
  const [twoDigitYear, setTwoDigitYear] = useState("26");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTwoDigitYear(getCurrentTwoDigitYear());
  }, []);

  const projectsVariants = useMemo(() => createFadeUpVariants(0.35, 40, 0.45), []);
  const yearVariants = useMemo(() => createFadeUpVariants(0.5, 40, 0.45), []);

  return (
    <h1
      className="relative z-10 flex w-full items-baseline justify-between text-[3.5rem] text-(--background) sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] leading-none"
      aria-label={`Projects '${twoDigitYear}`}
    >
      <motion.span
        className="-ml-1 sm:-ml-2 md:-ml-3 lg:-ml-3.5 inline-block"
        variants={projectsVariants}
        initial="initial"
        animate={isReady ? "visible" : "initial"}
      >
        Projects
      </motion.span>
      <motion.span
        className="-mr-1 text-right md:-mr-2 inline-block"
        variants={yearVariants}
        initial="initial"
        animate={isReady ? "visible" : "initial"}
      >
        <span className="text-(--accent)">&apos;</span>{twoDigitYear}
      </motion.span>
    </h1>
  );
}
