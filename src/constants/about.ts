export const heroClipPathVariants = {
  small: (pos: { x: number; y: number }, size: number) =>
    `circle(${size / 2}px at ${pos.x}px ${pos.y}px)`,
  large: (pos: { x: number; y: number }, size: number) =>
    `circle(${size / 2}px at ${pos.x}px ${pos.y}px)`,
};

export const aboutTextVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

export const aboutAnimationConfig = {
  spring: {
    stiffness: 500,
    damping: 40,
  },
  duration: 0.6,
  ease: "easeInOut" as const,
};

export const aboutDelays = {
  text: 0.4,
};
