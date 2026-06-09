"use client";

import { motion } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { motionTokens, entranceVariants, listVariants } from "@/constants/animations";

export default function ProjectsSection() {
  const labelVariants = entranceVariants(0.5, 20, motionTokens.duration.smooth);

  return (
    <section
      className="relative z-10 flex w-full flex-col pb-64"
      aria-labelledby="projects-list-heading"
    >
      <SectionLabel
        as={motion.h2}
        id="projects-list-heading"
        variant="section-heading"
        variants={labelVariants}
        initial="initial"
        animate="visible"
      >
        SELECTED WORKS
      </SectionLabel>
      <motion.div
        className="mt-3 grid w-full grid-cols-12 gap-4"
        variants={listVariants(0.65, 0.1)}
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
