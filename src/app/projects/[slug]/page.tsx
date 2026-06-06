import { Metadata } from "next";
import { PROJECTS } from "@/constants/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import AboutLayout from "@/components/about/AboutLayout";
import AboutContacts from "@/components/about/AboutContacts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Daniele Buser — Creative Developer`,
      description: project.description,
      ...(project.cardImage ? { images: [{ url: project.cardImage }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex w-full flex-1 flex-col justify-start gap-0 bg-(--foreground) px-4 focus:outline-none"
      aria-label={`${project.title} project page main content`}
    >
      <AboutLayout contacts={<AboutContacts />}>
        <ProjectDetailClient project={project} />
      </AboutLayout>
    </main>
  );
}
