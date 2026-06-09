export const motionTokens = {
  duration: {
    fast:   0.2,
    base:   0.3,
    smooth: 0.4,
    slow:   0.6,
    slower: 0.8,
  },
  easing: {
    standard: "easeOut" as const,
  },
  spring: {
    cursor: { type: "spring" as const, stiffness: 500, damping: 40 },
    cell:   { type: "spring" as const, stiffness: 170, damping: 24, mass: 0.9 },
    scroll: { type: "spring" as const, stiffness: 110, damping: 26, mass: 0.35 },
  },
  stagger: {
    tight: 0.05,
    base:  0.08,
    loose: 0.1,
  },
} as const;

export const entranceVariants = (
  delay = 0,
  yOffset = 20,
  duration: number = motionTokens.duration.smooth,
) =>
  ({
    initial: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: motionTokens.easing.standard, delay },
    },
  }) as const;

export const fadeVariants = {
  initial: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionTokens.duration.smooth, ease: motionTokens.easing.standard } },
  exit:    { opacity: 0, transition: { duration: motionTokens.duration.fast,   ease: motionTokens.easing.standard } },
} as const;

export const hoverVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.04 },
  tap:   { scale: 0.98 },
} as const;

export const listVariants = (
  delayChildren = 0,
  staggerChildren: number = motionTokens.stagger.base,
) =>
  ({
    initial: {},
    visible: {
      transition: { delayChildren, staggerChildren },
    },
  }) as const;

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.smooth, ease: motionTokens.easing.standard },
  },
} as const;
