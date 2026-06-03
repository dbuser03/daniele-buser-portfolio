"use client";

import { About } from "@/components/ui/about";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CursorProvider } from "@/contexts/CursorContext";
import { ABOUT_PAGE_LABEL } from "@/constants/layout/cursor";
import { useSmoothCursor } from "@/hooks/layout/cursor/useSmoothCursor";
import Cursor from "@/components/layout/cursor/Cursor";

export default function Home() {
  const {
    cursorPosition,
    smoothX,
    smoothY,
    cursorSize,
    isVisible,
    label,
    color,
    setColor,
    setLabel,
    showIcon,
    setShowIcon,
    iconType,
    setIconType,
  } = useSmoothCursor(undefined, "[ Hover the text ]");

  return (
    <CursorProvider
      cursorSize={cursorSize}
      smoothX={smoothX}
      smoothY={smoothY}
      setColor={setColor}
      setLabel={setLabel}
      pageLabel={ABOUT_PAGE_LABEL}
      showIcon={showIcon}
      setShowIcon={setShowIcon}
      iconType={iconType}
      setIconType={setIconType}
    >
      <div className="flex min-h-screen flex-col">
        <Cursor
          cursorPosition={cursorPosition}
          smoothX={smoothX}
          smoothY={smoothY}
          cursorSize={cursorSize}
          isVisible={isVisible}
          label={label}
          variant="dark"
          color={color}
          showIcon={showIcon}
        />
        <Header />
        <main className="w-full flex-1 px-4">
          <About />
        </main>
        <Footer />
      </div>
    </CursorProvider>
  );
}
