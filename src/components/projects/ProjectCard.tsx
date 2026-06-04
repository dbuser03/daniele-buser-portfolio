"use client";

import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";

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
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex w-full flex-col bg-(--background) p-4 pb-20 transition-all duration-300 ease-out"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="aspect-4/3 w-full bg-(--neutral-dark)"></div>
      </div>
    </div>
  );
}
