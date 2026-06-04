"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import HeroTitle from "@/components/ui/HeroTitle";
import { createFadeUpVariants } from "@/constants/animations";
import { useIsReady } from "@/hooks/useIsReady";

export default function NotFound() {
  const isReady = useIsReady(150);

  const paragraphVariants = useMemo(
    () => createFadeUpVariants(0.35, 20, 0.4),
    [],
  );

  const buttonVariants = useMemo(
    () => createFadeUpVariants(0.5, 20, 0.4),
    [],
  );

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 text-(--foreground) px-4">
      <div className="flex flex-col items-center gap-0 text-center">
        <HeroTitle
          text="404"
          className="text-(--foreground)"
          ariaLabel="404 - Page not found"
          delay={0.2}
          duration={0.8}
        />
        <motion.p
          variants={paragraphVariants}
          initial="initial"
          whileInView={isReady ? "visible" : undefined}
          viewport={{ once: true, amount: 0.1 }}
          className="text-xs text-(--neutral) md:text-sm tracking-wide -mt-3"
        >
          This page doesn&apos;t exist.
        </motion.p>
      </div>
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileInView={isReady ? "visible" : undefined}
        viewport={{ once: true, amount: 0.1 }}
      >
        <Link
          href="/"
          className="cursor-pointer rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal uppercase tracking-wider text-(--foreground) hover:bg-(--foreground) hover:text-(--background) hover:border-(--foreground) transition-all duration-300"
        >
          Go home
        </Link>
      </motion.div>
    </main>
  );
}
