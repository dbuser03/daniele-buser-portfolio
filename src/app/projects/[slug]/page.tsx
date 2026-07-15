import { Metadata } from "next";
import { PROJECTS } from "@/constants/projects";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "@/components/projects/project-details/ProjectDetailsClient";
import AboutLayout from "@/components/about/AboutLayout";
import AboutContacts from "@/components/about/AboutContacts";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
    return notFound();
  }

  const implementationsCode: Record<string, string> = {};
  if (project.showcaseFiles) {
    for (const [treePath, pkgRelativePath] of Object.entries(
      project.showcaseFiles,
    )) {
      try {
        const fullPath = path.join(
          process.cwd(),
          "packages",
          project.id,
          pkgRelativePath,
        );
        const code = await fs.promises.readFile(fullPath, "utf-8");
        implementationsCode[treePath] = code;
      } catch (err) {
        console.error(
          `Failed to read showcase file ${pkgRelativePath} for project ${project.id}:`,
          err,
        );
      }
    }
  }

  let fallbackCode = "";
  try {
    const fallbackPath = path.join(
      process.cwd(),
      "src/components/ui/CodePlaceholder.tsx",
    );
    fallbackCode = await fs.promises.readFile(fallbackPath, "utf-8");
  } catch (err) {
    console.error("Failed to read fallback code:", err);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex w-full flex-1 flex-col justify-start gap-0 bg-foreground px-4 focus:outline-none"
      aria-label={`${project.title} project page main content`}
    >
      <AboutLayout contacts={project.id === "non-ce-budget-pt2" ? null : <AboutContacts />}>
        <ProjectDetailsClient
          project={project}
          implementationsCode={implementationsCode}
          fallbackCode={fallbackCode}
        />
      </AboutLayout>
    </main>
  );
}
