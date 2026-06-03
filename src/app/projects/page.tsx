import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--foreground)]">
      <Header variant="light" />
      <main className="w-full flex-1 px-4"></main>
      <Footer variant="light" />
    </div>
  );
}
