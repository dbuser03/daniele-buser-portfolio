import { HeroTitleMount } from "@/components/ui/HeroTitle";

export default function Hello() {
  return (
    <HeroTitleMount
      className="text-foreground"
      ariaLabel="Say Hello - Contact page heading"
    >
      Say Hello
    </HeroTitleMount>
  );
}
