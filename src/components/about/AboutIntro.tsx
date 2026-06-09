"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { motionTokens, entranceVariants } from "@/constants/animations";

export const ABOUT_INTRO_ID = "about-intro-paragraph";

export default function AboutIntro({ age }: { age: number }) {
  const introVariants = useMemo(() => entranceVariants(0.5, 20, motionTokens.duration.smooth), []);

  return (
    <motion.p
      id={ABOUT_INTRO_ID}
      className="text-section text-(--background)"
      variants={introVariants}
      initial="initial"
      animate="visible"
    >
      I&apos;m a {age ?? "..."}-year-old Swiss creative developer, who crafts
      web and mobile products where design and code work as one. I enjoy taking
      the lead on projects because, honestly, someone has to.
    </motion.p>
  );
}
