export const PACKAGE_MOTION = {
  duration: {
    tap: 0.1,
    switch: 0.15,
    card: 0.4,
    engine: 1.5,
  },
  easing: {
    standard: "easeOut" as const,
    pulse: "easeInOut" as const,
  },
  yOffset: {
    card: 12,
  },
} as const;

export const SWITCH_THUMB = {
  offsetCheckedMd: 16,
  offsetCheckedSm: 10,
  offsetUnchecked: 2,
} as const;

export const enginePulseVariants = {
  idle: { opacity: 1 },
  pulse: {
    opacity: [1, 0.6, 1],
    transition: {
      duration: PACKAGE_MOTION.duration.engine,
      ease: PACKAGE_MOTION.easing.pulse,
      repeat: Infinity,
    },
  },
};
