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
    const isHashAdmin = window.location.hash === "#admin";
    const isHashLogout = window.location.hash === "#logout";
    const isLocalAdmin = localStorage.getItem("admin") === "true";

    if (isHashLogout) {
      localStorage.removeItem("admin");
      window.history.replaceState(null, "", window.location.pathname);
      setIsAdmin(false);
    } else if (isHashAdmin) {
      localStorage.setItem("admin", "true");
      window.history.replaceState(null, "", window.location.pathname);
      setIsAdmin(true);
    } else if (isLocalAdmin) {
      setIsAdmin(true);
    }
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
      <div className={`w-fit select-none ${isHiddenForNonAdmin ? "hidden" : "pointer-events-auto"}`}>
        <m.p
          className="text-caption md:text-body leading-tight text-foreground"
          variants={entranceVariants(0.8, motionTokens.distance.base, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          LUGANO - <TimeDisplay />
        </m.p>
        <m.p
          className="text-caption md:text-body text-neutral"
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
