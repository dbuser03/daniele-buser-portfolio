import { cn } from "../utils/cn";
import { Plane } from "lucide-react";

interface FlightTicketProps {
  flightNumber: string;
  date: string;
  boardingTime: string;
  departure: {
    city: string;
    code: string;
    time: string;
  };
  arrival: {
    city: string;
    code: string;
    time: string;
  };
  passenger: string;
  seat: string;
  className?: string;
}

export default function FlightTicket({
  flightNumber,
  date,
  boardingTime,
  departure,
  arrival,
  passenger,
  seat,
  className,
}: FlightTicketProps) {
  return (
    <div className={cn("flex w-full flex-row overflow-hidden rounded-xl bg-card-light text-background shadow-lg", className)}>
        
        <div className="flex flex-1 flex-col p-2 pr-3 sm:p-4 sm:pr-5">
          <div className="mb-1 sm:mb-3 flex items-center justify-between">
            <span className="text-[10px] sm:text-caption font-bold tracking-widest text-neutral-dark">BOARDING PASS</span>
            <span className="text-caption sm:text-body text-accent">{flightNumber}</span>
          </div>
          
          <div className="flex items-start justify-between pb-1 sm:pb-3">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-display-sm font-medium leading-none">{departure.code}</span>
              <span className="text-[10px] sm:text-body mt-1 text-neutral-dark">{departure.city}</span>
              <span className="text-[10px] sm:text-body mt-1 text-background">{departure.time}</span>
            </div>
            
            <div className="mt-1 sm:mt-4 flex flex-1 flex-col items-center px-2 sm:px-4">
              <div className="text-accent mb-1 sm:mb-3">
                <Plane className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.5} />
              </div>
              <div className="w-full border-b border-dashed border-neutral"></div>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-2xl sm:text-display-sm font-medium leading-none">{arrival.code}</span>
              <span className="text-[10px] sm:text-body mt-1 text-neutral-dark">{arrival.city}</span>
              <span className="text-[10px] sm:text-body mt-1 text-background">{arrival.time}</span>
            </div>
          </div>

          <div className="mt-1 sm:mt-2 flex justify-between border-t border-neutral pt-1 sm:pt-2">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-caption uppercase tracking-wider text-neutral-dark">Passenger</span>
              <span className="text-[10px] sm:text-body font-medium truncate max-w-24 sm:max-w-none">{passenger}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] sm:text-caption uppercase tracking-wider text-neutral-dark">Date</span>
              <span className="text-[10px] sm:text-body font-medium">{date}</span>
            </div>
          </div>
        </div>

        <div className="relative flex w-24 sm:w-40 flex-col justify-between border-l border-dashed border-neutral p-2 sm:p-4 bg-foreground">
          <div className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-card-dark"></div>
          <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-card-dark"></div>
          
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-caption uppercase tracking-wider text-neutral-dark">Seat</span>
            <span className="text-body-lg sm:text-section font-medium text-accent">{seat}</span>
          </div>
          
          <div className="mt-1 sm:mt-3 flex flex-col">
            <span className="text-[9px] sm:text-caption uppercase tracking-wider text-neutral-dark">Boarding</span>
            <span className="text-[10px] sm:text-body text-background">{boardingTime}</span>
          </div>

          <div className="mt-1 sm:mt-3 flex flex-col">
            <span className="text-[9px] sm:text-caption uppercase tracking-wider text-neutral-dark">Flight</span>
            <span className="text-[10px] sm:text-body text-background">{flightNumber}</span>
          </div>
        </div>
        
      </div>
  );
}
