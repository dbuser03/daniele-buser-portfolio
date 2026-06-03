"use client";

import React from "react";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/projects";
import {
  projectIndexVariants,
  projectIndexAnimationConfig,
} from "@/constants/projects";
import IndexItem from "./IndexItem";

const ProjectIndex: React.FC<{
  onHover: (id: string | null) => void;
  highlightedId: string | null;
}> = ({ onHover, highlightedId }) => {
  return (
    <motion.aside
      className="sticky top-32 flex flex-col items-start gap-8"
      initial={projectIndexVariants.container.hidden}
      animate={projectIndexVariants.container.visible}
      transition={projectIndexAnimationConfig.container}
      aria-label="Project index"
    >
      <h2 className="text-xl text-[var(--neutral-dark)]">Index</h2>
      <ul className="flex flex-col">
        {PROJECTS.map((project, index) => (
          <IndexItem
            project={project}
            index={index}
            key={project.id}
            onHover={onHover}
            isHighlighted={highlightedId === project.id}
          />
        ))}
      </ul>
    </motion.aside>
  );
};

export default ProjectIndex;
