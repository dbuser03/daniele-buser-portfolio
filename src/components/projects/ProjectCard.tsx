"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import SectionLabel from "@/components/ui/SectionLabel";
import { useAnimations } from "@/utils/motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Skeleton from "@/components/ui/Skeleton";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

function ProjectCard({
  project,
  className,
  priority = false,
}: ProjectCardProps) {
  const { itemVariants, imageHoverVariants } = useAnimations();

  const imageSrc = project.cardImage || project.image;
  const videoSrc = project.cardVideo || project.video;

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isHovered || isFocused;

  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "interactive",
    {
      onEnter: () => setIsHovered(true),
      onLeave: () => setIsHovered(false),
    },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relativeX * 72);
    mouseY.set(relativeY * 48);
  };

  const onMouseLeave = () => {
    handleMouseLeave();
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <m.div
      variants={itemVariants}
      className={cn("col-span-6 flex w-full flex-col gap-4", className)}
    >
      <Link
        ref={cardRef}
        href={`/projects/${project.id}` as Route}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="group bg-card-dark focus-visible:outline-foreground flex w-full flex-col p-4 pb-8 focus-visible:outline-2 focus-visible:outline-offset-4"
        aria-label={`Project card: ${project.title}`}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden select-none">
          <m.div
            className="pointer-events-none absolute inset-0 select-none"
            variants={imageHoverVariants}
            initial="initial"
            animate={isActive ? "hover" : "initial"}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                draggable={false}
                className="pointer-events-none scale-[1.01] object-cover select-none"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={priority}
              />
            ) : (
              <Skeleton
                isLoading={true}
                variant="on-light"
                className="size-full"
              />
            )}
          </m.div>

          {videoSrc ? (
            <>
              <div
                className={cn(
                  "bg-background/25 pointer-events-none absolute inset-0 transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0",
                )}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-2">
                <m.div
                  style={{ x: smoothX, y: smoothY }}
                  className="flex w-full items-center justify-center"
                >
                  <m.div
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.96,
                        y: 8,
                        filter: "blur(6px)",
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.4,
                          ease: [0.19, 1, 0.22, 1],
                        },
                      },
                    }}
                    className="border-foreground/15 bg-background relative aspect-2304/1302 w-[90%] overflow-hidden rounded-xs border shadow-[0_16px_32px_-8px_rgba(0,0,0,0.4),0_4px_10px_-2px_rgba(0,0,0,0.2)]"
                  >
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="size-full object-cover"
                      aria-hidden="true"
                    />
                  </m.div>
                </m.div>
              </div>
            </>
          ) : null}
        </div>
        <div className="text-foreground mt-8 flex items-start justify-between">
          <h3 className="text-section font-normal">{project.title}</h3>
          <div className="flex flex-col items-end gap-1">
            {project.tags.map((tag) => (
              <SectionLabel key={tag}>{tag}</SectionLabel>
            ))}
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default ProjectCard;
