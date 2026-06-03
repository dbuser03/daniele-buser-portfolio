import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Daniele Buser's personal portfolio website.",
};

export default function Home() {
  return (
    <main
      className="flex w-full flex-1 flex-col bg-(--foreground) px-4"
      aria-label="Projects page main content"
    >
      <h1 className="sr-only">Projects</h1>
    </main>
  );
}
