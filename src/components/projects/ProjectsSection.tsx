"use client";

import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section
      className="relative z-10 w-full flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-32"
      aria-labelledby="projects-list-heading"
    >
      <h2 id="projects-list-heading" className="sr-only">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
