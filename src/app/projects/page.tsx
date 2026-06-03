"use client";

import React from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectCard, ProjectIndex } from "@/components/ui/projects";
import { PROJECTS } from "@/data/projects";
import { CursorProvider } from "@/contexts/CursorContext";
import { DEFAULT_CURSOR_LABEL } from "@/constants/layout/cursor";
import { useSmoothCursor } from "@/hooks/layout/cursor/useSmoothCursor";
import { useProjects } from "@/hooks/projects/useProjects";
import Cursor from "@/components/layout/cursor/Cursor";

export default function Projects() {
  const {
    cursorPosition,
    smoothX,
    smoothY,
    cursorSize,
    isVisible,
    label,
    color,
    setColor,
    setLabel,
    showIcon,
    setShowIcon,
    iconType,
    setIconType,
  } = useSmoothCursor();

  const {
    highlightedId,
    setHighlightedId,
    gridRef,
    isNarrow,
    registerProjectRef,
  } = useProjects();

  return (
    <CursorProvider
      cursorSize={cursorSize}
      smoothX={smoothX}
      smoothY={smoothY}
      setColor={setColor}
      setLabel={setLabel}
      pageLabel={DEFAULT_CURSOR_LABEL}
      showIcon={showIcon}
      setShowIcon={setShowIcon}
      iconType={iconType}
      setIconType={setIconType}
    >
      <Cursor
        cursorPosition={cursorPosition}
        smoothX={smoothX}
        smoothY={smoothY}
        cursorSize={cursorSize}
        isVisible={isVisible}
        label={label}
        variant="light"
        color={color}
        showIcon={showIcon}
      />
      <div className="flex min-h-screen flex-col bg-[var(--foreground)]">
        <Header variant="light" />
        <main className="w-full flex-1 px-4 py-32">
          <div className="flex justify-between gap-16">
            <div
              ref={gridRef}
              className="grid max-w-[88rem] flex-1 grid-cols-1 gap-8 xl:grid-cols-2 2xl:max-w-[96rem]"
            >
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHighlighted={highlightedId === project.id}
                  isNarrow={isNarrow}
                  registerRef={registerProjectRef}
                  onHover={setHighlightedId}
                />
              ))}
            </div>
            <div className="hidden w-72 lg:block">
              <ProjectIndex
                onHover={setHighlightedId}
                highlightedId={highlightedId}
              />
            </div>
          </div>
        </main>
        <Footer variant="light" />
      </div>
    </CursorProvider>
  );
}
