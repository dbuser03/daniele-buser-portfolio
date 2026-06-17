import type { Metadata } from "next";
import Contacts from "@/components/contacts/Contacts";
import Hello from "@/components/contacts/Hello";
import ContactSectionWrapper from "@/components/layout/ContactSectionWrapper";
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
        <ContactSectionWrapper>
          <Hello />
          <Contacts />
        </ContactSectionWrapper>
      </main>
    </>
  );
}
