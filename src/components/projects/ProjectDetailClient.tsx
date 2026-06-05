"use client";

import { useEffect } from "react";
import { Project } from "@/types/projects";
import HeroTitle from "@/components/ui/HeroTitle";
import { motion } from "motion/react";
import Skeleton from "@/components/ui/Skeleton";
import { Download } from "lucide-react";
import { EarthGlobeAscii } from "@/components/projects/leonardo-UI/EarthGlobeAscii";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { LeonardoUI } from "@/components/projects/leonardo-UI/LeonardoUI";

const COLOR_DETAILS: Record<string, { rgb: string; pantone: string }> = {
  "#0A0A0A": { rgb: "10 10 10", pantone: "Black 6 C" },
  "#262626": { rgb: "38 38 38", pantone: "426 C" },
  "#737373": { rgb: "115 115 115", pantone: "424 C" },
  "#E5E5E5": { rgb: "229 229 229", pantone: "Cool Gray 1 C" },
  "#F7F7F7": { rgb: "247 247 247", pantone: "7541 C" },
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");
  const { cursorSize } = useCursorContext();

  const handleGlobeDragStart = () => cursorSize.set(CURSOR_SIZE.xs);
  const handleGlobeDragEnd = () => cursorSize.set(CURSOR_SIZE.sm);

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 pb-48 text-(--background)">
      <div className="my-auto flex w-full flex-col">
        <div className="flex flex-col">
          <HeroTitle
            id="project-detail-title"
            text={project.title}
            className="relative z-10 -ml-1 text-[2rem] leading-none text-(--background) sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem]"
            ariaLabel={`${project.title} - Project heading`}
            once={true}
            trigger="mount"
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
          <Skeleton isLoading={true} variant="on-light" />
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 xl:grid-cols-12">
          <div className="flex flex-col xl:col-span-2">
            <h2 className="text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm">
              Obsession
            </h2>
          </div>

          <div className="xl:col-span-10">
            <div className="columns-1 gap-4 text-xl leading-tight font-normal text-(--background) sm:text-2xl md:columns-2 md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {(project.longDescription || project.description)
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-4 break-inside-avoid md:mb-0">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-28 flex w-full flex-col">
          <h2 className="text-xs tracking-wider text-(--neutral-dark) uppercase md:text-sm">
            Design
          </h2>

          <div className="mt-4 flex w-full flex-col bg-(--background) p-4">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative flex aspect-4/3 w-full flex-col justify-between bg-(--card-dark) p-4">
                <div>
                  <span className="text-xs tracking-wider text-(--neutral) uppercase select-none md:text-sm">
                    Palette
                  </span>
                </div>

                <div className="mt-8 flex w-full gap-4 pb-2">
                  {project.brandingColors?.map((color) => {
                    const details = COLOR_DETAILS[color.toUpperCase()] || {
                      rgb: "",
                      pantone: "",
                    };
                    return (
                      <div key={color} className="flex flex-1 flex-col">
                        <div
                          className="h-42 w-full border border-(--foreground)/10 lg:h-50 xl:h-58 2xl:h-66"
                          style={{ backgroundColor: color }}
                        />
                        <div
                          className="mt-8 flex flex-col gap-y-1.5 text-xs leading-none font-normal text-(--foreground) uppercase select-none md:text-sm"
                          style={{
                            fontFamily: "var(--font-neue-haas), sans-serif",
                          }}
                        >
                          <span>{color}</span>
                          <span className="text-(--neutral)">
                            RGB {details.rgb}
                          </span>
                          <span className="text-(--neutral)">
                            PMS {details.pantone}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden bg-(--card-dark) p-4">
                <div>
                  <span className="text-xs tracking-wider text-(--neutral) uppercase select-none md:text-sm">
                    Typeface
                  </span>
                </div>

                <div className="grid w-full grid-cols-2 items-end gap-4 pb-2 pl-2">
                  <div className="flex flex-col items-start justify-end">
                    <span
                      className="text-[10rem] leading-none font-normal text-(--neutral) select-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]"
                      style={{
                        fontFamily: "var(--font-pp-montreal), sans-serif",
                      }}
                    >
                      Aa
                    </span>
                    <span
                      className="-mt-3 text-xs font-normal tracking-wider text-(--neutral-dark) select-none md:-mt-5 md:text-sm"
                      style={{
                        fontFamily: "var(--font-neue-haas), sans-serif",
                      }}
                    >
                      sans
                    </span>
                    <span
                      className="mt-1 text-xl leading-[0.95] font-normal whitespace-nowrap text-(--foreground) select-none sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                      style={{
                        fontFamily: "var(--font-pp-montreal), sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      PP Neue Montreal
                    </span>
                    <div className="mt-8 flex flex-col gap-y-1.5 text-xs leading-none text-(--foreground) select-none md:text-sm">
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal), sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        Light 300
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal), sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        Regular 400
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Semibold 600
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-end">
                    <span
                      className="text-[10rem] leading-none font-normal text-(--neutral) select-none lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]"
                      style={{
                        fontFamily: "var(--font-pp-montreal-mono), monospace",
                      }}
                    >
                      Aa
                    </span>
                    <span
                      className="-mt-3 text-xs font-normal tracking-wider text-(--neutral-dark) select-none md:-mt-5 md:text-sm"
                      style={{
                        fontFamily: "var(--font-neue-haas), sans-serif",
                      }}
                    >
                      mono
                    </span>
                    <span
                      className="mt-1 text-xl leading-[0.95] font-normal whitespace-nowrap text-(--foreground) select-none sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                      style={{
                        fontFamily: "var(--font-pp-montreal-mono), monospace",
                        letterSpacing: "-0.05em",
                      }}
                    >
                      PP Neue Montreal Mono
                    </span>
                    <div className="mt-8 flex flex-col gap-y-1.5 text-xs leading-none text-(--foreground) select-none md:text-sm">
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal-mono), monospace",
                          fontWeight: 100,
                        }}
                      >
                        Thin 100
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal-mono), monospace",
                          fontWeight: 400,
                        }}
                      >
                        Book 400
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-pp-montreal-mono), monospace",
                          fontWeight: 700,
                        }}
                      >
                        Bold 700
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden bg-(--card-dark) p-4">
                <div>
                  <span className="text-xs tracking-wider text-(--neutral) uppercase select-none md:text-sm">
                    Components
                  </span>
                </div>

                <div className="mt-auto flex max-h-[calc(100%-40px)] w-full flex-col gap-4 overflow-y-auto pr-1 pb-2 text-left">
                  <LeonardoUI />
                </div>
              </div>

              <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-(--card-dark)">
                <span className="absolute top-4 left-4 z-10 text-xs tracking-wider text-(--neutral) uppercase select-none md:text-sm">
                  Cool S***t
                </span>
                <EarthGlobeAscii
                  onDragStart={handleGlobeDragStart}
                  onDragEnd={handleGlobeDragEnd}
                />
                <a
                  href="/projects/leonardo-berselli-portfolio/globe.zip"
                  download
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute right-4 bottom-4 z-10 text-(--neutral)"
                  aria-label="Download Globe component"
                >
                  <motion.span
                    animate={{ color: "var(--neutral)" }}
                    whileHover={{ color: "var(--foreground)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Download size={20} strokeWidth={1.5} />
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
