import type { Metadata } from "next";
import { homeMetadata, homePageJsonLd } from "@/seo/metadata";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 flex-col bg-(--foreground) px-4 focus:outline-none"
        aria-label="Projects page main content"
      >
        <h1 className="sr-only">Projects</h1>
      </main>
    </>
  );
}
