"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NAV_LINKS,
  navbarItemVariants,
  navbarAnimationConfig,
  navbarHoverAnimationConfig,
  navbarDelays,
} from "@/constants/navbar";
import {
  isActiveNavLink,
  getNavbarTextColor,
  getNavbarHoverColor,
} from "@/utils/navbar";
import { NavbarProps } from "@/types/navbar";

const Navbar: React.FC<NavbarProps> = ({
  variant = "dark",
  preventAnimation = false,
}) => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <ul className="flex gap-6 sm:gap-8 md:gap-12">
        {NAV_LINKS.map(({ href, label }, idx) => {
          const isActive = isActiveNavLink(pathname, href);
          const delay =
            navbarDelays.baseDelay + idx * navbarDelays.itemIncrement;

          return (
            <li key={href}>
              <motion.div
                variants={preventAnimation ? {} : navbarItemVariants}
                initial={preventAnimation ? "visible" : "hidden"}
                animate="visible"
                transition={
                  preventAnimation ? {} : { ...navbarAnimationConfig, delay }
                }
              >
                <Link
                  href={href}
                  className={`text-xs md:text-sm ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                >
                  <motion.span
                    initial={{
                      color: getNavbarTextColor(variant, isActive),
                    }}
                    whileHover={
                      preventAnimation
                        ? {}
                        : {
                            color: getNavbarHoverColor(variant),
                          }
                    }
                    transition={
                      preventAnimation ? {} : navbarHoverAnimationConfig
                    }
                  >
                    {label}
                  </motion.span>
                </Link>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
