"use client";

import { Contacts, Hello } from "@/components/ui/contacts";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CursorProvider } from "@/contexts/CursorContext";
import { DEFAULT_CURSOR_LABEL } from "@/constants/layout/cursor";
import { useSmoothCursor } from "@/hooks/layout/cursor/useSmoothCursor";
import Cursor from "@/components/layout/cursor/Cursor";

export default function Contact() {
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
  } = useSmoothCursor();

  return (
    <CursorProvider
      cursorSize={cursorSize}
      smoothX={smoothX}
      smoothY={smoothY}
      setColor={setColor}
      setLabel={setLabel}
      pageLabel={DEFAULT_CURSOR_LABEL}
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
          iconType={iconType}
        />
        <Header />
        <section className="flex w-full flex-1 flex-col justify-center gap-40 px-4 md:gap-64 lg:gap-72">
          <Hello />
          <Contacts />
        </section>
        <Footer />
      </div>
    </CursorProvider>
  );
}
