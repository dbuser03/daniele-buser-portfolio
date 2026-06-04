import HeroTitle from "@/components/ui/HeroTitle";
import Contacts from "@/components/contacts/Contacts";
import GridLines from "@/components/layout/GridLines";

export default function AboutContacts() {
  return (
    <section className="relative -mx-4 flex min-h-screen flex-col justify-center bg-(--background) text-(--foreground) py-20">
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-4"
        aria-hidden="true"
      >
        <GridLines variant="dark" />
      </div>

      <div className="relative z-10 flex flex-col gap-48 md:gap-64">
        <HeroTitle
          as="h2"
          text="Say Hello"
          className="text-(--foreground)"
          ariaLabel="Say Hello - Contact section heading"
          yOffset={90}
          duration={1.2}
          delay={0.2}
        />
        <Contacts paragraphDelay={0.3} linksDelay={0.4} />
      </div>
    </section>
  );
}
