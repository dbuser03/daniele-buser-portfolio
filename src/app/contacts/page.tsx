import type { Metadata } from "next";
import { Contacts, Hello } from "@/components/contacts";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Get in touch with Daniele Buser.",
};

export default function ContactPage() {
  return (
    <main
      className="z-1 flex w-full flex-1 flex-col justify-center gap-40 px-4 md:gap-64 lg:gap-72"
      aria-label="Contacts page main content"
    >
      <Hello />
      <Contacts />
    </main>
  );
}
