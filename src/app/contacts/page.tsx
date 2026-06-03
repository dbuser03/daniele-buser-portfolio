import { Contacts, Hello } from "@/components/contacts";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Conctact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="flex w-full flex-1 flex-col gap-40 px-4 pt-10 md:gap-64 lg:gap-72">
        <Hello />
        <Contacts />
      </section>
      <Footer />
    </div>
  );
}
