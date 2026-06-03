import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/components/ui/projects";
import { ProjectPageProps } from "@/types/projects";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }
  return <Project project={project} />;
}
