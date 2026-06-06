"use client";

import type { ComponentType } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleAnimated } from "@/components/ui/HeroTitle";
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
      import(
        "@/components/projects/leonardo-berselli-portfolio/leonardo-berselli-portfolio-UI"
      ),
    {
      loading: () => <Skeleton isLoading={true} variant="on-dark" />,
    },
  ),
};

const COOL_SHIT_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import(
        "@/components/projects/leonardo-berselli-portfolio/components/EarthGlobeAscii"
      ).then((m) => ({ default: m.EarthGlobeAscii })),
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
             className="relative z-10 -ml-1 text-[2rem] leading-none text-(--background) sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem]"
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
            className="mt-2 text-2xl leading-none font-normal tracking-tight text-(--neutral-dark) sm:mt-3 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl"
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
          className="relative mt-20 aspect-video w-full overflow-hidden bg-(--neutral-dark) md:mt-28"
        >
          {project.image ? (
            <DetailImage src={project.image} alt={project.title} />
          ) : (
            <Skeleton isLoading={true} variant="on-light" />
          )}
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 xl:grid-cols-12">
          <div className="flex flex-col xl:col-span-2">
            <h2 className="text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm">
              Obsession
            </h2>
          </div>

          <div className="xl:col-span-10">
            <div className="grid grid-cols-1 gap-8 text-xl leading-tight font-normal text-(--background) sm:text-2xl md:grid-cols-2 md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl">
              <p className="break-inside-avoid">{project.descriptionCol1}</p>
              <p className="break-inside-avoid">{project.descriptionCol2}</p>
            </div>
          </div>
        </div>

        <div className="mt-28 flex w-full flex-col">
          <h2 className="text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm">
            Design
          </h2>

          <div className="mt-4 flex w-full flex-col bg-(--background) p-4">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
