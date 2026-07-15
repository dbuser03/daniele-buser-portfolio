"use client";

import Logo from "./Logo";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { PROJECTS } from "@/constants/projects";
import { useEffect, useState } from "react";

export default function Header() {
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
    <header className="fixed top-0 left-1/2 z-30 w-full max-w-480 -translate-x-1/2 p-4 mix-blend-difference pointer-events-none">
      <div className="grid w-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        <div className={`col-span-2 col-start-1 flex items-start ${isHiddenForNonAdmin ? "hidden" : "pointer-events-auto"}`}>
          <Logo />
        </div>
        <div className={`col-span-2 col-start-3 sm:col-start-5 md:col-start-7 lg:col-start-9 xl:col-start-11 ${isHiddenForNonAdmin ? "hidden" : "pointer-events-auto"}`}>
          <Navbar />
        </div>
      </div>
    </header>
  );
}
