"use client";

import { type ComponentType, useState } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import SectionLabel from "@/components/ui/SectionLabel";
import { m } from "motion/react";
import { motionTokens, useAnimations } from "@/utils/motion";
import Skeleton from "@/components/ui/Skeleton";
import Image from "next/image";
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
      ssr: false,
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
      ssr: false,
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
  const { entranceVariants, listVariants, itemVariants } = useAnimations();

  const CustomComponents = UI_MAP[project.id];
  const CoolShitComponent = project.hasCoolShit
    ? COOL_SHIT_MAP[project.id]
    : null;

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48 text-background">
      <div className="my-auto flex w-full flex-col gap-20">
        <div className="flex flex-col">
          <HeroTitleMount
            id="project-detail-title"
            className="text-display-md relative z-10 -ml-1 text-background"
            ariaLabel={`${project.title} - Project heading`}
            showDecorativeDot={false}
          >
            {project.title}
          </HeroTitleMount>
          <m.p
            variants={entranceVariants(motionTokens.delay.long, motionTokens.distance.base, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
            className="text-section mt-3 font-normal text-neutral-dark"
          >
            {project.year}
          </m.p>
        </div>

        <div className="flex flex-col gap-10">
          <m.div
            variants={entranceVariants(motionTokens.delay.longer, motionTokens.distance.base, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
            className="relative aspect-video w-full overflow-hidden bg-neutral-dark"
          >
            <Skeleton isLoading={true} variant="on-light" />
          </m.div>

          <m.div
            className="grid grid-cols-12 gap-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            <div className="col-span-2 flex flex-col">
              <SectionLabel
                as={m.h2}
                variant="section-heading"
                variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
              >
                Obsess
              </SectionLabel>
            </div>

            <div className="col-span-10">
              <m.div
                className="text-section grid grid-cols-2 gap-8 font-normal text-background"
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
              </m.div>
            </div>
          </m.div>
        </div>

        <div className="flex w-full flex-col">
          <SectionLabel
            as={m.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            Design
          </SectionLabel>

          <m.div
            className="mt-3 flex w-full flex-col bg-background p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.short, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            <m.div
              className="grid w-full grid-cols-2 gap-4"
              variants={listVariants(0.15, motionTokens.stagger.base)}
            >
              <m.div key="palette" variants={itemVariants}>
                <DetailPaletteCard colors={project.brandingColors} />
              </m.div>
              <m.div key="typefaces" variants={itemVariants}>
                <DetailTypefacesCard fonts={project.brandingFonts} />
              </m.div>

              {project.hasCustomComponents && (
                <m.div key="components" variants={itemVariants}>
                  <DetailCustomComponentsCard
                    projectId={project.id}
                    CustomComponents={CustomComponents}
                  />
                </m.div>
              )}

              {CoolShitComponent && (
                <m.div key="cool-shit" variants={itemVariants}>
                  <DetailCoolShitCard CoolShitComponent={CoolShitComponent} />
                </m.div>
              )}
            </m.div>
          </m.div>
        </div>

        <div className="flex w-full flex-col">
          <SectionLabel
            as={m.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            Code
          </SectionLabel>

          <m.div
            className="mt-3 flex w-full flex-col bg-background p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.short, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            <m.div
              className="grid grid-cols-12 gap-4"
              variants={listVariants(0, motionTokens.stagger.base)}
            >
              <m.div className="col-span-4" variants={itemVariants}>
                <DetailTechCard project={project} />
              </m.div>
              <m.div className="col-span-4" variants={itemVariants}>
                <DetailArchitectureCard
                  project={project}
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                />
              </m.div>
              <m.div className="col-span-4" variants={itemVariants}>
                <DetailImplementationCard
                  selectedFile={selectedFile}
                  implementationsCode={implementationsCode}
                  fallbackCode={fallbackCode}
                />
              </m.div>
            </m.div>
          </m.div>
          <div className="mt-4">
            <m.div
              className="relative aspect-video w-full overflow-hidden bg-neutral-dark"
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              variants={entranceVariants(
                0.15,
                20,
                motionTokens.duration.smooth,
              )}
            >
              <Skeleton isLoading={true} variant="on-light" />
            </m.div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <SectionLabel
            as={m.h2}
            variant="section-heading"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
          >
            Ship
          </SectionLabel>

          <m.div
            className="mt-3 flex flex-col gap-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants(0.15, motionTokens.stagger.base)}
          >
            <div className="grid grid-cols-12 gap-4">
              <m.div
                className="relative col-span-6 aspect-4/3 w-full overflow-hidden bg-neutral-dark"
                variants={itemVariants}
              >
                {project.shipImage1 ? (
                  <Image
                    src={project.shipImage1}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                  />
                ) : (
                  <Skeleton isLoading={true} variant="on-light" />
                )}
              </m.div>
              <m.div
                className="relative col-span-6 aspect-4/3 w-full overflow-hidden bg-neutral-dark"
                variants={itemVariants}
              >
                {project.shipImage2 ? (
                  <Image
                    src={project.shipImage2}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                  />
                ) : (
                  <Skeleton isLoading={true} variant="on-light" />
                )}
              </m.div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <m.p
                className="text-section col-span-5 font-normal text-background"
                variants={itemVariants}
              >
                {project.shipText1}
              </m.p>
              <m.p
                className="text-section col-span-5 col-start-7 font-normal text-background"
                variants={itemVariants}
              >
                {project.shipText2}
              </m.p>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
