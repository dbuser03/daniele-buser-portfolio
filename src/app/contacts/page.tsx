import type { Metadata } from "next";
import Contacts from "@/components/contacts/Contacts";
import Hello from "@/components/contacts/Hello";
import { contactMetadata, contactPageJsonLd } from "@/utils/metadata";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="z-1 flex w-full flex-1 flex-col justify-start gap-0 px-4 focus:outline-none"
        aria-label="Contacts page main content"
      >
        <section className="flex min-h-screen flex-col justify-center gap-48 py-20 md:gap-64">
          <Hello />
          <Contacts />
        </section>
      </main>
    </>
  );
}
