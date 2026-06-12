import { useReducedMotion } from "motion/react";

export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.3,
    smooth: 0.4,
    slow: 0.6,
    slower: 0.8,
  },
  delay: {
    none: 0,
    short: 0.15,
    base: 0.3,
    long: 0.45,
    longer: 0.6,
  },
  distance: {
    base: 24,
    hero: 48,
    hover: 16,
  },
  easing: {
    standard: "easeOut" as const,
  },
  spring: {
    cursor: { type: "spring" as const, stiffness: 500, damping: 40 },
    cell: { type: "spring" as const, stiffness: 170, damping: 24, mass: 0.9 },
    scroll: {
      type: "spring" as const,
      stiffness: 110,
      damping: 26,
      mass: 0.35,
    },
  },
  stagger: {
    tight: 0.05,
    base: 0.08,
    loose: 0.1,
  },
} as const;

export const useAnimations = () => {
  const shouldReduceMotion = useReducedMotion();
  const dur = (d: number) => (shouldReduceMotion ? 0.01 : d);

  return {
    entranceVariants: (
      delay = 0,
      yOffset = 20,
      duration: number = motionTokens.duration.smooth,
    ) =>
      ({
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: dur(duration),
            ease: motionTokens.easing.standard,
            delay: dur(delay),
          },
        },
      }) as const,

    fadeVariants: {
      initial: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: dur(motionTokens.duration.smooth),
          ease: motionTokens.easing.standard,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: dur(motionTokens.duration.fast),
          ease: motionTokens.easing.standard,
        },
      },
    } as const,

    hoverVariants: {
      rest: { scale: 1 },
      hover: { scale: shouldReduceMotion ? 1 : 1.04 },
      tap: { scale: shouldReduceMotion ? 1 : 0.98 },
    } as const,

    imageHoverVariants: {
      initial: {
        scale: 1.1,
        filter: "blur(0px)",
        transition: {
          duration: dur(motionTokens.duration.base),
          ease: motionTokens.easing.standard,
        },
      },
      hover: {
        scale: shouldReduceMotion ? 1.1 : 1.04,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
        transition: {
          duration: dur(motionTokens.duration.base),
          ease: motionTokens.easing.standard,
        },
      },
    } as const,

    listVariants: (
      delayChildren = 0,
      staggerChildren: number = motionTokens.stagger.base,
    ) =>
      ({
        initial: {},
        visible: {
          transition: {
            delayChildren: shouldReduceMotion ? 0 : delayChildren,
            staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
          },
        },
      }) as const,

    itemVariants: {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : motionTokens.distance.base },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: dur(motionTokens.duration.smooth),
          ease: motionTokens.easing.standard,
        },
      },
    } as const,
  };
};
