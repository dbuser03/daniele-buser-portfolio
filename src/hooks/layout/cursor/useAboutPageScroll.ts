import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MotionValue } from "motion/react";
import { ABOUT_PAGE_LABEL, CURSOR_SIZE } from "@/constants/layout/cursor";

export const useAboutPageScroll = (
  setLabel: (label: string) => void,
  isHoveringHero: boolean,
  cursorSize: MotionValue<number>,
  setShowIcon: (show: boolean) => void,
) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [showingProjects, setShowingProjects] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!hasScrolled) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (isHoveringHero) {
      setScrollCount(0);
      setHasScrolled(false);
      setShowingProjects(false);
      setShowIcon(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      return;
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setLabel(ABOUT_PAGE_LABEL);
      resetScrollState();
    }, 3000);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollTime, hasScrolled, isHoveringHero, setLabel]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !isHoveringHero && !isHoveringInteractive) {
        setLastScrollTime(Date.now());
        setHasScrolled(true);
        setScrollCount((prev) => prev + 1);

        if (scrollCount < 12) {
          setLabel("[ Stop fucking scrolling ]");
        } else {
          setLabel("[ Fine, check my projects ]");
          setShowingProjects(true);
          cursorSize.set(CURSOR_SIZE.lg);
          setShowIcon(true);
        }
      }
    };

    const handleClick = () => {
      if (showingProjects) {
        router.push("/projects");
      }
    };

    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        "a, nav, header a, footer > div",
      );

      const isHovering = Array.from(interactiveElements).some((el) =>
        el.matches(":hover"),
      );

      setIsHoveringInteractive(isHovering);

      if (isHovering && showingProjects) {
        setScrollCount(0);
        setHasScrolled(false);
        setShowingProjects(false);
        setShowIcon(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseover", updateHoverState);
    window.addEventListener("mouseout", updateHoverState);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseover", updateHoverState);
      window.removeEventListener("mouseout", updateHoverState);
    };
  }, [
    isHoveringHero,
    isHoveringInteractive,
    scrollCount,
    showingProjects,
    router,
    setLabel,
    cursorSize,
    setShowIcon,
  ]);

  const resetScrollState = () => {
    setScrollCount(0);
    setHasScrolled(false);
    setShowingProjects(false);
    setShowIcon(false);
    cursorSize.set(CURSOR_SIZE.sm);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  return { hasScrolled, scrollCount };
};
