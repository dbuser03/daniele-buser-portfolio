import HeroTitle from "@/components/ui/HeroTitle";

export default function Hey() {
  return (
    <HeroTitle
      text="Hey"
      className="relative z-10 -ml-4 inline-block text-(--background)"
      ariaLabel="Hey - About page heading"
      once={true}
      trigger="mount"
    />
  );
}
