"use client";

import { useState } from "react";
import type { Project } from "@/types/projects";
import DetailCodeCard from "./DetailCodeCard";
import ArchitectureTree from "./ArchitectureTree";

interface DetailArchitectureCardProps {
  project: Project;
  selectedFile: string | null;
  onFileSelect: (path: string | null) => void;
  className?: string;
}

export default function DetailArchitectureCard({
  project,
  selectedFile,
  onFileSelect,
  className,
}: DetailArchitectureCardProps) {
  const [hoveredArchPath, setHoveredArchPath] = useState<string | null>(null);

  const archDescription = hoveredArchPath
    ? (project.architectureDescriptions?.[hoveredArchPath] ??
      "Click or hover on a folder to explore the project structure.")
    : "Click or hover on a folder to explore the project structure.";

  return (
    <DetailCodeCard
      label="Architecture"
      description={archDescription}
      className={className}
    >
      <ArchitectureTree
        selectedFile={selectedFile}
        tree={project.architectureTree}
        showcaseFiles={project.showcaseFiles}
        onHover={setHoveredArchPath}
        onFileSelect={onFileSelect}
      />
    </DetailCodeCard>
  );
}
