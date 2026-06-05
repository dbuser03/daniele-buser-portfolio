"use client";

import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import Skeleton from "@/components/ui/Skeleton";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "default",
    {
      onEnter: {
        size: CURSOR_SIZE.md,
        color: CSS_VARIABLES.accent,
      },
    },
  );

  return (
    <div className="flex w-full flex-col gap-4 lg:col-span-6">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex w-full flex-col bg-(--background) p-4 pb-8 transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)">
          <Skeleton isLoading variant="on-dark" />
        </div>
        <div className="mt-8 flex justify-between items-start text-(--foreground)">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl leading-none">
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
      </a>
    </div>
  );
}



