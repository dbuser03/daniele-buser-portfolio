export const CURSOR_SIZE = {
  xs: 12,
  sm: 24,
  md: 32,
  lg: 64,
  xl: 800,
};

export const DEFAULT_CURSOR_LABEL = "";
export const ABOUT_PAGE_LABEL = "[ Hover the text ]";

export const CURSOR_ICONS = {
  touch: "/icons/touch_app_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg",
  copy: "/icons/file_copy_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg",
  check: "/icons/check_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz24.svg",
};

export const CURSOR_ICON_SIZE = {
  width: 32,
  height: 32,
};

export const cursorVariants = {
  circle: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (isVisible: boolean) => ({
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
    }),
  },
  icon: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.2 },
  },
  label: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export const cursorAnimationConfig = {
  position: {
    stiffness: 1000,
    damping: 20,
    mass: 0.1,
  },
  size: {
    stiffness: 500,
    damping: 40,
  },
  circle: {
    opacity: { duration: 0.15 },
    scale: { duration: 0.15 },
    backgroundColor: { duration: 0.2 },
  },
  icon: {
    duration: 0.3,
    ease: "easeOut" as const,
  },
  iconTransition: {
    duration: 0.3,
    ease: "easeInOut" as const,
  },
  label: {
    duration: 0.2,
  },
};

export const cursorIconVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};
