"use client";

import React from "react";
import { motion } from "motion/react";

import {
  projectCardVariants,
  projectCardAnimationConfig,
} from "@/constants/projects";
import { ProjectOverlayProps } from "@/types/projects";

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ show }) => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      initial={projectCardVariants.overlay.hidden}
      animate={
        show
          ? projectCardVariants.overlay.visible
          : projectCardVariants.overlay.hidden
      }
      transition={projectCardAnimationConfig.overlay}
      aria-hidden={!show}
    >
      <div className="relative w-[90%]">
        <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--neutral)]" />
      </div>
    </motion.div>
  );
};

export default ProjectOverlay;
