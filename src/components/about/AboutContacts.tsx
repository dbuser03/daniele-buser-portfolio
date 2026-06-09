import { HeroTitleInView } from "@/components/ui/HeroTitle";
import Contacts from "@/components/contacts/Contacts";
import GridLines from "@/components/layout/GridLines";

const viewportConfig = { once: false, amount: 0.6 };
export default function AboutContacts() {
  return (
    <section className="relative -mx-4 flex min-h-screen flex-col justify-center bg-(--background) px-4 py-20 text-(--foreground)">
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-4"
        aria-hidden="true"
      >
        <GridLines variant="dark" />
      </div>

      <div className="relative z-10 flex flex-col gap-64">
        <HeroTitleInView
          as="h2"
          className="text-(--foreground)"
          ariaLabel="Say Hello - Contact section heading"
          yOffset={40}
          delay={0}
          viewport={viewportConfig}
        >
          Say Hello
        </HeroTitleInView>
        <Contacts
          paragraphDelay={0.15}
          linksDelay={0.3}
          trigger="inView"
          viewport={viewportConfig}
        />
      </div>
    </section>
  );
}
