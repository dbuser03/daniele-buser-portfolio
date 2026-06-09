"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { CursorProvider } from "@/contexts/CursorContext";
import SmoothScrolling from "@/components/layout/cursor/SmoothScrolling";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrolling>
      <CursorProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </CursorProvider>
    </SmoothScrolling>
  );
}
