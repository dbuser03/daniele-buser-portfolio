import type { Metadata } from "next";
import Contacts from "@/components/contacts/Contacts";
import Hello from "@/components/contacts/Hello";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Get in touch with Daniele Buser.",
};

export default function ContactPage() {
  return (
    <main
      className="z-1 flex w-full flex-1 flex-col justify-start gap-0 px-4"
      aria-label="Contacts page main content"
    >
      <section className="flex flex-col gap-64 pt-44">
        <Hello />
        <Contacts />
      </section>
    </main>
  );
}
