"use client";

import { type ComponentType, useState } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "motion/react";
import {
  motionTokens,
  entranceVariants,
  listVariants,
  fadeVariants,
} from "@/constants/animations";
import Skeleton from "@/components/ui/Skeleton";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import dynamic from "next/dynamic";
import DetailPaletteCard from "@/components/projects/project-details/design/DetailPaletteCard";
import DetailTypefacesCard from "@/components/projects/project-details/design/DetailTypefacesCard";
import DetailCustomComponentsCard from "@/components/projects/project-details/design/DetailCustomComponentsCard";
import DetailCoolShitCard from "@/components/projects/project-details/design/DetailCoolShitCard";
import DetailTechCard from "@/components/projects/project-details/code/DetailTechCard";
import DetailArchitectureCard from "@/components/projects/project-details/code/DetailArchitectureCard";
import DetailImplementationCard from "@/components/projects/project-details/code/DetailImplementationCard";

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

interface ProjectDetailsClientProps {
  project: Project;
  implementationsCode?: Record<string, string>;
  fallbackCode?: string;
}

export default function ProjectDetailsClient({
  project,
  implementationsCode = {},
  fallbackCode = "",
}: ProjectDetailsClientProps) {
  const CustomComponents = UI_MAP[project.id];
  const CoolShitComponent = project.hasCoolShit
    ? COOL_SHIT_MAP[project.id]
    : null;

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48 text-(--background)">
      <div className="my-auto flex w-full flex-col gap-20">
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

        <div className="flex flex-col gap-10">
          <motion.div
            variants={entranceVariants(0.65, 20, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
            className="relative aspect-video w-full overflow-hidden bg-(--neutral-dark)"
          >
            <Skeleton isLoading={true} variant="on-light" />
          </motion.div>

          <motion.div
            className="grid grid-cols-12 gap-4"
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
                Obsess
              </SectionLabel>
            </div>

            <div className="col-span-10">
              <motion.div
                className="text-section grid grid-cols-2 gap-8 font-normal text-(--background)"
                initial="initial"
                whileInView="visible"
                viewport={{ once: true }}
                variants={entranceVariants(
                  0.15,
                  20,
                  motionTokens.duration.smooth,
                )}
              >
                <p className="break-inside-avoid">{project.descriptionCol1}</p>
                <p className="break-inside-avoid">{project.descriptionCol2}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex w-full flex-col">
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
                  <DetailCoolShitCard CoolShitComponent={CoolShitComponent} />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex w-full flex-col">
          <SectionLabel
            as={motion.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
          >
            Code
          </SectionLabel>

          <motion.div
            className="mt-3 flex w-full flex-col bg-(--background) p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
          >
            <motion.div
              className="grid grid-cols-12 gap-4"
              variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
            >
              <motion.div
                className="col-span-4"
                variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
              >
                <DetailTechCard project={project} />
              </motion.div>
              <motion.div
                className="col-span-4"
                variants={entranceVariants(0.3, 20, motionTokens.duration.smooth)}
              >
                <DetailArchitectureCard
                  project={project}
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                />
              </motion.div>
              <motion.div
                className="col-span-4"
                variants={entranceVariants(0.45, 20, motionTokens.duration.smooth)}
              >
                <DetailImplementationCard
                  selectedFile={selectedFile}
                  implementationsCode={implementationsCode}
                  fallbackCode={fallbackCode}
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="mt-4">
            <motion.div
              className="relative aspect-video w-full overflow-hidden bg-(--neutral-dark)"
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
            >
              <Skeleton isLoading={true} variant="on-light" />
            </motion.div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <SectionLabel
            as={motion.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
          >
            Ship
          </SectionLabel>

          <motion.div
            className="mt-3 flex flex-col gap-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
          >
            <div className="grid grid-cols-12 gap-4">
              <motion.div
                className="relative col-span-6 aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)"
                variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
              >
                <ImageWithSkeleton
                  src={project.shipImage1}
                  alt=""
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  skeletonVariant="on-light"
                />
              </motion.div>
              <motion.div
                className="relative col-span-6 aspect-4/3 w-full overflow-hidden bg-(--neutral-dark)"
                variants={entranceVariants(0.3, 20, motionTokens.duration.smooth)}
              >
                <ImageWithSkeleton
                  src={project.shipImage2}
                  alt=""
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  skeletonVariant="on-light"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <motion.p
                className="text-section col-span-5 font-normal text-(--background)"
                variants={entranceVariants(0.15, 20, motionTokens.duration.smooth)}
              >
                {project.shipText1}
              </motion.p>
              <motion.p
                className="text-section col-span-5 col-start-7 font-normal text-(--background)"
                variants={entranceVariants(0.3, 20, motionTokens.duration.smooth)}
              >
                {project.shipText2}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
