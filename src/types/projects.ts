import { PROJECT_TAGS } from "@/constants/projects";

export type ProjectTag = (typeof PROJECT_TAGS)[keyof typeof PROJECT_TAGS];
export type ProjectTags = [ProjectTag, ProjectTag, ProjectTag];

export interface Project {
  id: string;
  slug: string;
  title: string;
  image: string;
  tags: ProjectTags;
  year: number;
  description: string;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isHighlighted?: boolean; // Unified hover and active state
  isNarrow?: boolean;
  registerRef?: (id: string, node: HTMLDivElement | null) => void;
}

export interface IndexItemProps {
  project: Project;
  index: number;
}

export interface ProjectOverlayProps {
  show: boolean;
}

export interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface ProjectsProps {
  project: Project;
}
