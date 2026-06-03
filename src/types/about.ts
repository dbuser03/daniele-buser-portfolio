import { MotionValue } from "motion/react";
import { RefObject } from "react";

export type OverlayRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TechStackRow = "first" | "second";

export type TechStackIconConfig = {
  path: string;
  sizeClass: string;
  href: string;
  label: string;
  hoverPaddingClass?: string;
};

export interface TechStackIconProps {
  icon: TechStackIconConfig;
  isActive: boolean;
  isFullyActive: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface TechStackCellProps {
  children: React.ReactNode;
  cellId: string;
  className?: string;
  cellRef?: (node: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export type HoverableWord = "Obsess" | "Design" | "Code" | "Ship";

export type WorkWordProps = {
  word: HoverableWord;
  index: number;
  scrollProgress: MotionValue<number>;
  isActive?: boolean;
  onHover?: (word: HoverableWord | null) => void;
};

export type VideoLayerProps = {
  src: string;
  active: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  onEnded: () => void;
};
