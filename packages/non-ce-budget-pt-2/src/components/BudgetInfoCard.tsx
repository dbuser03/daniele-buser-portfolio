"use client";

import { useState } from "react";
import { Receipt, Euro, Coins } from "lucide-react";

interface BudgetInfoCardProps {
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

export default function BudgetInfoCard({ onInputFocus, onInputBlur }: BudgetInfoCardProps = {}) {
  const [amount, setAmount] = useState<string>("");

  const EXCHANGE_RATE = 100;

  const numAmount = parseFloat(amount.replace(/,/g, '.')) || 0;
  const convertedAmount = numAmount / EXCHANGE_RATE;

  return (
    <div className="flex flex-col gap-8 pt-0 pb-4 w-full h-full">
      
      <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-neutral/20 p-5">
        <div className="flex w-full items-center justify-between pb-8">
          <span className="text-section font-normal text-foreground">Convertitore</span>
          <span className="text-caption tracking-widest text-neutral uppercase">Live</span>
        </div>

        <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-neutral/20">
          
          <div className="flex w-full items-center justify-between p-4">
            <div className="flex min-w-0 flex-col flex-1 pr-4">
               <span className="mb-1 text-caption uppercase tracking-wider text-neutral">Paghi in</span>
               <input 
                 type="text"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 onFocus={onInputFocus}
                 onBlur={onInputBlur}
                 onKeyDown={(e) => {
                   if (e.key === "Enter") {
                     e.currentTarget.blur();
                   }
                 }}
                 className="w-full bg-transparent outline-none text-section font-normal leading-none text-foreground placeholder:text-neutral"
                 placeholder="0"
                 autoFocus
               />
            </div>
            <div className="flex shrink-0 items-center gap-3">
               <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral/20 text-foreground">
                 <Coins className="h-4 w-4" strokeWidth={1.5} />
               </div>
               <span className="text-body font-normal text-foreground w-8">LEK</span>
            </div>
          </div>

          <div className="h-px w-full bg-neutral/20"></div>

          <div className="flex w-full items-center justify-between p-4">
            <div className="flex min-w-0 flex-col flex-1 pr-4">
               <span className="mb-1 text-caption uppercase tracking-wider text-neutral">Ricevi circa</span>
               <span className={`text-section font-normal leading-none truncate ${amount === "" ? "text-neutral" : "text-foreground"}`}>
                 {convertedAmount.toFixed(2)}
               </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
               <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral/20 text-foreground">
                 <Euro className="h-4 w-4" strokeWidth={1.5} />
               </div>
               <span className="text-body font-normal text-foreground w-8">EUR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col">
        <span className="mb-4 text-caption font-normal tracking-widest text-neutral uppercase">Stima Costi Locali</span>
        
        <div className="flex w-full flex-col gap-3">
          <div className="group flex w-full items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-4">
               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral/20 text-neutral transition-colors group-hover:text-foreground">
                 <Receipt className="h-4 w-4" strokeWidth={1.5} />
               </div>
               <div className="flex min-w-0 flex-col">
                 <span className="text-body font-normal leading-tight text-foreground truncate">Totale Stimato</span>
                 <span className="mt-1 text-caption uppercase tracking-wider text-neutral truncate">Itinerario Completo</span>
               </div>
            </div>
            <div className="flex shrink-0 flex-col items-end">
              <span className="text-body font-normal text-foreground">34.580 L</span>
              <span className="mt-1 text-caption font-normal text-neutral">~ 345 €</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
