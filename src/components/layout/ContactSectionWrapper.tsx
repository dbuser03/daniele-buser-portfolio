import GridLines from "@/components/layout/GridLines";

export default function ContactSectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-480 flex-1 flex-col justify-center relative py-20">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <GridLines variant="dark" />
      </div>

      <div className="relative z-10 flex flex-col gap-64">
        {children}
      </div>
    </div>
  );
}
