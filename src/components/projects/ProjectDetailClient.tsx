"use client";

import type { ComponentType } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "motion/react";
import { motionTokens, entranceVariants, listVariants, fadeVariants } from "@/constants/animations";
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
      import("@/packages/leonardo-berselli-portfolio/components/LeonardoUI").then(
        (m) => ({
          default: m.default,
        }),
      ),
    {
      loading: () => <Skeleton isLoading={true} variant="on-dark" />,
    },
  ),
};

const COOL_SHIT_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import("@/packages/leonardo-berselli-portfolio/components/EarthGlobeAscii").then(
        (m) => ({
          default: m.EarthGlobeAscii,
        }),
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
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48 text-(--background)">
      <div className="my-auto flex w-full flex-col">
        <div className="flex flex-col">
          <HeroTitleMount
            id="project-detail-title"
            className="text-display-md relative z-10 -ml-1 text-(--background)"
            ariaLabel={`${project.title} - Project heading`}
            showDecorativeDot={false}
          >
            {project.title}
          </HeroTitleMount>
          <motion.p
            variants={entranceVariants(0.5, 20, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
            className="text-section mt-3 font-normal tracking-tight text-(--neutral-dark)"
          >
            {project.year}
          </motion.p>
        </div>

          <motion.div
            variants={entranceVariants(0.65, 20, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
          className="relative mt-28 aspect-video w-full overflow-hidden bg-(--neutral-dark)"
        >
          {project.image ? (
            <DetailImage src={project.image} alt={project.title} />
          ) : (
            <Skeleton isLoading={true} variant="on-light" />
          )}
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-12 gap-4"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
        >
          <div className="col-span-2 flex flex-col">
            <SectionLabel
              as={motion.h2}
              variant="section-heading"
              variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
            >
              Obsession
            </SectionLabel>
          </div>

          <div className="col-span-10">
            <motion.div
              className="text-section grid grid-cols-2 gap-8 font-normal text-(--background)"
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
            >
              <p className="break-inside-avoid">{project.descriptionCol1}</p>
              <p className="break-inside-avoid">{project.descriptionCol2}</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-28 flex w-full flex-col">
          <SectionLabel
            as={motion.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
          >
            Design
          </SectionLabel>

          <motion.div
            className="mt-3 flex w-full flex-col bg-(--background) p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
          >
            <motion.div
              className="grid w-full grid-cols-2 gap-4"
              variants={listVariants(0.15, 0.08)}
            >
              <motion.div key="palette" variants={fadeVariants}>
                <DetailPaletteCard colors={project.brandingColors} />
              </motion.div>
              <motion.div key="typefaces" variants={fadeVariants}>
                <DetailTypefacesCard fonts={project.brandingFonts} />
              </motion.div>

              {project.hasCustomComponents && (
                <motion.div key="components" variants={fadeVariants}>
                  <DetailCustomComponentsCard
                    projectId={project.id}
                    CustomComponents={CustomComponents}
                  />
                </motion.div>
              )}

              {CoolShitComponent && (
                <motion.div key="cool-shit" variants={fadeVariants}>
                  <DetailCoolShitCard
                    CoolShitComponent={CoolShitComponent}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
