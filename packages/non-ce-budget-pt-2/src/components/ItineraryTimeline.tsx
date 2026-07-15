import React, { useState } from "react";
import { 
  Plane, BusFront, Footprints, CarTaxiFront, Car, Coffee, Utensils, 
  MapPin, Clock, Coins, AlertCircle, Sunrise, Sun, Sunset, Landmark, 
  Beer, Map, Wine, Moon, Hotel, PartyPopper, CheckCircle2, BaggageClaim, Palmtree, ChevronDown
} from "lucide-react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import AnimatedTextSpan from "@/components/ui/AnimatedTextSpan";
import { m, AnimatePresence } from "motion/react";
import { useCursorContext } from "@/components/layout/cursor/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";

type Transport = {
  type: 'walk' | 'bus' | 'taxi' | 'car' | 'flight';
  duration?: string;
  details?: string;
  price?: string;
};

type Activity = {
  time: string;
  title: string;
  note?: string;
  price?: string;
  link?: string;
  warning?: boolean;
  icon?: React.ReactNode;
  transportNext?: Transport;
};

type DayPart = {
  id: string;
  title: string;
  icon: React.ReactNode;
  activities: Activity[];
};

type Day = {
  date: string;
  label: string;
  parts: DayPart[];
};

const ITINERARY: Day[] = [
  {
    date: "24 SETTEMBRE",
    label: "Giorno 1",
    parts: [
      {
        id: "24-mattina",
        title: "Mattina",
        icon: <Sunrise className="w-5 h-5" />,
        activities: [
          { time: "08:45 - 10:40", title: "MXP → TIA", note: "Volo W4 5024", icon: <Plane className="w-5 h-5" />, transportNext: { type: 'bus', duration: "46 min", details: "LU-NA Bus", price: "400 L" } },
          { time: "11:54 - 12:40", title: "TIA → Tirana Central Bus Stop", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'walk', duration: "8 min" } },
          { time: "12:50 - 13:00", title: "Bablock - Luggage Storage", note: "Deposito bagagli", icon: <BaggageClaim className="w-5 h-5" />, transportNext: { type: 'walk', duration: "16 min" } },
          { time: "13:15 - 14:15", title: "Gjelber Tirana", price: "1200 L", warning: true, note: "Prenotare", icon: <Utensils className="w-5 h-5" />, transportNext: { type: 'walk', duration: "11 min" } },
        ]
      },
      {
        id: "24-pomeriggio",
        title: "Pomeriggio",
        icon: <Sun className="w-5 h-5" />,
        activities: [
          { time: "14:30 - 15:30", title: "Museo della Casa delle Foglie", price: "700 L", icon: <Landmark className="w-5 h-5" />, transportNext: { type: 'walk', duration: "6 min" } },
          { time: "16:30 - 18:30", title: "Eyes of Tirana Free Tour", price: "1000 L", link: "https://www.freetour.com/tirana/explore-the-hidden-gems-of-tiranas-historic-heart", icon: <Map className="w-5 h-5" />, transportNext: { type: 'walk', duration: "8 min" } },
          { time: "18:40 - 18:50", title: "Bablock - Luggage Storage", price: "240 L", icon: <BaggageClaim className="w-5 h-5" />, transportNext: { type: 'walk', duration: "22 min" } },
          { time: "19:00 - 20:15", title: "Lemon House", note: "Check-in e sistemazione", icon: <Hotel className="w-5 h-5" />, transportNext: { type: 'walk', duration: "13 min" } },
        ]
      },
      {
        id: "24-sera",
        title: "Sera",
        icon: <Moon className="w-5 h-5" />,
        activities: [
          { time: "20:30 - 22:30", title: "Cena da Nalu", price: "2500 L", warning: true, note: "Prenotare", icon: <Utensils className="w-5 h-5" />, transportNext: { type: 'walk', duration: "17 min" } },
          { time: "22:45 - 01:45", title: "Shisha Room Food & Cocktail Bar", price: "1500 L", warning: true, note: "Prenotare", icon: <Wine className="w-5 h-5" />, transportNext: { type: 'taxi', duration: "12 min", price: "240 L" } },
          { time: "02:00", title: "Lemon House", note: "Rientro", icon: <Hotel className="w-5 h-5" /> },
        ]
      }
    ]
  },
  {
    date: "25 SETTEMBRE",
    label: "Giorno 2",
    parts: [
      {
        id: "25-mattina",
        title: "Mattina",
        icon: <Sunrise className="w-5 h-5" />,
        activities: [
          { time: "08:00", title: "Sveglia", icon: <Clock className="w-5 h-5" />, transportNext: { type: 'bus', duration: "8 min", details: "11 Hoxha Tahsim → Biblioteka", price: "40 L" } },
          { time: "09:00 - 10:30", title: "Colazione Brunch da Noor", price: "1500 L", warning: true, note: "Prenotare", icon: <Coffee className="w-5 h-5" />, transportNext: { type: 'walk', duration: "2 min" } },
          { time: "10:50 - 11:20", title: "Visita Moschea Et'hem Bej", icon: <Landmark className="w-5 h-5" />, transportNext: { type: 'walk', duration: "4 min" } },
          { time: "11:30 - 12:30", title: "Visita Bunk'Art 2", price: "900 L", icon: <Landmark className="w-5 h-5" />, transportNext: { type: 'walk', duration: "4 min" } },
          { time: "12:45 - 13:45", title: "Pranzo al Castello di Tirana", price: "2000 L", icon: <Utensils className="w-5 h-5" />, transportNext: { type: 'walk', duration: "8 min" } },
          { time: "-", title: "Spostamento", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "20 min", details: "1B Shallvaret → Kodra Diellit 2", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "37 min" } },
        ]
      },
      {
        id: "25-pomeriggio",
        title: "Pomeriggio",
        icon: <Sun className="w-5 h-5" />,
        activities: [
          { time: "15:00 - 15:15", title: "Lapidari", icon: <MapPin className="w-5 h-5" />, transportNext: { type: 'walk', duration: "7 min" } },
          { time: "15:30 - 15:45", title: "Birretta da Te Pamja", price: "400 L", icon: <Beer className="w-5 h-5" />, transportNext: { type: 'walk', duration: "38 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "30 min", details: "8C Sauk i Vjeter → 9 Katëshet B", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "4 min" } },
          { time: "17:00 - 18:30", title: "Centro commerciale Toptani", note: "Spesa + giretto", price: "2000 L", icon: <MapPin className="w-5 h-5" />, transportNext: { type: 'walk', duration: "5 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "8 min", details: "11 Biblioteka → Hoxha Tahsim", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "6 min" } },
          { time: "19:00", title: "Lemon House", icon: <Hotel className="w-5 h-5" /> },
        ]
      },
      {
        id: "25-sera",
        title: "Sera",
        icon: <Moon className="w-5 h-5" />,
        activities: [
          { time: "20:00 - 02:00", title: "Apericena e giochi alcolici", icon: <Wine className="w-5 h-5" /> },
          { time: "21:00", title: "Ritiro macchina a noleggio in ostello", note: "Noleggio + benzina", price: "2500 L", icon: <Car className="w-5 h-5" /> },
        ]
      }
    ]
  },
  {
    date: "26 SETTEMBRE",
    label: "Giorno 3",
    parts: [
      {
        id: "26-mattina",
        title: "Mattina",
        icon: <Sunrise className="w-5 h-5" />,
        activities: [
          { time: "06:00", title: "Sveglia", icon: <Clock className="w-5 h-5" />, transportNext: { type: 'car', duration: "3 h 30 min" } },
          { time: "10:30 - 15:30", title: "Spiaggia di Drymades", note: "Pranzo al sacco + ombrellone", price: "500 L", icon: <Palmtree className="w-5 h-5" />, transportNext: { type: 'car', duration: "50 min" } },
        ]
      },
      {
        id: "26-pomeriggio",
        title: "Pomeriggio",
        icon: <Sun className="w-5 h-5" />,
        activities: [
          { time: "16:30 - 18:30", title: "Passeggiata lungomare + drink a Valona", price: "800 L", icon: <Beer className="w-5 h-5" />, transportNext: { type: 'car', duration: "2 h 15 min" } },
        ]
      },
      {
        id: "26-sera",
        title: "Sera",
        icon: <Moon className="w-5 h-5" />,
        activities: [
          { time: "20:45 - 23:00", title: "Lemon House", note: "Pizza da asporto + preserata", price: "800 L", icon: <Utensils className="w-5 h-5" /> },
          { time: "21:00", title: "Riconsegna macchina a noleggio", icon: <Car className="w-5 h-5" />, transportNext: { type: 'taxi', duration: "15 min", price: "300 L" } },
          { time: "00:00 - 02:45", title: "Check In Festival", warning: true, note: "Confermare date", price: "1500 L", icon: <PartyPopper className="w-5 h-5" />, transportNext: { type: 'taxi', duration: "15 min", price: "300 L" } },
          { time: "03:00", title: "Lemon House", icon: <Hotel className="w-5 h-5" /> },
        ]
      }
    ]
  },
  {
    date: "27 SETTEMBRE",
    label: "Giorno 4",
    parts: [
      {
        id: "27-mattina",
        title: "Mattina",
        icon: <Sunrise className="w-5 h-5" />,
        activities: [
          { time: "10:30", title: "Sveglia", icon: <Clock className="w-5 h-5" />, transportNext: { type: 'walk', duration: "5 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "26 min", details: "11 Hoxha Tahsim → Thesari", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "10 min" } },
          { time: "11:45 - 12:15", title: "Dajti Express Cable Car", price: "1500 L", icon: <MapPin className="w-5 h-5" />, transportNext: { type: 'walk', duration: "1 min" } },
          { time: "12:30", title: "Fusha e Dajtit", warning: true, note: "Prenotare", price: "2000 L", icon: <Utensils className="w-5 h-5" /> },
        ]
      },
      {
        id: "27-pomeriggio",
        title: "Pomeriggio",
        icon: <Sun className="w-5 h-5" />,
        activities: [
          { time: "13:30", title: "Minigolf e passeggiata", price: "700 L", icon: <MapPin className="w-5 h-5" />, transportNext: { type: 'walk', duration: "1 min" } },
          { time: "15:00 - 15:30", title: "Dajti Express Cable Car", icon: <MapPin className="w-5 h-5" />, transportNext: { type: 'walk', duration: "8 min" } },
          { time: "15:45 - 17:00", title: "Bunk'Art 1", price: "900 L", icon: <Landmark className="w-5 h-5" />, transportNext: { type: 'walk', duration: "10 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "26 min", details: "11 Thesari → Hoxha Tahsim", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "5 min" } },
          { time: "18:00", title: "Lemon House", icon: <Hotel className="w-5 h-5" />, transportNext: { type: 'walk', duration: "3 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "11 min", details: "16A Odhise Paskali → Xhamia Namazgjasë", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "11 min" } },
        ]
      },
      {
        id: "27-sera",
        title: "Sera",
        icon: <Moon className="w-5 h-5" />,
        activities: [
          { time: "19:30 - 21:00", title: "Era Vila Restaurant", warning: true, note: "Prenotare", price: "1500 L", icon: <Utensils className="w-5 h-5" />, transportNext: { type: 'walk', duration: "20 min" } },
          { time: "21:30 - 23:00", title: "Alkimia Shisha Lounge", warning: true, note: "Prenotare", price: "1500 L", icon: <Wine className="w-5 h-5" />, transportNext: { type: 'walk', duration: "13 min" } },
          { time: "23:30 - 01:45", title: "Blloku", note: "Locali e discoteche", price: "1000 L", icon: <PartyPopper className="w-5 h-5" />, transportNext: { type: 'taxi', duration: "15 min", price: "300 L" } },
          { time: "02:00", title: "Lemon House", icon: <Hotel className="w-5 h-5" /> },
        ]
      }
    ]
  },
  {
    date: "28 SETTEMBRE",
    label: "Giorno 5",
    parts: [
      {
        id: "28-mattina",
        title: "Mattina",
        icon: <Sunrise className="w-5 h-5" />,
        activities: [
          { time: "08:00", title: "Sveglia", icon: <Clock className="w-5 h-5" /> },
          { time: "09:00", title: "Check out", icon: <BaggageClaim className="w-5 h-5" />, transportNext: { type: 'walk', duration: "3 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "17 min", details: "16A Odhise Paskali → Shallvaret", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "20 min" } },
          { time: "10:00 - 10:30", title: "Colazione Lake View Bar", price: "400 L", icon: <Coffee className="w-5 h-5" />, transportNext: { type: 'walk', duration: "5 min" } },
          { time: "10:30 - 12:00", title: "Giretto in autonomia al parco", icon: <Palmtree className="w-5 h-5" />, transportNext: { type: 'walk', duration: "1 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "8 min", details: "13B Rektorati → 9 Katëshet A", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "1 min" } },
          { time: "-", title: "Spostamento in bus", icon: <BusFront className="w-5 h-5" />, transportNext: { type: 'bus', duration: "34 min", details: "4 9 Katëshet B → Yrshek", price: "40 L" } },
          { time: "-", title: "Spostamento a piedi", icon: <Footprints className="w-5 h-5" />, transportNext: { type: 'walk', duration: "6 min" } },
          { time: "13:30 - 15:00", title: "Pranzo Te Stela Beergarden", warning: true, note: "Prenotare", price: "2500 L", icon: <Utensils className="w-5 h-5" /> },
        ]
      },

      {
        id: "28-pomeriggio",
        title: "Pomeriggio",
        icon: <Sun className="w-5 h-5" />,
        activities: [
          { time: "15:00 - 16:00", title: "Tour birrificio", warning: true, note: "Prenotare e capire fattibilità", icon: <Utensils className="w-5 h-5" />, transportNext: { type: 'taxi', duration: "20 min", price: "600 L" } },
        ]
      },
      {
        id: "28-sera",
        title: "Sera",
        icon: <Moon className="w-5 h-5" />,
        activities: [
          { time: "19:10 - 21:15", title: "TIA → MXP", note: "Volo W4 5027", icon: <Plane className="w-5 h-5" /> },
          { time: "20:05 - 22:00", title: "TIA → BGY", note: "Volo W4 5019", icon: <Plane className="w-5 h-5" /> },
        ]
      }
    ]
  }
];

function TransportNode({ transport }: { transport: Transport }) {
  const getIcon = () => {
    switch (transport.type) {
      case 'walk': return <Footprints className="w-3.5 h-3.5" />;
      case 'bus': return <BusFront className="w-3.5 h-3.5" />;
      case 'taxi': return <CarTaxiFront className="w-3.5 h-3.5" />;
      case 'car': return <Car className="w-3.5 h-3.5" />;
      case 'flight': return <Plane className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative flex w-full gap-4 sm:gap-6">
      <div className="relative flex flex-col items-center w-12 sm:w-16 shrink-0">
        <div className="absolute top-0 bottom-0 w-px border-l-[1.5px] border-dashed border-neutral"></div>
      </div>
      
      <div className="flex flex-nowrap items-center gap-2 sm:gap-3 py-1.5 pr-2 sm:pr-4 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-transparent border border-neutral text-[10px] md:text-caption font-normal text-neutral shrink-0">
          {getIcon()}
          <span>{transport.duration}</span>
        </div>
        
        {transport.details && (
          <span className="font-normal text-neutral truncate max-w-[200px] sm:max-w-[300px] text-xs md:text-sm">
            {transport.details}
          </span>
        )}
        
        {transport.price && (
          <div className="ml-auto flex items-center gap-1 font-normal text-neutral px-2 py-0.5 rounded border border-neutral shrink-0 text-[10px] md:text-caption">
            <Coins className="w-3 h-3 text-neutral" />
            <span>{transport.price}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityNode({ activity }: { activity: Activity }) {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("interactive");

  if (activity.title.toLowerCase().includes("spostamento")) {
    return null;
  }

  return (
    <div className="relative flex w-full gap-4 sm:gap-6 group min-h-[4rem]">
      <div className="relative flex flex-col items-center w-12 sm:w-16 shrink-0">
        <div className="absolute top-6 bottom-0 w-px bg-neutral"></div>
        <div className="relative z-10 flex w-10 h-10 items-center justify-center rounded-full bg-card-light text-background mt-3 shrink-0 [&>svg]:w-4 [&>svg]:h-4">
          {activity.icon || <CheckCircle2 className="w-4 h-4" />}
        </div>
      </div>
      
      <div className="flex flex-col flex-1 min-w-0 py-2 pr-2 sm:pr-4">
        <div className="flex flex-col w-full bg-card-light rounded-2xl p-4 sm:p-5 transition-colors">
          <div className="flex flex-row items-start justify-between gap-3 mb-2">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] md:text-caption font-normal text-accent uppercase">
                {activity.time}
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-body md:text-body-lg font-normal text-background truncate">{activity.title}</span>
                {activity.warning && (
                  <AlertCircle className="w-4 h-4 text-accent shrink-0" strokeWidth={2} />
                )}
              </div>
            </div>
            
            {activity.price && (
              <div className="flex shrink-0 items-center gap-1.5 font-normal text-neutral-dark bg-foreground px-2.5 py-1 rounded-lg border border-neutral-dark w-fit text-[10px] md:text-caption">
                <Coins className="w-3.5 h-3.5 text-neutral-dark" />
                <span>{activity.price}</span>
              </div>
            )}
          </div>
          
          {activity.note && (
             <span className="font-normal text-neutral-dark truncate text-xs md:text-sm">{activity.note}</span>
          )}
          
          {activity.link && (
            <a 
              href={activity.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs md:text-sm font-normal uppercase truncate inline-block w-fit mt-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatedTextSpan 
                isActive={false}
                inactiveColor="var(--color-neutral-dark)"
                hoverColor="var(--color-background)"
              >
                Vedi dettagli
              </AnimatedTextSpan>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelinePart({ part, autoOpenPhase }: { part: typeof ITINERARY[0]['parts'][0], autoOpenPhase: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("interactive");

  React.useEffect(() => {
    if (autoOpenPhase !== null) {
      setIsOpen(autoOpenPhase === part.id);
    }
  }, [autoOpenPhase, part.id]);

  return (
    <div className="flex flex-col w-full mb-2 sm:mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex w-full relative items-center gap-6 sm:gap-8 text-left group outline-none"
      >
        <div className="relative flex flex-col items-center justify-center w-12 sm:w-16 shrink-0 self-stretch">
          {isOpen && <div className="absolute top-1/2 -bottom-6 w-px bg-gradient-to-b from-transparent to-neutral"></div>}
          <div className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-background text-foreground shadow-sm [&>svg]:w-5 [&>svg]:h-5 transition-transform group-hover:scale-105">
            {part.icon}
          </div>
        </div>
        <div className="flex items-center flex-1 pr-2 sm:pr-4">
          <h3 className="text-section md:text-display-sm font-normal text-background leading-none -mt-2 flex-1">{part.title}</h3>
          <m.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-background shrink-0 ml-4"
          >
            <ChevronDown strokeWidth={1} className="w-6 h-6 sm:w-8 sm:h-8" />
          </m.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col w-full pt-6 pb-6 sm:pb-8">
              {part.activities.map((act, i) => (
                <div key={i} className="flex flex-col w-full">
                  <ActivityNode activity={act} />
                  {act.transportNext && <TransportNode transport={act.transportNext} />}
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ItineraryTimeline() {
  const { handleMouseEnter, handleMouseLeave, startPulse, stopPulse } = useCursorInteraction("pulse");
  const { cursorSize } = useCursorContext();
  const [activeDay, setActiveDay] = useState(0);
  const [autoOpenPhase, setAutoOpenPhase] = useState<string | null>(null);

  const TOTAL_DAYS = 5;
  const START_DATE = new Date("2024-09-24T00:00:00");
  const END_DATE = new Date("2024-09-28T23:59:59");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isDragging = React.useRef(false);
  const dragStartOffset = React.useRef(0);

  React.useEffect(() => {
    const updateTime = () => {
      if (isDragging.current) return;
      const now = new Date();
      if (now >= START_DATE && now <= END_DATE) {
        const totalMs = END_DATE.getTime() - START_DATE.getTime();
        const elapsedMs = now.getTime() - START_DATE.getTime();
        setProgress(Math.max(0, Math.min(1, elapsedMs / totalMs)));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateProgressFromEvent = React.useCallback((clientX: number, offset: number = 0) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const adjustedX = clientX - offset;
    const x = Math.max(0, Math.min(adjustedX - rect.left - 40, rect.width - 80));
    const newProgress = x / (rect.width - 80);
    setProgress(newProgress);
  }, []);

  React.useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        updateProgressFromEvent(e.clientX, dragStartOffset.current);
      }
    };
    const onPointerUp = () => {
      if (isDragging.current) {
        const thumbEl = document.getElementById("timeline-thumb");
        if (thumbEl && thumbEl.matches(':hover')) {
          startPulse();
        } else {
          handleMouseLeave();
        }
      }
      isDragging.current = false;
      dragStartOffset.current = 0;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [updateProgressFromEvent, handleMouseLeave, startPulse]);

  React.useEffect(() => {
    const totalHours = progress * (TOTAL_DAYS * 24);
    let dayIdx = Math.floor(totalHours / 24);
    if (dayIdx >= TOTAL_DAYS) dayIdx = TOTAL_DAYS - 1;
    
    const hourOfDay = totalHours % 24;
    let phase = "";
    if (hourOfDay < 12) phase = "mattina";
    else if (hourOfDay < 18) phase = "pomeriggio";
    else phase = "sera";

    const daysList = ["24", "25", "26", "27", "28"];
    const phaseId = `${daysList[dayIdx]}-${phase}`;
    
    setActiveDay(dayIdx);
    setAutoOpenPhase(phaseId);
  }, [progress]);

  return (
    <div className="w-full flex flex-col pb-0 items-start relative">
      {/* Timeline (Left) */}
      <div className="flex flex-col relative w-full">
        {/* Selettore Orizzontale a Scorrimento (Minimalist Redesign) */}
      <div className="w-full mb-20 select-none touch-none">
        <div 
          ref={containerRef}
          onPointerDown={(e) => {
            isDragging.current = true;
            stopPulse();
            cursorSize.set(CURSOR_SIZE.xs);
            
            const thumbEl = document.getElementById("timeline-thumb");
            if (thumbEl && thumbEl.contains(e.target as Node)) {
               const thumbRect = thumbEl.getBoundingClientRect();
               const thumbCenterX = thumbRect.left + thumbRect.width / 2;
               dragStartOffset.current = e.clientX - thumbCenterX;
            } else {
               dragStartOffset.current = 0;
               updateProgressFromEvent(e.clientX, 0);
            }
          }}
          className="relative w-full h-8 flex items-center cursor-pointer group"
        >
          {/* Hairline Track */}
          <div className="absolute left-[40px] right-[40px] h-px bg-neutral" />
          
          {/* Active Hairline */}
          <div 
            className="absolute left-[40px] h-px bg-background pointer-events-none"
            style={{ width: `calc(${progress} * (100% - 80px))` }}
          />

          {/* Ticks and Dates */}
          {Array.from({ length: TOTAL_DAYS + 1 }).map((_, i) => {
             const isLast = i === TOTAL_DAYS;
             const isPassed = (progress * TOTAL_DAYS) >= i;
             return (
              <div 
                key={i} 
                className="absolute top-1/2 flex flex-col items-center pointer-events-none"
                style={{ 
                  left: `calc(40px + ${(i / TOTAL_DAYS)} * (100% - 80px))`,
                }}
              >
                <div className={`absolute -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-colors duration-300 ${isPassed ? 'bg-background' : 'bg-neutral'}`} />
                {!isLast && (
                  <span 
                    className={`absolute left-1/2 -translate-x-1/2 top-6 sm:top-8 text-[11px] sm:text-xs font-normal uppercase whitespace-nowrap transition-colors duration-300 ${isPassed ? 'text-background' : 'text-neutral'}`}
                  >
                    {24 + i} Set
                  </span>
                )}
              </div>
            );
          })}
          
          {/* Accent Dot Thumb with Tooltip Above */}
          <div 
            id="timeline-thumb"
            className="absolute top-1/2 z-20 flex items-center justify-center -translate-y-1/2 -translate-x-1/2 cursor-none"
            style={{ 
              left: `calc(40px + ${progress} * (100% - 80px))`
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-6 h-6 bg-foreground border-2 border-accent rounded-full" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-neutral-dark text-xs sm:text-sm font-normal whitespace-nowrap pointer-events-none">
              {(() => {
                const totalH = progress * (TOTAL_DAYS * 24);
                const day = 24 + Math.floor(totalH / 24);
                const h = Math.floor(totalH % 24).toString().padStart(2, '0');
                const m = Math.floor((totalH % 1) * 60).toString().padStart(2, '0');
                return `${Math.min(day, 28)} Set — ${h}:${m}`;
              })()}
            </div>
          </div>
        </div>
      </div>

        <div className="flex flex-col w-full relative min-h-[400px] sm:min-h-[500px]">
          {ITINERARY[activeDay].parts.map((part) => (
            <TimelinePart key={part.id} part={part} autoOpenPhase={autoOpenPhase} />
          ))}
        </div>
      </div>
    </div>
  );
}
