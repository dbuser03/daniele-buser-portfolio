"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Grid } from "@/components/layout/grid";
import { Cursor } from "@/components/layout/cursor";
import { CursorProvider } from "@/contexts/CursorContext";
import { useSmoothCursor } from "@/hooks/useCursor";
import { SmoothScrolling } from "@/components/layout/cursor/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLightPage = pathname === "/" || pathname === "/about";
  const variant = isLightPage ? "light" : "dark";

  const { smoothX, smoothY, cursorSize, isVisible, color, setColor } =
    useSmoothCursor();

  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScrolling>
          <CursorProvider
            cursorSize={cursorSize}
            smoothX={smoothX}
            smoothY={smoothY}
            setColor={setColor}
          >
            <div className="flex min-h-screen flex-col">
              <Grid variant={variant} />
              <Cursor
                smoothX={smoothX}
                smoothY={smoothY}
                cursorSize={cursorSize}
                isVisible={isVisible}
                color={color}
              />
              <Header variant={variant} />
              {children}
              <Footer variant={variant} />
            </div>
          </CursorProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
