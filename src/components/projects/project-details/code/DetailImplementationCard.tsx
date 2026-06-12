"use client";

import React from "react";
import { m, AnimatePresence } from "motion/react";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import DetailCodeCard from "./DetailCodeCard";

interface DetailImplementationCardProps {
  selectedFile: string | null;
  implementationsCode: Record<string, string>;
  fallbackCode: string;
  className?: string;
}

export default function DetailImplementationCard({
  selectedFile,
  implementationsCode,
  fallbackCode,
  className,
}: DetailImplementationCardProps) {
  const { scrollRef, handleMouseDown } = useDraggableScroll(selectedFile);

  const displayFile =
    selectedFile && implementationsCode[selectedFile]
      ? selectedFile
      : "CodePlaceholder.tsx";
  const impl =
    (selectedFile && implementationsCode[selectedFile]) || fallbackCode;
  const lines = impl ? impl.split("\n") : [];

  return (
    <DetailCodeCard
      label="Implementation"
      description={displayFile}
      className={className}
    >
      <AnimatePresence mode="wait">
        <m.div
          key={displayFile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex w-full"
        >
          {lines.length > 0 && (
            <>
              <div className="shrink-0 pr-2 text-right text-caption leading-tight text-neutral select-none">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="mr-2 border-l border-neutral/30" />
            </>
          )}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className="flex-1 scrollbar-none overflow-x-auto select-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <pre className="w-fit min-w-full text-caption leading-tight whitespace-pre text-neutral">
              {impl}
            </pre>
          </div>
        </m.div>
      </AnimatePresence>
    </DetailCodeCard>
  );
}
