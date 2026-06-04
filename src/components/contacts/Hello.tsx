import HeroTitle from "@/components/ui/HeroTitle";

export default function Hello() {
  return (
    <HeroTitle
      text="Say Hello"
      className="text-(--foreground)"
      ariaLabel="Say Hello - Contact page heading"
      trigger="mount"
    />
  );
}
