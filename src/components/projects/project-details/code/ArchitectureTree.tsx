"use client";

import { useArchitectureTree } from "@/hooks/useArchitectureTree";
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

import { ARCHITECTURE_TREE_CONSTANTS } from "@/constants/architecture";

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
  const { rootRef, expandedPaths, handleToggle, resetPaths, handleMouseLeave } =
    useArchitectureTree({ selectedFile, onHover, onFileSelect });

  const rootCursor = useCursorInteraction("interactive");

  return (
    <div
      ref={rootRef}
      className="w-full select-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-body">
        <div className="sticky top-0 z-10 bg-card-dark">
          <button
            onClick={resetPaths}
            onMouseEnter={rootCursor.handleMouseEnter}
            onMouseLeave={rootCursor.handleMouseLeave}
            className="flex w-full items-center gap-1.5 py-0.5 text-left"
          >
            <FolderOpen
              size={ARCHITECTURE_TREE_CONSTANTS.DIR_ICON_SIZE}
              className="shrink-0 text-neutral"
            />
            <span className="text-body font-normal leading-tight text-foreground">
              leonardo-berselli-portfolio/
            </span>
          </button>
        </div>
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-0 border-l border-neutral/30"
            style={{ left: ARCHITECTURE_TREE_CONSTANTS.DIR_ICON_SIZE / 2 }}
          />
          <div className="flex flex-col">
            {(tree || []).map((node) => (
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

  const buttonPadding = depth * ARCHITECTURE_TREE_CONSTANTS.INDENT_STEP;
  const filePadding = buttonPadding + ARCHITECTURE_TREE_CONSTANTS.FILE_OFFSET;
  const lineOffset = buttonPadding + ARCHITECTURE_TREE_CONSTANTS.CHEVRON_WIDTH / 2;

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
            isSelected ? "bg-neutral/15" : "",
          )}
          style={{ paddingLeft: filePadding }}
        >
          <File size={ARCHITECTURE_TREE_CONSTANTS.FILE_ICON_SIZE} className="shrink-0 text-accent" />
          <m.span
            variants={{
              rest: { color: "var(--color-neutral)" },
              hover: { color: "var(--color-foreground)" },
            }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.standard,
            }}
            className="text-body font-normal leading-tight"
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
        <File size={ARCHITECTURE_TREE_CONSTANTS.FILE_ICON_SIZE} className="shrink-0 text-neutral" />
        <span className="text-body leading-tight text-neutral">{node.name}</span>
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
            size={ARCHITECTURE_TREE_CONSTANTS.CHEVRON_WIDTH}
            className="shrink-0 text-neutral"
          />
        ) : (
          <ChevronRight
            size={ARCHITECTURE_TREE_CONSTANTS.CHEVRON_WIDTH}
            className="shrink-0 text-neutral"
          />
        )}
        {isExpanded ? (
          <FolderOpen
            size={ARCHITECTURE_TREE_CONSTANTS.DIR_ICON_SIZE}
            className="shrink-0 text-neutral"
          />
        ) : (
          <Folder size={ARCHITECTURE_TREE_CONSTANTS.DIR_ICON_SIZE} className="shrink-0 text-neutral" />
        )}
        <span className="text-body font-normal leading-tight text-foreground">
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
                className="absolute top-0 bottom-0 border-l border-neutral/30"
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
