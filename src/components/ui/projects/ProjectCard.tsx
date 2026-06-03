"use client";

import React, { useRef, useEffect } from "react";
import { useCursorInteraction } from "@/hooks/layout/cursor/useCursorInteraction";
import { CURSOR_SIZE } from "@/constants/layout/cursor";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import {
  projectCardVariants,
  projectCardAnimationConfig,
  projectCardDelays,
} from "@/constants/projects";
import { ProjectCardProps } from "@/types/projects";
import usePrefersReducedMotion from "@/hooks/projects/usePrefersReducedMotion";
import ProjectOverlay from "./ProjectOverlay";

const ProjectCard: React.FC<
  ProjectCardProps & { onHover: (id: string | null) => void }
> = ({ project, index, isHighlighted, isNarrow, registerRef, onHover }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "default",
    "light",
    {
      onEnter: { size: CURSOR_SIZE.lg },
      onLeave: { size: CURSOR_SIZE.sm },
    },
  );
  const localRef = useRef<HTMLDivElement | null>(null);

  // Registra il ref quando il componente si monta
  useEffect(() => {
    if (registerRef) {
      registerRef(project.id, localRef.current);
      return () => registerRef(project.id, null);
    }
  }, [project.id, registerRef]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const showOverlay = isHighlighted && !prefersReducedMotion;

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        ref={localRef}
        data-project-id={project.id}
        className="max-w-4xl"
        initial={projectCardVariants.container.hidden}
        animate={projectCardVariants.container.visible}
        transition={{
          ...projectCardAnimationConfig.container,
          delay: index * projectCardDelays.step,
        }}
        onHoverStart={() => {
          if (!isNarrow) {
            handleMouseEnter();
            onHover(project.id);
          }
        }}
        onHoverEnd={() => {
          if (!isNarrow) {
            handleMouseLeave();
            onHover(null);
          }
        }}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            animate={
              isHighlighted
                ? projectCardVariants.image.hover
                : projectCardVariants.image.initial
            }
            transition={projectCardAnimationConfig.image}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <ProjectOverlay show={!!showOverlay} />
        </div>

        <div className="flex items-start justify-between pt-3">
          <h3 className="text-lg font-bold text-[var(--background)] uppercase md:text-2xl">
            {project.title}
          </h3>
          <div className="flex flex-col text-xs text-[var(--background)] md:text-sm">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
