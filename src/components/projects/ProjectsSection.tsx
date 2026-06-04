"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import { useIsReady } from "@/hooks/useIsReady";
import { createFadeUpVariants } from "@/constants/animations";

export default function ProjectsSection() {
  const isReady = useIsReady(150);

  const gridVariants = useMemo(
    () => createFadeUpVariants(0.65),
    [],
  );

  return (
    <section
      className="relative z-10 w-full flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-32"
      aria-labelledby="projects-list-heading"
    >
      <h2 id="projects-list-heading" className="sr-only">
        Project Gallery
      </h2>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full"
        variants={gridVariants}
        initial="initial"
        animate={isReady ? "visible" : "initial"}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
