"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { ProjectsProps } from "@/types/projects";
import { CursorProvider } from "@/contexts/CursorContext";
import { DEFAULT_CURSOR_LABEL } from "@/constants/layout/cursor";
import { useSmoothCursor } from "@/hooks/layout/cursor/useSmoothCursor";
import Cursor from "@/components/layout/cursor/Cursor";

export const Project: React.FC<ProjectsProps> = ({ project }) => {
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
      <main className="min-h-screen bg-[var(--foreground)]">
        <Header variant="light" />
        <div className="flex min-h-screen items-start justify-start px-4 pt-32">
          <div className="flex w-full items-start justify-between gap-32">
            <div className="flex flex-col gap-2">
              <h1 className="text-8xl leading-none text-[var(--background)]">
                {project.title}
              </h1>
              <h3 className="text-2xl text-[var(--neutral-dark)]">
                {project.year}
              </h3>
              <p className="pt-32 text-3xl leading-none text-[var(--background)]">
                {project.description}
              </p>
            </div>
            <div className="flex max-w-[60rem] min-w-[60rem] flex-1 flex-col gap-4 pb-32">
              <div className="flex gap-4">
                <div className="aspect-[3/4] flex-1 bg-[var(--neutral)]"></div>
                <div className="aspect-[3/4] flex-1 bg-[var(--neutral)]"></div>
              </div>
              <div className="aspect-[16/9] w-full bg-[var(--neutral)]"></div>
            </div>
          </div>
        </div>
        <Footer variant="light" />
      </main>
    </CursorProvider>
  );
};

export default Project;
