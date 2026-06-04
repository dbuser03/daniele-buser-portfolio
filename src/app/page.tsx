import type { Metadata } from "next";
import { homeMetadata, homePageJsonLd } from "@/utils/metadata";
import ProjectsTitle from "@/components/projects/ProjectsTitle";
import ProjectsSection from "@/components/projects/ProjectsSection";
import AboutLayout from "@/components/about/AboutLayout";
import AboutContacts from "@/components/about/AboutContacts";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 flex-col bg-(--foreground) px-4 focus:outline-none"
        aria-label="Projects page main content"
      >
        <AboutLayout contacts={<AboutContacts />}>
          <section className="flex min-h-[65vh] w-full flex-col justify-center">
            <ProjectsTitle />
          </section>
          <ProjectsSection />
        </AboutLayout>
      </main>
    </>
  );
}
