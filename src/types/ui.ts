export interface HeroTitleProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  once?: boolean;
  yOffset?: number;
  duration?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  showDot?: boolean;
  trigger?: "inView" | "mount";
}

