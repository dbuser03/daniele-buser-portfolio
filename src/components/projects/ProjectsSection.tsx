"use client";

import { motion } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import { createFadeUpVariants } from "@/constants/animations";

export default function ProjectsSection() {
  const gridVariants = createFadeUpVariants(0.65);
  const labelVariants = createFadeUpVariants(0.5, 15, 0.4);

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
