"use client";

import type { ComponentType } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleAnimated } from "@/components/ui/HeroTitle";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "motion/react";
import Skeleton from "@/components/ui/Skeleton";
import dynamic from "next/dynamic";
import DetailImage from "@/components/projects/project-detail/DetailImage";
import DetailPaletteCard from "@/components/projects/project-detail/DetailPaletteCard";
import DetailTypefacesCard from "@/components/projects/project-detail/DetailTypefacesCard";
import DetailCustomComponentsCard from "@/components/projects/project-detail/DetailCustomComponentsCard";
import DetailCoolShitCard from "@/components/projects/project-detail/DetailCoolShitCard";

const UI_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import("@/components/projects/leonardo-berselli-portfolio/leonardo-berselli-portfolio-UI"),
    {
      loading: () => <Skeleton isLoading={true} variant="on-dark" />,
    },
  ),
};

const COOL_SHIT_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import("@/components/projects/leonardo-berselli-portfolio/portfolio/EarthGlobeAsciiWithCursor").then(
        (m) => ({ default: m.EarthGlobeAsciiWithCursor }),
      ),
    {
      loading: () => <Skeleton isLoading={true} variant="on-dark" />,
    },
  ),
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const CustomComponents = UI_MAP[project.id];
  const CoolShitComponent = project.hasCoolShit
    ? COOL_SHIT_MAP[project.id]
    : null;
  const coolShitName = project.coolShitName || "InteractiveDemo";

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48 text-(--background)">
      <div className="my-auto flex w-full flex-col">
        <div className="flex flex-col">
          <HeroTitleAnimated
            id="project-detail-title"
            text={project.title}
            className="text-display-md relative z-10 -ml-1 text-(--background)"
            ariaLabel={`${project.title} - Project heading`}
            showDot={false}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.7,
            }}
            className="text-section mt-3 font-normal tracking-tight text-(--neutral-dark)"
          >
            {project.year}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.95,
          }}
          className="relative mt-28 aspect-video w-full overflow-hidden bg-(--neutral-dark)"
        >
          {project.image ? (
            <DetailImage src={project.image} alt={project.title} />
          ) : (
            <Skeleton isLoading={true} variant="on-light" />
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-12 gap-4">
          <div className="col-span-2 flex flex-col">
            <SectionLabel as="h2" tone="dark">
              Obsession
            </SectionLabel>
          </div>

          <div className="col-span-10">
            <div className="text-section grid grid-cols-2 gap-8 font-normal text-(--background)">
              <p className="break-inside-avoid">{project.descriptionCol1}</p>
              <p className="break-inside-avoid">{project.descriptionCol2}</p>
            </div>
          </div>
        </div>

        <div className="mt-28 flex w-full flex-col">
          <SectionLabel as="h2" tone="dark">
            Design
          </SectionLabel>

          <div className="mt-3 flex w-full flex-col bg-(--background) p-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <DetailPaletteCard colors={project.brandingColors} />
              <DetailTypefacesCard fonts={project.brandingFonts} />

              {project.hasCustomComponents && (
                <DetailCustomComponentsCard
                  projectId={project.id}
                  CustomComponents={CustomComponents}
                />
              )}

              {CoolShitComponent && (
                <DetailCoolShitCard
                  CoolShitComponent={CoolShitComponent}
                  projectId={project.id}
                  coolShitName={coolShitName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
