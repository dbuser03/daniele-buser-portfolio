"use client";

import { useMemo } from "react";
import { m } from "motion/react";
import { motionTokens, useAnimations } from "@/utils/motion";

export const PROJECTS_TITLE_ID = "projects-title";

export default function ProjectsTitle({ year }: { year: string }) {
  const { entranceVariants } = useAnimations();

  const twoDigitYear = year;
  const projectsVariants = useMemo(
    () => entranceVariants(0.35, 40, motionTokens.duration.smooth),
    [entranceVariants],
  );
  const yearVariants = useMemo(
    () => entranceVariants(0.35, 40, motionTokens.duration.smooth),
    [entranceVariants],
  );

  return (
    <h1
      id={PROJECTS_TITLE_ID}
      className="text-display-lg relative z-10 flex w-full items-baseline justify-between text-(--background)"
      aria-label={`Projects ${twoDigitYear}`}
    >
      <m.span
        className="-ml-3.5 inline-block"
        variants={projectsVariants}
        initial="initial"
        animate="visible"
      >
        Projects
      </m.span>
      <m.span
        className="-mr-2 inline-block text-right"
        variants={yearVariants}
        initial="initial"
        animate="visible"
      >
        <span className="text-(--accent)">&apos;</span>
        {twoDigitYear}
      </m.span>
    </h1>
  );
}
