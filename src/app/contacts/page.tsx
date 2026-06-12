import type { Metadata } from "next";
import Contacts from "@/components/contacts/Contacts";
import Hello from "@/components/contacts/Hello";
import GridLines from "@/components/layout/GridLines";
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
        className="relative z-10 flex w-full flex-1 flex-col justify-start gap-0 px-4 focus:outline-none"
        aria-label="Contacts page main content"
      >
        <div className="mx-auto flex w-full max-w-480 flex-1 flex-col relative">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          >
            <GridLines variant="dark" />
          </div>
          <section className="relative z-10 flex min-h-screen flex-col justify-center gap-64 py-20">
            <Hello />
            <Contacts />
          </section>
        </div>
      </main>
    </>
  );
}
