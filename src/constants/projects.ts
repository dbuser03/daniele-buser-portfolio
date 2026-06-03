export const PROJECT_TAGS = {
  UI_UX_DESIGN: "UI/UX DESIGN",
  MOBILE_DEVELOPMENT: "MOBILE DEVELOPMENT",
  WEB_DEVELOPMENT: "WEB DEVELOPMENT",
  WEB_DESIGN: "WEB DESIGN",
  GRAPHIC_DESIGN: "GRAPHIC DESIGN",
  LOGO_DESIGN: "LOGO DESIGN",
  BRANDING: "BRANDING",
} as const;

export const projectIndexVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  item: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  linkGroup: {
    initial: {},
    hover: {},
  },
  titleShift: {
    initial: { x: 0 },
    hover: { x: 4 },
  },
};

export const projectIndexAnimationConfig = {
  container: { duration: 0.8, delay: 0.6, ease: "easeInOut" as const },
  item: { duration: 0.4, ease: "easeInOut" as const },
  titleShift: { duration: 0.2, ease: "easeInOut" as const },
};

export const projectIndexDelays = {
  base: 0.6,
  step: 0.2,
};

export const projectCardVariants = {
  container: {
    hidden: { opacity: 0, y: 128 },
    visible: { opacity: 1, y: 0 },
  },
  image: {
    initial: { scale: 1, filter: "blur(0px)" },
    hover: { scale: 1.1, filter: "blur(4px)" },
  },
  overlay: {
    hidden: { opacity: 0, translateY: 8, scale: 0.95 },
    visible: { opacity: 1, translateY: 0, scale: 1 },
  },
};

export const projectCardAnimationConfig = {
  container: { duration: 0.6, ease: "easeInOut" as const },
  image: { duration: 0.4, ease: "easeInOut" as const },
  overlay: { duration: 0.35, ease: "easeInOut" as const },
};

export const projectCardDelays = {
  step: 0.1,
};
