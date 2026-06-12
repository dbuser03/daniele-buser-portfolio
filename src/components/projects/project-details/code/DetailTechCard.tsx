"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import type { Project } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { cn } from "@/utils/cn";
import DetailCodeCard from "./DetailCodeCard";

interface DetailTechCardProps {
  project: Project;
  className?: string;
}

export default function DetailTechCard({
  project,
  className,
}: DetailTechCardProps) {
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const techCursor = useCursorInteraction("interactive");

  return (
    <DetailCodeCard
      label="Technologies"
      description={
        project.codeTechnologiesDescription ||
        "Mostly pnpm install and good intentions."
      }
      className={className}
    >
      <div className="text-section font-normal text-foreground">
        {(() => {
          const sentence = project.codeTechnologiesText?.[0] || "";
          const tokens = project.codeTechnologiesTokens || [];
          if (tokens.length > 0) {
            const escapeRegExp = (str: string) =>
              str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(
              `(${tokens.map((t) => escapeRegExp(t.text)).join("|")})`,
              "g",
            );
            const parts = sentence.split(regex);
            return (
              <p>
                {parts.map((part, idx) => {
                  const matchingToken = tokens.find((t) => t.text === part);
                  const isHovered = hoveredKeyword === matchingToken?.id;
                  const hasHovered = hoveredKeyword !== null;
                  const colorClass = hasHovered
                    ? isHovered
                      ? "text-foreground"
                      : "text-neutral"
                    : "text-foreground";

                  if (matchingToken) {
                    return (
                      <Link
                        key={idx}
                        href={(matchingToken.href || "#") as Route}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => {
                          setHoveredKeyword(matchingToken.id || null);
                          techCursor.handleMouseEnter();
                        }}
                        onMouseLeave={() => {
                          setHoveredKeyword(null);
                          techCursor.handleMouseLeave();
                        }}
                        className={cn(
                          "cursor-none transition-colors duration-200",
                          colorClass,
                        )}
                      >
                        {part}
                        <span className="sr-only"> (opens in new tab)</span>
                      </Link>
                    );
                  }

                  return (
                    <span
                      key={idx}
                      className={cn(
                        "transition-colors duration-200",
                        colorClass,
                      )}
                    >
                      {part}
                    </span>
                  );
                })}
              </p>
            );
          }

          return (
            <div className="flex flex-col gap-4">
              {project.codeTechnologiesText?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          );
        })()}
      </div>
    </DetailCodeCard>
  );
}
