"use client";

import React from "react";
import { useCursorInteraction } from "@/hooks/layout/cursor/useCursorInteraction";
import Link from "next/link";
import { motion } from "motion/react";
import { IndexItemProps } from "@/types/projects";
import {
  projectIndexVariants,
  projectIndexAnimationConfig,
  projectIndexDelays,
} from "@/constants/projects";

const IndexItem: React.FC<
  IndexItemProps & {
    onHover: (id: string | null) => void;
    isHighlighted: boolean;
  }
> = ({ project, index, onHover, isHighlighted }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    "light",
  );
  const delay = projectIndexDelays.base + index * projectIndexDelays.step;
  const transition = { ...projectIndexAnimationConfig.item, delay };

  return (
    <motion.li
      className="flex gap-2 leading-5 text-[var(--background)]"
      initial={projectIndexVariants.item.hidden}
      animate={projectIndexVariants.item.visible}
      transition={transition}
      onMouseEnter={(e) => {
        handleMouseEnter();
        onHover(project.id);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        onHover(null);
      }}
    >
      <motion.div
        className="flex gap-2 leading-5"
        whileHover="hover"
        initial="initial"
        variants={projectIndexVariants.linkGroup}
        transition={projectIndexAnimationConfig.titleShift}
        animate={isHighlighted ? "hover" : "initial"}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="flex gap-2 leading-5"
        >
          <span className="inline-block w-8">({index + 1})</span>
          <motion.span
            variants={projectIndexVariants.titleShift}
            transition={projectIndexAnimationConfig.titleShift}
          >
            {project.title}
          </motion.span>
        </Link>
      </motion.div>
    </motion.li>
  );
};

export default IndexItem;
