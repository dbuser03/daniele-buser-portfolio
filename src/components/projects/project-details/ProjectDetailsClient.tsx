"use client";

import { type ComponentType, useState, useRef } from "react";
import type { Project } from "@/types/projects";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  m,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "motion/react";
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
import { ProjectInteractionWrapper } from "@/components/projects/project-details/ProjectInteractionWrapper";
const UI_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import("@case-studies/leonardo-berselli").then((m) => ({
        default: m.LeonardoUI,
      })),
    {
      loading: () => <Skeleton isLoading={true} variant="on-dark" />,
      ssr: false,
    },
  ),
};

const COOL_SHIT_MAP: Record<string, ComponentType> = {
  "leonardo-berselli-portfolio": dynamic(
    () =>
      import("@case-studies/leonardo-berselli").then((m) => ({
        default: m.EarthGlobeAscii,
      })),
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
  const videoSrc = project.video || project.cardVideo;

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relativeX * 50);
    mouseY.set(relativeY * 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const videoEntranceVariants: Variants = {
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.94,
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? "none" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: shouldReduceMotion ? 0.01 : motionTokens.delay.longer + 0.28,
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.19, 1, 0.22, 1] as const,
      },
    },
  };


  return (
    <div className="text-background relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48">
      <div className="my-auto flex w-full flex-col gap-20">
        <div className="flex flex-col">
          <HeroTitleMount
            id="project-detail-title"
            className="text-display-md text-background relative z-10 -ml-1"
            ariaLabel={`${project.title} - Project heading`}
            showDecorativeDot={false}
          >
            {project.title}
          </HeroTitleMount>
          <m.p
            variants={entranceVariants(
              motionTokens.delay.long,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
            initial="initial"
            animate="visible"
            className="text-section text-neutral-dark mt-3 font-normal"
          >
            {project.year}
          </m.p>
        </div>

        <div className="flex flex-col gap-4">
          <m.div
            ref={heroContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={entranceVariants(
              motionTokens.delay.longer,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
            initial="initial"
            animate="visible"
            className="border-foreground/10 relative aspect-16/10 w-full overflow-hidden border select-none sm:aspect-21/9"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                draggable={false}
                className="pointer-events-none scale-105 object-cover blur-md brightness-60 select-none"
                sizes="100vw"
                priority
              />
            ) : null}
            <div className="bg-background/25 pointer-events-none absolute inset-0 select-none" />

            {videoSrc ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-8">
                <m.div
                  style={{ x: smoothX, y: smoothY }}
                  className="flex size-full items-center justify-center"
                >
                  <m.div
                    variants={videoEntranceVariants}
                    initial="initial"
                    animate="visible"
                    className="border-foreground/15 bg-background relative aspect-2304/1302 h-[88%] max-w-[94%] overflow-hidden rounded-xs border shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6),0_6px_16px_-4px_rgba(0,0,0,0.4)]"
                  >
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="size-full object-cover"
                      aria-label={`${project.title} Showcase Video`}
                    />
                  </m.div>
                </m.div>
              </div>
            ) : project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} Hero Image`}
                fill
                className="scale-[1.01] object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <Skeleton
                isLoading={true}
                variant="on-light"
                className="size-full"
              />
            )}
          </m.div>

          <m.div
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.short,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            <m.div
              className="grid grid-cols-12 gap-4"
              variants={listVariants(0, motionTokens.stagger.base)}
            >
              <m.div className="col-span-4" variants={itemVariants}>
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  {project.verticalImage1 ? (
                    <Image
                      src={project.verticalImage1}
                      alt={`${project.title} Showcase 1`}
                      fill
                      className="scale-[1.01] object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <Skeleton
                      isLoading={true}
                      variant="on-light"
                      className="size-full"
                    />
                  )}
                </div>
              </m.div>
              <m.div className="col-span-4" variants={itemVariants}>
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  {project.verticalImage2 ? (
                    <Image
                      src={project.verticalImage2}
                      alt={`${project.title} Showcase 2`}
                      fill
                      className="scale-[1.01] object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <Skeleton
                      isLoading={true}
                      variant="on-light"
                      className="size-full"
                    />
                  )}
                </div>
              </m.div>
              <m.div className="col-span-4" variants={itemVariants}>
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  {project.verticalImage3 ? (
                    <Image
                      src={project.verticalImage3}
                      alt={`${project.title} Showcase 3`}
                      fill
                      className="scale-[1.01] object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <Skeleton
                      isLoading={true}
                      variant="on-light"
                      className="size-full"
                    />
                  )}
                </div>
              </m.div>
            </m.div>
          </m.div>

          <m.div
            className="mt-6 grid grid-cols-12 gap-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.none,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            <div className="col-span-2 flex flex-col">
              <SectionLabel
                as={m.h2}
                variant="section-heading"
                variants={entranceVariants(
                  motionTokens.delay.none,
                  motionTokens.distance.base,
                  motionTokens.duration.smooth,
                )}
              >
                Obsess
              </SectionLabel>
            </div>

            <div className="col-span-10">
              <m.div
                className="text-section text-background grid grid-cols-2 gap-8 font-normal"
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
            variants={entranceVariants(
              motionTokens.delay.none,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            Design
          </SectionLabel>

          <m.div
            className="bg-background mt-3 flex w-full flex-col p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.short,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            <m.div
              className="grid w-full grid-cols-2 gap-4"
              variants={listVariants(0.15, motionTokens.stagger.base)}
            >
              <m.div
                key="palette"
                className="col-span-2 lg:col-span-1"
                variants={itemVariants}
              >
                <DetailPaletteCard colors={project.brandingColors} />
              </m.div>
              <m.div
                key="typefaces"
                className="col-span-2 lg:col-span-1"
                variants={itemVariants}
              >
                <DetailTypefacesCard fonts={project.brandingFonts} />
              </m.div>

              {project.hasCustomComponents && (
                <m.div key="components" variants={itemVariants}>
                  <ProjectInteractionWrapper>
                    <DetailCustomComponentsCard
                      projectId={project.id}
                      CustomComponents={CustomComponents}
                    />
                  </ProjectInteractionWrapper>
                </m.div>
              )}

              {CoolShitComponent && (
                <m.div key="cool-shit" variants={itemVariants}>
                  <ProjectInteractionWrapper>
                    <DetailCoolShitCard CoolShitComponent={CoolShitComponent} />
                  </ProjectInteractionWrapper>
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
            variants={entranceVariants(
              motionTokens.delay.none,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            Code
          </SectionLabel>

          <m.div
            className="bg-background mt-3 flex w-full flex-col p-4"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.short,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
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
        </div>

        <m.div
          className="grid grid-cols-12 gap-4"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          variants={entranceVariants(
            motionTokens.delay.none,
            motionTokens.distance.base,
            motionTokens.duration.smooth,
          )}
        >
          <div className="col-span-12 flex flex-col lg:col-span-2">
            <SectionLabel
              as={m.h2}
              variant="section-heading"
              variants={entranceVariants(
                motionTokens.delay.none,
                motionTokens.distance.base,
                motionTokens.duration.smooth,
              )}
            >
              Ship
            </SectionLabel>
          </div>

          <div className="col-span-12 lg:col-span-10">
            <m.div
              className="mt-3 flex flex-col gap-10"
              variants={listVariants(0.15, motionTokens.stagger.base)}
            >
              <>
                <div className="grid grid-cols-12 gap-4">
                  <m.div className="col-span-6" variants={itemVariants}>
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      {project.shipImage1 ? (
                        <Image
                          src={project.shipImage1}
                          alt={`${project.title} Preview 1`}
                          fill
                          className="scale-[1.01] object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <Skeleton
                          isLoading={true}
                          variant="on-light"
                          className="size-full"
                        />
                      )}
                    </div>
                  </m.div>
                  <m.div className="col-span-6" variants={itemVariants}>
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      {project.shipImage2 ? (
                        <Image
                          src={project.shipImage2}
                          alt={`${project.title} Preview 2`}
                          fill
                          className="scale-[1.01] object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <Skeleton
                          isLoading={true}
                          variant="on-light"
                          className="size-full"
                        />
                      )}
                    </div>
                  </m.div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <m.p
                    className="text-section text-background col-span-5 font-normal"
                    variants={itemVariants}
                  >
                    {project.shipText1}
                  </m.p>
                  <m.p
                    className="text-section text-background col-span-5 col-start-7 font-normal"
                    variants={itemVariants}
                  >
                    {project.shipText2}
                  </m.p>
                </div>
              </>
            </m.div>
          </div>
        </m.div>
      </div>
    </div>
  );
}
