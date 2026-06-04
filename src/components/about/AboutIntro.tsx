"use client";

import { motion } from "motion/react";
import { BIRTH_DATE } from "@/constants/about";
import { useAge } from "@/hooks/useAge";
import { FADE_UP_TRANSITION } from "@/constants/animations";

export default function AboutIntro() {
  const age = useAge(BIRTH_DATE);

  return (
    <motion.p
      className="text-xl leading-tight text-(--background) sm:text-2xl md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...FADE_UP_TRANSITION, delay: 0.5 }}
    >
      I&apos;m a {age ?? "..."}-year-old Swiss creative developer, who crafts
      web and mobile products where design and code work as one. I enjoy taking
      the lead on projects because, honestly, someone has to.
    </motion.p>
  );
}
