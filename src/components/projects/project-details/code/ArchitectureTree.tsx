"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Folder,
  FolderOpen,
  File,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { motionTokens } from "@/utils/motion";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { cn } from "@/utils/cn";

interface TreeNode {
  name: string;
  type: "dir" | "file";
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    name: "app",
    type: "dir",
    children: [
      { name: "globals.css", type: "file" },
      { name: "icon.tsx", type: "file" },
      { name: "layout.tsx", type: "file" },
      { name: "page.tsx", type: "file" },
    ],
  },
  {
    name: "components",
    type: "dir",
    children: [
      {
        name: "layout",
        type: "dir",
        children: [
          { name: "index.ts", type: "file" },
          { name: "navigation-menu.tsx", type: "file" },
          { name: "system-diagnostics.tsx", type: "file" },
          { name: "theme-toggle.tsx", type: "file" },
        ],
      },
      {
        name: "providers",
        type: "dir",
        children: [
          { name: "index.ts", type: "file" },
          { name: "smooth-scroll.tsx", type: "file" },
          { name: "theme-provider.tsx", type: "file" },
        ],
      },
      {
        name: "sections",
        type: "dir",
        children: [
          {
            name: "skills",
            type: "dir",
            children: [
              { name: "skill-card.tsx", type: "file" },
              { name: "skill-tree.tsx", type: "file" },
            ],
          },
          { name: "index.ts", type: "file" },
          { name: "about-section.tsx", type: "file" },
          { name: "contact-section.tsx", type: "file" },
          { name: "projects-section.tsx", type: "file" },
          { name: "skills-section.tsx", type: "file" },
        ],
      },
      {
        name: "ui",
        type: "dir",
        children: [
          { name: "badge.tsx", type: "file" },
          { name: "button.tsx", type: "file" },
          { name: "card.tsx", type: "file" },
          { name: "scroll-area.tsx", type: "file" },
          { name: "switch.tsx", type: "file" },
          { name: "tabs.tsx", type: "file" },
          { name: "textarea.tsx", type: "file" },
        ],
      },
      {
        name: "visuals",
        type: "dir",
        children: [
          { name: "dotted-grid.tsx", type: "file" },
          { name: "earth-globe-ascii.tsx", type: "file" },
          { name: "earth-globe.tsx", type: "file" },
          { name: "physics-tags.tsx", type: "file" },
          { name: "preloader.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "constants",
    type: "dir",
    children: [
      { name: "animations.ts", type: "file" },
      { name: "contact.ts", type: "file" },
      { name: "index.ts", type: "file" },
      { name: "navigation.ts", type: "file" },
      { name: "visuals.ts", type: "file" },
    ],
  },
  {
    name: "hooks",
    type: "dir",
    children: [
      { name: "index.ts", type: "file" },
      { name: "use-contact-form.ts", type: "file" },
      { name: "use-copy-to-clipboard.ts", type: "file" },
      { name: "use-nav-typewriter.ts", type: "file" },
      { name: "use-preloader.ts", type: "file" },
      { name: "use-section-observer.ts", type: "file" },
      { name: "use-system-info.ts", type: "file" },
      { name: "use-typewriter.ts", type: "file" },
      { name: "use-uptime.ts", type: "file" },
    ],
  },
  {
    name: "lib",
    type: "dir",
    children: [{ name: "utils.ts", type: "file" }],
  },
  {
    name: "types",
    type: "dir",
    children: [{ name: "index.ts", type: "file" }],
  },
];

// --- COSTANTI DI LAYOUT ---
const DIR_ICON_SIZE = 14;
const FILE_ICON_SIZE = 10;
const INDENT_STEP = 16;
const CHEVRON_WIDTH = 12;
const GAP_WIDTH = 6;
const FILE_OFFSET = CHEVRON_WIDTH + GAP_WIDTH;

interface ArchitectureTreeProps {
  selectedFile?: string | null;
  tree?: TreeNode[];
  showcaseFiles?: Record<string, string>;
  onHover?: (path: string | null) => void;
  onFileSelect?: (path: string | null) => void;
}

export default function ArchitectureTree({
  selectedFile,
  tree,
  showcaseFiles,
  onHover,
  onFileSelect,
}: ArchitectureTreeProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const hoveredRef = useRef<string | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const onHoverRef = useRef(onHover);
  useEffect(() => {
    onHoverRef.current = onHover;
  }, [onHover]);

  const rootCursor = useCursorInteraction("interactive");

  useEffect(() => {
    if (selectedFile) {
      const parts = selectedFile.split("/");
      const pathsToExpand: string[] = [];
      let current = "";
      for (let i = 0; i < parts.length - 1; i++) {
        current = current ? `${current}/${parts[i]}` : parts[i];
        pathsToExpand.push(current);
      }
      if (pathsToExpand.length > 0) {
        const frame = requestAnimationFrame(() => {
          setExpandedPaths((prev) => {
            const next = new Set(prev);
            pathsToExpand.forEach((p) => next.add(p));
            return next;
          });
        });
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    const root = rootRef.current;
    const scrollContainer = root?.closest(
      ".overflow-y-auto",
    ) as HTMLElement | null;
    if (!root || !scrollContainer) return;

    const update = () => {
      const pos = mousePosRef.current;
      if (!pos) return;

      const el = document
        .elementsFromPoint(pos.x, pos.y)
        .find((e) => e === root || root.contains(e)) as HTMLElement | undefined;

      if (!el) {
        if (hoveredRef.current !== null) {
          hoveredRef.current = null;
          onHoverRef.current?.(null);
        }
        return;
      }

      const target = el.closest("[data-path]");
      const path = target?.getAttribute("data-path") ?? null;
      if (path !== hoveredRef.current) {
        hoveredRef.current = path;
        onHoverRef.current?.(path);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (root.contains(e.target as Node)) update();
    };
    const onScroll = () => update();

    window.addEventListener("pointermove", onPointerMove);
    scrollContainer.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      scrollContainer.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleToggle = useCallback(
    (path: string) => {
      const isClosing = expandedPaths.has(path);
      setExpandedPaths((prev) => {
        const next = new Set(prev);
        if (isClosing) {
          next.delete(path);
        } else {
          next.add(path);
        }
        return next;
      });

      if (isClosing && selectedFile && selectedFile.startsWith(path + "/")) {
        onFileSelect?.(null);
      }
    },
    [expandedPaths, selectedFile, onFileSelect],
  );

  return (
    <div
      ref={rootRef}
      className="w-full select-none"
      onMouseLeave={() => {
        hoveredRef.current = null;
        onHover?.(null);
      }}
    >
      <div className="text-sm">
        <div className="sticky top-0 z-10 bg-(--card-dark)">
          <button
            onClick={() => {
              setExpandedPaths(new Set());
              onFileSelect?.(null);
            }}
            onMouseEnter={rootCursor.handleMouseEnter}
            onMouseLeave={rootCursor.handleMouseLeave}
            className="flex w-full items-center gap-1.5 py-0.5 text-left"
          >
            <FolderOpen
              size={DIR_ICON_SIZE}
              className="shrink-0 text-(--neutral)"
            />
            <span className="text-sm font-normal text-(--foreground)">
              leonardo-berselli-portfolio/
            </span>
          </button>
        </div>
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-0 border-l border-(--neutral)/30"
            style={{ left: DIR_ICON_SIZE / 2 }}
          />
          <div className="flex flex-col">
            {(tree || TREE).map((node) => (
              <TreeBranch
                key={node.name}
                node={node}
                depth={1}
                parentPath=""
                expandedPaths={expandedPaths}
                selectedFile={selectedFile}
                showcaseFiles={showcaseFiles}
                onToggle={handleToggle}
                onHover={onHover}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TreeBranchProps {
  node: TreeNode;
  depth: number;
  parentPath: string;
  expandedPaths: Set<string>;
  selectedFile?: string | null;
  showcaseFiles?: Record<string, string>;
  onToggle: (path: string) => void;
  onHover?: (path: string | null) => void;
  onFileSelect?: (path: string | null) => void;
}

function TreeBranch({
  node,
  depth,
  parentPath,
  expandedPaths,
  selectedFile,
  showcaseFiles,
  onToggle,
  onHover,
  onFileSelect,
}: TreeBranchProps) {
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isExpanded = expandedPaths.has(currentPath);
  const cursor = useCursorInteraction("interactive");
  const isClickable =
    node.type === "file" && showcaseFiles && currentPath in showcaseFiles;
  const fileCursor = useCursorInteraction("interactive");
  const isSelected = selectedFile === currentPath;

  const buttonPadding = depth * INDENT_STEP;
  const filePadding = buttonPadding + FILE_OFFSET;
  const lineOffset = buttonPadding + CHEVRON_WIDTH / 2;

  if (node.type === "file") {
    if (isClickable) {
      return (
        <m.button
          onClick={() => onFileSelect?.(currentPath)}
          onMouseEnter={fileCursor.handleMouseEnter}
          onMouseLeave={fileCursor.handleMouseLeave}
          initial="rest"
          whileHover="hover"
          animate={isSelected ? "hover" : "rest"}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-none py-0.5 text-left transition-colors duration-150",
            isSelected ? "bg-(--neutral)/15" : "",
          )}
          style={{ paddingLeft: filePadding }}
        >
          <File size={FILE_ICON_SIZE} className="shrink-0 text-(--accent)" />
          <m.span
            variants={{
              rest: { color: "var(--neutral)" },
              hover: { color: "var(--foreground)" },
            }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.standard,
            }}
            className="text-sm font-medium"
          >
            {node.name}
          </m.span>
        </m.button>
      );
    }
    return (
      <div
        className="flex items-center gap-1.5 py-0.5"
        style={{ paddingLeft: filePadding }}
      >
        <File size={FILE_ICON_SIZE} className="shrink-0 text-(--neutral)" />
        <span className="text-sm text-(--neutral)">{node.name}</span>
      </div>
    );
  }

  return (
    <div data-path={currentPath}>
      <button
        onClick={() => onToggle(currentPath)}
        onMouseEnter={cursor.handleMouseEnter}
        onMouseLeave={cursor.handleMouseLeave}
        className="flex w-full items-center gap-1.5 py-0.5 text-left"
        style={{ paddingLeft: buttonPadding }}
      >
        {isExpanded ? (
          <ChevronDown
            size={CHEVRON_WIDTH}
            className="shrink-0 text-(--neutral)"
          />
        ) : (
          <ChevronRight
            size={CHEVRON_WIDTH}
            className="shrink-0 text-(--neutral)"
          />
        )}
        {isExpanded ? (
          <FolderOpen
            size={DIR_ICON_SIZE}
            className="shrink-0 text-(--neutral)"
          />
        ) : (
          <Folder size={DIR_ICON_SIZE} className="shrink-0 text-(--neutral)" />
        )}
        <span className="text-sm font-normal text-(--foreground)">
          {node.name}/
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && node.children && (
          <m.div
            key={currentPath}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.standard,
            }}
            className="overflow-hidden"
          >
            <div className="relative">
              <div
                className="absolute top-0 bottom-0 border-l border-(--neutral)/30"
                style={{ left: lineOffset }}
              />
              <div className="flex flex-col">
                {node.children.map((child) => (
                  <TreeBranch
                    key={child.name}
                    node={child}
                    depth={depth + 1}
                    parentPath={currentPath}
                    expandedPaths={expandedPaths}
                    selectedFile={selectedFile}
                    showcaseFiles={showcaseFiles}
                    onToggle={onToggle}
                    onHover={onHover}
                    onFileSelect={onFileSelect}
                  />
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
