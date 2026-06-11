"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { CursorProvider } from "./CursorContext";
import SmoothScrolling from "@/components/layout/cursor/SmoothScrolling";
import { LazyMotion, domMax } from "motion/react";
import RouteFocusManager from "@/components/layout/RouteFocusManager";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LazyMotion features={domMax} strict>
      <SmoothScrolling>
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
