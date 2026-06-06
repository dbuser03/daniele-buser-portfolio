import type { Metadata } from "next";
import { projectsMetadata, projectsPageJsonLd } from "@/utils/metadata";
import ProjectsTitle from "@/components/projects/ProjectsTitle";
import ProjectsSection from "@/components/projects/ProjectsSection";
import AboutLayout from "@/components/about/AboutLayout";
import AboutContacts from "@/components/about/AboutContacts";

export const metadata: Metadata = projectsMetadata;

export default function Home() {
  const twoDigitYear = new Date().getFullYear().toString().slice(-2);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsPageJsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 flex-col bg-(--foreground) px-4 focus:outline-none"
        aria-label="Projects page main content"
      >
        <AboutLayout contacts={<AboutContacts />}>
          <section className="flex min-h-[65vh] w-full flex-col justify-center">
            <ProjectsTitle year={twoDigitYear} />
          </section>
          <ProjectsSection />
        </AboutLayout>
      </main>
    </>
  );
}
