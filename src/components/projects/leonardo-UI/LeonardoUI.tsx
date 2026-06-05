"use client";

import { Button } from "./Button";
import { Badge } from "./Badge";
import { Switch } from "./Switch";
import { Card } from "./Card";
import { useBasicElementsShowcase } from "./hooks/useBasicElementsShowcase";
import { usePreloaderCard } from "./hooks/usePreloaderCard";
import { useSystemDiagnostics } from "./hooks/useSystemDiagnostics";
import { PRELOADER_CONSTANTS } from "./constants/preloader";

export function LeonardoUI() {
  // Call extracted logic hooks
  const {
    engineActive,
    setEngineActive,
    clickCount,
    incrementClick,
    resetClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useBasicElementsShowcase();

  const { progress, coreLoad } = usePreloaderCard();

  const { sysInfo, uptime, formatUptime } = useSystemDiagnostics();

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      <style>{`
        @keyframes pulse-white-neutral {
          0%, 100% {
            color: var(--foreground);
            opacity: 1;
          }
          50% {
            color: var(--neutral);
            opacity: 0.6;
          }
        }
        .animate-pulse-white-neutral {
          animation: pulse-white-neutral 1.5s infinite ease-in-out;
        }
      `}</style>

      <div className="w-full space-y-4 border-b border-(--neutral-dark)/20 pb-4 text-(--foreground)">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="default"
            size="default"
            className="font-mono text-xs uppercase px-4"
            onClick={incrementClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Click ({clickCount})
          </Button>
          <Button
            variant="outline"
            size="default"
            className="font-mono text-xs uppercase px-4"
            onClick={resetClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="font-mono text-xs uppercase px-4"
            disabled
          >
            Disabled
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-stretch">
          <div className="sm:col-span-7 border border-(--neutral-dark)/20 bg-(--neutral-dark)/5 px-3 py-2.5 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="text-(--neutral) font-mono text-[10px] uppercase tracking-widest select-none leading-none">
                Engine
              </span>
              <Switch
                checked={engineActive}
                onCheckedChange={setEngineActive}
                size="default"
                className="flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="flex items-center">
              <span
                className={`font-mono text-[10px] uppercase tracking-wider select-none leading-none ${
                  engineActive ? "animate-pulse-white-neutral" : "text-(--neutral-dark)"
                }`}
              >
                {engineActive ? "RUNNING" : "STABLE"}
              </span>
            </div>
          </div>

          <div className="sm:col-span-5 grid grid-cols-2 gap-2 h-full">
            <Badge variant="default" className="h-5 px-2 text-[9.5px] font-mono flex items-center justify-center w-full">
              0xLEO
            </Badge>
            <Badge variant="outline" className="h-5 px-2 text-[9.5px] font-mono flex items-center justify-center w-full">
              MLOPS
            </Badge>
            <Badge variant="secondary" className="h-5 px-2 text-[9.5px] font-mono flex items-center justify-center w-full">
              STABLE
            </Badge>
            <Badge variant="destructive" className="h-5 px-2 text-[9.5px] font-mono flex items-center justify-center w-full">
              ERR_0
            </Badge>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3 py-2 px-1 text-(--foreground) border-b border-(--neutral-dark)/20 pb-4">
        <div className="text-(--neutral) flex items-end justify-between font-mono text-[9px] tracking-[0.2em] uppercase md:text-xs">
          <div className="flex items-center gap-3">
            <div className="bg-(--foreground) h-2 w-2 animate-pulse rounded-[1px]" />
            <span className="text-(--foreground)">System Initialization</span>
          </div>
          <div className="text-(--foreground) font-normal font-mono">
            {Math.round(progress).toString().padStart(3, "0")}%
          </div>
        </div>

        <div className="bg-(--foreground)/10 relative h-px w-full overflow-hidden">
          <div
            className="bg-(--foreground) absolute inset-y-0 left-0 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid w-full grid-cols-2 gap-4 pt-1 font-mono text-[8px] tracking-widest uppercase md:grid-cols-4 md:text-[9px]">
          <div className="space-y-1">
            <div className="text-(--neutral-dark) text-[7px]">SYSTEM_STATUS</div>
            <div>
              <span className="text-(--neutral)">CORE_LOAD:</span>{" "}
              <span className="text-(--foreground)">{coreLoad}%</span>
            </div>
            <div>
              <span className="text-(--neutral)">MEM_ALLOC:</span>{" "}
              <span className="text-(--foreground)">OK</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-(--neutral-dark) text-[7px]">NETWORK_BRIDGE</div>
            <div>
              <span className="text-(--neutral)">UDP_LAT:</span>{" "}
              <span className="text-(--foreground)">{PRELOADER_CONSTANTS.UDP_LATENCY}</span>
            </div>
            <div>
              <span className="text-(--neutral)">TCP_SYNC:</span>{" "}
              <span className="text-(--foreground)">ACTIVE</span>
            </div>
          </div>
          <div className="hidden space-y-1 md:block">
            <div className="text-(--neutral-dark) text-[7px]">GEO_LOC</div>
            <div>
              <span className="text-(--neutral)">LAT:</span>{" "}
              <span className="text-(--foreground)">{PRELOADER_CONSTANTS.GEO_LATITUDE}</span>
            </div>
            <div>
              <span className="text-(--neutral)">LON:</span>{" "}
              <span className="text-(--foreground)">{PRELOADER_CONSTANTS.GEO_LONGITUDE}</span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-(--neutral-dark) text-[7px]">LICENSE</div>
            <div>
              <span className="text-(--neutral)">OS:</span>{" "}
              <span className="text-(--foreground)">{PRELOADER_CONSTANTS.OS_NAME}</span>
            </div>
            <div>
              <span className="text-(--neutral)">BUILD:</span>{" "}
              <span className="text-(--foreground)">{PRELOADER_CONSTANTS.BUILD_YEAR}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            variant="square"
            className="bg-(--card-dark) group/card relative w-full p-4 border border-(--foreground)/10"
          >
            <div className="text-(--neutral-dark) absolute top-0 right-0 p-3 font-mono text-[9px]">
              CLIENT_ENV
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-(--neutral-dark) h-2.5 w-2.5 rounded-[1px]" />
                <span className="text-(--neutral) font-mono text-[11px] tracking-wider uppercase">
                  Hardware Specs
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono text-[10px]">
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">OS</span>
                  <span className="text-(--foreground)">{sysInfo?.os || "---"}</span>
                </div>
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">CORES</span>
                  <span className="text-(--foreground)">{sysInfo?.cores || "---"}</span>
                </div>
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">GPU_UNIT</span>
                  <span className="text-(--foreground)">{sysInfo?.gpu || "---"}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">VIEWPORT</span>
                  <span className="text-(--foreground)">{sysInfo?.res || "---"}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            variant="square"
            className="bg-(--card-dark) group/card relative w-full p-4 border border-(--foreground)/10"
          >
            <div className="text-(--neutral-dark) absolute top-0 right-0 p-3 font-mono text-[9px]">
              LOCAL_METRICS
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-(--foreground) h-2.5 w-2.5 animate-pulse rounded-[1px]" />
                <span className="text-(--neutral) font-mono text-[11px] tracking-wider uppercase">
                  Session Data
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono text-[10px]">
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">IPV4_ADDR</span>
                  <span className="text-(--foreground)">{sysInfo?.ip || "---"}</span>
                </div>
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">LANGUAGE</span>
                  <span className="text-(--foreground)">
                    {typeof navigator !== "undefined"
                      ? navigator.language
                      : "---"}
                  </span>
                </div>
                <div className="border-b border-(--foreground)/10 flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">UPTIME</span>
                  <span className="text-(--foreground)">{formatUptime(uptime)}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-(--neutral-dark)">CONNECTION</span>
                  <span className="text-(--foreground)">SECURE</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
