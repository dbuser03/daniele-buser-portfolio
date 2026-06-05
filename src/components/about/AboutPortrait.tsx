"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FADE_UP_TRANSITION, createFadeUpVariants } from "@/constants/animations";
import Skeleton from "@/components/ui/Skeleton";

export default function AboutPortrait() {
  const [isLoading, setIsLoading] = useState(true);

  const portraitVariants = useMemo(
    () => createFadeUpVariants(0.65),
    [],
  );

  return (
    <motion.figure
      className="relative aspect-3/4 w-full overflow-hidden"
      variants={portraitVariants}
      initial="initial"
      animate="visible"
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.08, y: -12 }}
        transition={FADE_UP_TRANSITION}
      >
        <Skeleton isLoading={isLoading} variant="on-light" />
        <Image
          src="/portrait.webp"
          alt="Portrait of Daniele Buser"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 0px"
          priority
          onLoad={() => setIsLoading(false)}
        />
      </motion.div>
    </motion.figure>
  );
}
