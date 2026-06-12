"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { motionTokens, useAnimations } from "@/utils/motion";

export default function AboutPortrait() {
  const { entranceVariants } = useAnimations();

  const portraitVariants = useMemo(
    () => entranceVariants(motionTokens.delay.longer, motionTokens.distance.base, motionTokens.duration.smooth),
    [entranceVariants],
  );

  return (
    <m.figure
      className="relative aspect-3/4 w-full overflow-hidden"
      variants={portraitVariants}
      initial="initial"
      animate="visible"
    >
      <m.div
        className="relative size-full"
        whileHover={{ scale: 1.08, y: -motionTokens.distance.hover }}
        transition={{
          duration: motionTokens.duration.smooth,
          ease: motionTokens.easing.standard,
        }}
      >
        <Image
          src="/portrait.webp"
          alt="Portrait of Daniele Buser"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 0px"
          priority
        />
      </m.div>
    </m.figure>
  );
}
