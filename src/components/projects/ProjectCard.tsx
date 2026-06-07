"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "motion/react";
import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import Skeleton from "@/components/ui/Skeleton";
import SectionLabel from "@/components/ui/SectionLabel";
import { EASE_OUT } from "@/constants/animations";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.cardImage || project.image;
  const [isLoading, setIsLoading] = useState(!!imageSrc);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("current");

  const showSkeleton = !imageSrc || isLoading || hasError;

  return (
    <div className="col-span-6 flex w-full flex-col gap-4">
      <Link
        href={`/projects/${project.id}` as Route}
        onMouseEnter={() => {
          setIsHovered(true);
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        className="group flex w-full flex-col bg-(--card-dark) p-4 pb-8"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)">
          <Skeleton isLoading={showSkeleton} variant="on-dark" />
          {imageSrc && !hasError && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1, filter: "blur(0px)" }}
              animate={
                isHovered
                  ? { scale: 1.04, filter: "blur(4px)" }
                  : { scale: 1.1, filter: "blur(0px)" }
              }
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            </motion.div>
          )}
        </div>
        <div className="mt-8 flex items-start justify-between text-(--foreground)">
          <h3 className="text-section font-medium tracking-tight">
            {project.title}
          </h3>
          <div className="flex flex-col items-end gap-1.5">
            {project.tags.map((tag) => (
              <SectionLabel key={tag}>{tag}</SectionLabel>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(ProjectCard);
