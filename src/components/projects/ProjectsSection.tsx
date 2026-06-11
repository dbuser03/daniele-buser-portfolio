"use client";

import { m } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { motionTokens, useAnimations } from "@/utils/motion";

export default function ProjectsSection() {
  const { entranceVariants, listVariants } = useAnimations();

  const labelVariants = entranceVariants(0.5, 20, motionTokens.duration.smooth);

  return (
    <section
      className="relative z-10 flex w-full flex-col pb-64"
      aria-labelledby="projects-list-heading"
    >
      <SectionLabel
        as={m.h2}
        id="projects-list-heading"
        variant="section-heading"
        variants={labelVariants}
        initial="initial"
        animate="visible"
      >
        SELECTED WORKS
      </SectionLabel>
      <m.div
        className="mt-3 grid w-full grid-cols-12 gap-4"
        variants={listVariants(0.65, motionTokens.stagger.loose)}
        initial="initial"
        animate="visible"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0}
          />
        ))}
      </m.div>
    </section>
  );
}
