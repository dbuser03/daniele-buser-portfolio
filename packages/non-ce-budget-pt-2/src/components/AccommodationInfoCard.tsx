import { MapPin, CalendarDays, BedDouble, Wifi, TreePine } from "lucide-react";
import Image from "next/image";

interface AccommodationInfoCardProps {
  name?: string;
  address?: string;
  checkIn?: string;
  checkOut?: string;
}

export default function AccommodationInfoCard({
  name = "Lemon House",
  address = "Rruga Dervish Hekali 109, Tirana",
  checkIn = "24 SET",
  checkOut = "28 SET",
}: AccommodationInfoCardProps) {
  return (
    <>
      <div className="absolute inset-x-4 bottom-4 top-20 z-0 overflow-hidden bg-neutral-dark">
        <Image 
          src="/projects/non-ce-budget-pt-2/lemon-house.webp" 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card-dark from-15% via-card-dark/80 via-50% to-transparent" />
      </div>
      
      <div className="relative z-10 flex mt-auto flex-col gap-8 pb-2">
        <div className="flex flex-col gap-1">
          <span className="text-display-sm font-normal leading-none text-foreground">{name}</span>
          <div className="flex items-center gap-1.5 text-neutral mt-2">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1} />
            <span className="text-body text-sm font-normal">{address}</span>
          </div>
        </div>

        <div className="h-px w-full bg-neutral/20"></div>

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral">Check-in</span>
            <span className="text-body text-sm font-normal text-foreground">{checkIn}</span>
          </div>
          <div className="text-neutral-dark px-4">
            <CalendarDays className="h-5 w-5" strokeWidth={1} />
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-caption uppercase tracking-wider text-neutral">Check-out</span>
            <span className="text-body text-sm font-normal text-foreground">{checkOut}</span>
          </div>
        </div>

        <div className="h-px w-full bg-neutral/20"></div>

        <div className="flex flex-col gap-3 pb-2">
          <span className="text-caption uppercase tracking-wider text-neutral">Servizi</span>
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 rounded-md border border-neutral px-2.5 py-1.5 text-xs text-foreground font-normal">
              <BedDouble className="h-3.5 w-3.5 shrink-0 text-neutral" strokeWidth={1.5} />
              <span>Posti Letto</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-neutral px-2.5 py-1.5 text-xs text-foreground font-normal">
              <Wifi className="h-3.5 w-3.5 shrink-0 text-neutral" strokeWidth={1.5} />
              <span>WiFi</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-neutral px-2.5 py-1.5 text-xs text-foreground font-normal">
              <TreePine className="h-3.5 w-3.5 shrink-0 text-neutral" strokeWidth={1.5} />
              <span>Spazio Esterno</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
