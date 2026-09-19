"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Route } from "next";
import type { Project, TechToken } from "@/types/projects";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { cn } from "@/utils/cn";
import DetailCodeCard from "./DetailCodeCard";

interface DetailTechCardProps {
  project: Project;
  className?: string;
}

interface ParsedSegment {
  text: string;
  token?: TechToken;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function DetailTechCard({
  project,
  className,
}: DetailTechCardProps) {
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const techCursor = useCursorInteraction("interactive");

  const parsedSegments = useMemo<ParsedSegment[]>(() => {
    const sentence = project.codeTechnologiesText?.[0] || "";
    const tokens = project.codeTechnologiesTokens || [];
    if (!sentence || tokens.length === 0) return [];

    const tokenMap = new Map<string, TechToken>();
    tokens.forEach((t) => tokenMap.set(t.text, t));

    const pattern = new RegExp(
      `(${tokens.map((t) => escapeRegExp(t.text)).join("|")})`,
      "g",
    );

    return sentence.split(pattern).map((part) => ({
      text: part,
      token: tokenMap.get(part),
    }));
  }, [project.codeTechnologiesText, project.codeTechnologiesTokens]);

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
        {parsedSegments.length > 0 ? (
          <p>
            {parsedSegments.map((segment, idx) => {
              const isHovered = hoveredKeyword === segment.token?.id;
              const hasHovered = hoveredKeyword !== null;
              const colorClass = hasHovered
                ? isHovered
                  ? "text-foreground"
                  : "text-neutral"
                : "text-foreground";

              if (segment.token) {
                return (
                  <Link
                    key={idx}
                    href={(segment.token.href || "#") as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                      setHoveredKeyword(segment.token?.id || null);
                      techCursor.handleMouseEnter();
                    }}
                    onMouseLeave={() => {
                      setHoveredKeyword(null);
                      techCursor.handleMouseLeave();
                    }}
                    className={cn(
                      "transition-colors duration-200",
                      colorClass,
                    )}
                  >
                    {segment.text}
                    <span className="sr-only"> (opens in new tab)</span>
                  </Link>
                );
              }

              return (
                <span
                  key={idx}
                  className={cn("transition-colors duration-200", colorClass)}
                >
                  {segment.text}
                </span>
              );
            })}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {project.codeTechnologiesText?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </DetailCodeCard>
  );
}
