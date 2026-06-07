"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import Skeleton from "@/components/ui/Skeleton";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.cardImage || project.image;
  const [isLoading, setIsLoading] = useState(!!imageSrc);
  const [hasError, setHasError] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("current");

  const showSkeleton = !imageSrc || isLoading || hasError;

  return (
    <div className="flex w-full flex-col gap-4 col-span-6">
      <Link
        href={`/projects/${project.id}` as Route}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex w-full flex-col bg-(--card-dark) p-4 pb-8 transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)">
          <Skeleton isLoading={showSkeleton} variant="on-dark" />
          {imageSrc && !hasError && (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover scale-110 transition-all duration-700 ease-out group-hover:scale-104 group-hover:blur-sm"
              sizes="(min-width: 1024px) 50vw, 100vw"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          )}
        </div>
        <div className="mt-8 flex justify-between items-start text-(--foreground)">
          <h3 className="text-4xl font-medium tracking-tight leading-none">
            {project.title}
          </h3>
          <div className="flex flex-col items-end gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-(--neutral) uppercase tracking-wider leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(ProjectCard);




