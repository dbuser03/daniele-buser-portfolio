"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import Grid from "@/components/layout/Grid";
import { CursorProvider } from "@/contexts/CursorContext";
import SmoothScrolling from "@/components/layout/cursor/SmoothScrolling";
import { useReducedMotion } from "motion/react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SmoothScrolling disabled={shouldReduceMotion ?? false}>
      <CursorProvider disabled={shouldReduceMotion ?? false}>
        <div className="flex min-h-screen flex-col">
          <Grid />
          <Header />
          {children}
          <Footer />
        </div>
      </CursorProvider>
    </SmoothScrolling>
  );
}
