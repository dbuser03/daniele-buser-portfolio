import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Daniele Buser.",
};

export default function AboutPage() {
  return (
    <main
      className="flex w-full flex-1 flex-col justify-center bg-[var(--foreground)] px-4"
      aria-label="About page main content"
    ></main>
  );
}
