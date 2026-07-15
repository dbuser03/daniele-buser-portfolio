"use client";

import { m } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import { motionTokens, useAnimations } from "@/utils/motion";
import { usePathname } from "next/navigation";
import { PROJECTS } from "@/constants/projects";
import { useEffect, useState } from "react";

export default function Footer() {
  const { entranceVariants } = useAnimations();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAdmin(localStorage.getItem("admin") === "true");
  }, []);

  const isProjectPage = pathname.startsWith("/projects/");
  const slug = isProjectPage ? pathname.split("/")[2] : null;
  const project = slug ? PROJECTS.find((p) => p.id === slug) : null;

  const isHiddenForNonAdmin = project?.isHidden && (!mounted || !isAdmin);

  return (
    <footer
      className="pointer-events-none fixed bottom-0 left-1/2 z-30 flex w-full max-w-480 -translate-x-1/2 flex-col p-4 mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div className={`w-fit select-none ${isHiddenForNonAdmin ? "pointer-events-none" : "pointer-events-auto"}`}>
        <m.p
          className="text-body leading-tight text-foreground"
          variants={entranceVariants(0.8, motionTokens.distance.base, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          LUGANO - <TimeDisplay />
        </m.p>
        <m.p
          className="text-body text-neutral"
          variants={entranceVariants(0.9, motionTokens.distance.base, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          46&deg; 00&apos; 13.24&quot; - 08&deg; 57&apos; 03.79&quot;
        </m.p>
      </div>
    </footer>
  );
}
