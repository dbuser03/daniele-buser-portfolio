"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BIRTH_DATE } from "@/constants/about";
import { getAgeFromBirthDate } from "@/utils/date";

export default function AboutIntro() {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAge(getAgeFromBirthDate(BIRTH_DATE));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.p
      className="text-xl leading-tight text-(--background) sm:text-2xl md:text-3xl md:leading-none lg:text-2xl xl:text-3xl 2xl:text-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      I&apos;m a {age ?? "..."}-year-old Swiss creative developer, who crafts
      web and mobile products where design and code work as one. I enjoy taking
      the lead on projects because, honestly, someone has to.
    </motion.p>
  );
}
