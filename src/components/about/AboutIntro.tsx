"use client";

import { useMemo } from "react";
import { motion } from "motion/react";


import { createFadeUpVariants } from "@/constants/animations";

export const ABOUT_INTRO_ID = "about-intro-paragraph";

export default function AboutIntro({ age }: { age: number }) {


  const introVariants = useMemo(
    () => createFadeUpVariants(0.5),
    [],
  );

  return (
    <motion.p
      id={ABOUT_INTRO_ID}
      className="text-xl leading-tight text-(--background) sm:text-2xl md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl"
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
