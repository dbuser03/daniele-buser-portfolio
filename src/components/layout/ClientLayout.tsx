"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import SmoothScrolling from "@/components/layout/scroll/SmoothScrolling";
import { LazyMotion, domMax } from "motion/react";
import RouteFocusManager from "@/components/layout/scroll/RouteFocusManager";
import { useLenis } from "lenis/react";
import { CursorProvider } from "./cursor/CursorContext";

function SkipToContent() {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#main-content");
    } else {
      window.location.hash = "#main-content";
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-foreground focus:outline-none"
    >
      Skip to content
    </a>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LazyMotion features={domMax} strict>
      <SmoothScrolling>
        <SkipToContent />
        <RouteFocusManager />
        <CursorProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </CursorProvider>
      </SmoothScrolling>
    </LazyMotion>
  );
}
