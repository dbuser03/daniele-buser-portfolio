import { BusFront, CarTaxiFront, KeyRound, ArrowRightLeft } from "lucide-react";

export default function TransportInfoCard() {
  return (
    <div className="flex flex-col gap-10 sm:gap-12 pt-0 pb-4 w-full h-full">
      
      <div className="flex w-full flex-col overflow-hidden rounded-xl border border-neutral/20 bg-card-dark">
        
        <div className="flex flex-col p-5 sm:p-6 pb-6 sm:pb-8 w-full">
          <div className="flex items-center justify-between pb-2 w-full gap-2">
             <div className="flex items-center gap-3 text-foreground min-w-0">
               <BusFront className="h-6 w-6 text-neutral shrink-0" strokeWidth={1.5} />
               <span className="text-section font-normal truncate">LU-NA Shuttle</span>
             </div>
             <span className="text-body font-normal text-foreground shrink-0">400 L <span className="text-neutral">/ tratta</span></span>
          </div>
          
          <div className="mt-8 flex w-full items-center justify-between rounded-lg bg-card-light p-4 sm:p-5">
            <div className="flex w-[35%] sm:w-[40%] flex-col gap-1 text-center min-w-0">
              <span className="text-body font-normal leading-none text-background truncate">TIA</span>
              <span className="text-caption uppercase tracking-wider text-neutral-dark truncate">Aeroporto</span>
            </div>
            
            <div className="flex shrink-0 items-center justify-center text-accent">
               <ArrowRightLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            </div>

            <div className="flex w-[35%] sm:w-[40%] flex-col gap-1 text-center min-w-0">
              <span className="text-body font-normal leading-none text-background truncate">Tirana</span>
              <span className="text-caption uppercase tracking-wider text-neutral-dark truncate">Centro</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-neutral/20"></div>

        <div className="flex flex-col p-5 sm:p-6 w-full">
          <div className="flex items-center justify-between pb-4 w-full gap-2">
            <span className="text-section font-normal text-foreground truncate">Urban Pass</span>
            <span className="text-body font-normal text-foreground shrink-0">40 L <span className="text-neutral">/ corsa</span></span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 pt-6 sm:pt-8 w-full">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">11</div>
              <span className="text-body font-normal text-neutral truncate">Porcelan</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">1B</div>
              <span className="text-body font-normal text-neutral truncate">Tirana e Re</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">8C</div>
              <span className="text-body font-normal text-neutral truncate">Sauk</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">16A</div>
              <span className="text-body font-normal text-neutral truncate">Linza</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">13B</div>
              <span className="text-body font-normal text-neutral truncate">Tirana e Re</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-neutral/50 text-sm font-normal text-foreground">4</div>
              <span className="text-body font-normal text-neutral truncate">Kombinat</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col">
        <span className="mb-5 text-caption font-normal tracking-widest text-neutral uppercase">Trasporti Privati</span>
        <div className="flex flex-col gap-3 w-full">
          <div className="group flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-4 min-w-0">
               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral/20 text-neutral transition-colors group-hover:text-foreground">
                 <KeyRound className="h-4 w-4" strokeWidth={1.5} />
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-body font-normal leading-tight text-foreground truncate">Noleggio Auto</span>
                 <span className="mt-1 text-caption uppercase tracking-wider text-neutral truncate">25 Set → 26 Set</span>
               </div>
            </div>
            <span className="text-body font-normal text-foreground shrink-0">2500 L</span>
          </div>

          <div className="ml-14 h-px bg-neutral/20"></div>

          <div className="group flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-4 min-w-0">
               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral/20 text-neutral transition-colors group-hover:text-foreground">
                 <CarTaxiFront className="h-4 w-4" strokeWidth={1.5} />
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-body font-normal leading-tight text-foreground truncate">Taxi Serali</span>
                 <span className="mt-1 text-caption uppercase tracking-wider text-neutral truncate">Locali & Club</span>
               </div>
            </div>
            <span className="text-body font-normal text-foreground shrink-0">1740 L</span>
          </div>
        </div>
      </div>

    </div>
  );
}
