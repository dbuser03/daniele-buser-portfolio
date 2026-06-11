"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteFocusManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Small timeout ensures the new page has mounted and the DOM is updated
    const timeout = setTimeout(() => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        // Prevent scroll to top if Lenis handles scroll restoration differently
        mainContent.focus({ preventScroll: true });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
