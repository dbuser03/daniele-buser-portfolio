"use client";

import { useState, memo } from "react";
import Link from "next/link";
import type { Route } from "next";
import { m } from "motion/react";
import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import SectionLabel from "@/components/ui/SectionLabel";
import { motionTokens, useAnimations } from "@/utils/motion";
import { cn } from "@/utils/cn";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

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
  const { itemVariants } = useAnimations();

  const imageSrc = project.cardImage || project.image;
  const [isHovered, setIsHovered] = useState(false);

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
        className="group flex w-full flex-col bg-(--card-dark) p-4 pb-8"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)">
          <m.div
            className="absolute inset-0"
            initial={{ scale: 1.1, filter: "blur(0px)" }}
            animate={
              isHovered
                ? { scale: 1.04, filter: "blur(4px)" }
                : { scale: 1.1, filter: "blur(0px)" }
            }
            transition={{
              duration: motionTokens.duration.base,
              ease: motionTokens.easing.standard,
            }}
          >
            <ImageWithSkeleton
              src={imageSrc}
              alt={project.title}
              skeletonVariant="on-dark"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={priority}
            />
          </m.div>
        </div>
        <div className="mt-8 flex items-start justify-between text-(--foreground)">
          <h3 className="text-section font-medium tracking-tight">
            {project.title}
          </h3>
          <div className="flex flex-col items-end">
            {project.tags.map((tag) => (
              <SectionLabel key={tag}>{tag}</SectionLabel>
            ))}
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default memo(ProjectCard);
