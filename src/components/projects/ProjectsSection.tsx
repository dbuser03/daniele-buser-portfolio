"use client";

import { useEffect, useMemo, useState } from "react";
import { inView } from "motion";
import { motion } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import { createFadeUpVariants } from "@/constants/animations";
import { PROJECTS_TITLE_ID } from "./ProjectsTitle";

export default function ProjectsSection() {
  const [isTitleInView, setIsTitleInView] = useState(() => {
    if (typeof window === "undefined") return true;
    const title = document.getElementById(PROJECTS_TITLE_ID);
    if (!title) return true;
    const rect = title.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  });

  useEffect(() => {
    return inView(`#${PROJECTS_TITLE_ID}`, () => {
      setIsTitleInView(true);
      return () => setIsTitleInView(false);
    });
  }, []);

  const gridVariants = useMemo(
    () => createFadeUpVariants(isTitleInView ? 0.65 : 0.35),
    [isTitleInView],
  );

  const labelVariants = useMemo(
    () => createFadeUpVariants(isTitleInView ? 0.5 : 0.2, 15, 0.4),
    [isTitleInView],
  );

  return (
    <section
      className="relative z-10 flex w-full flex-col pb-64"
      aria-labelledby="projects-list-heading"
    >
      <motion.h2
        id="projects-list-heading"
        className="pb-3 text-xs text-(--neutral-dark) md:text-sm"
        variants={labelVariants}
        initial="initial"
        animate="visible"
      >
        SELECTED WORKS
      </motion.h2>
      <motion.div
        className="grid w-full grid-cols-1 gap-4 lg:grid-cols-12"
        variants={gridVariants}
        initial="initial"
        animate="visible"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
