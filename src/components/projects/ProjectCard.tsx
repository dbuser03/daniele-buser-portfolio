"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { m } from "motion/react";
import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import SectionLabel from "@/components/ui/SectionLabel";
import { useAnimations } from "@/utils/motion";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

function ProjectCard({
  project,
  className,
  priority = false,
}: ProjectCardProps) {
  const { itemVariants, imageHoverVariants } = useAnimations();

  const imageSrc = project.cardImage || project.image;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isHovered || isFocused;

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "current",
    {
      onEnter: () => setIsHovered(true),
      onLeave: () => setIsHovered(false),
    },
  );

  return (
    <m.div
      variants={itemVariants}
      className={cn("col-span-6 flex w-full flex-col gap-4", className)}
    >
      <Link
        href={`/projects/${project.id}` as Route}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="group flex w-full flex-col bg-card-dark p-4 pb-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-dark">
          <m.div
            className="absolute inset-0"
            variants={imageHoverVariants}
            initial="initial"
            animate={isActive ? "hover" : "initial"}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={priority}
              />
            ) : null}
          </m.div>
        </div>
        <div className="mt-8 flex items-start justify-between text-foreground">
          <h3 className="text-section font-normal">
            {project.title}
          </h3>
          <div className="flex flex-col items-end gap-1">
            {project.tags.map((tag) => (
              <SectionLabel key={tag}>{tag}</SectionLabel>
            ))}
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default ProjectCard;
