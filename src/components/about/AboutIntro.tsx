"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { BIRTH_DATE } from "@/constants/about";
import { useAge } from "@/hooks/useAge";
import { createFadeUpVariants } from "@/constants/animations";
import { useIsReady } from "@/hooks/useIsReady";

export default function AboutIntro() {
  const age = useAge(BIRTH_DATE);
  const isReady = useIsReady(150);

  const introVariants = useMemo(
    () => createFadeUpVariants(0.5),
    [],
  );

  return (
    <motion.p
      className="text-xl leading-tight text-(--background) sm:text-2xl md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl"
      variants={introVariants}
      initial="initial"
      animate={isReady ? "visible" : "initial"}
    >
      I&apos;m a {age ?? "..."}-year-old Swiss creative developer, who crafts
      web and mobile products where design and code work as one. I enjoy taking
      the lead on projects because, honestly, someone has to.
    </motion.p>
  );
}
