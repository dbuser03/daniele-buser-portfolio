import { HeroTitleStatic } from "@/components/ui/HeroTitle";

export default function Hello() {
  return (
    <HeroTitleStatic
      text="Say Hello"
      className="text-(--foreground)"
      ariaLabel="Say Hello - Contact page heading"
    />
  );
}
