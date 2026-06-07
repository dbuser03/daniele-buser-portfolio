"use client";

import "./theme.css";
import { Button } from "./components/Button";
import { Badge } from "./components/Badge";
import { Switch } from "./components/Switch";
import { Card } from "./components/Card";
import { useBasicElementsShowcase } from "./hooks/useBasicElementsShowcase";
import { usePreloaderCard } from "./hooks/usePreloaderCard";
import { useSystemDiagnostics } from "./hooks/useSystemDiagnostics";
import { PRELOADER_CONSTANTS } from "./constants/preloader";

export default function LeonardoUI() {
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
    <div className="project-theme-leonardo-berselli-portfolio flex w-full flex-col gap-3 text-left">
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

      <div className="w-full space-y-3 text-(--foreground)">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="default"
            size="default"
            className="px-4 font-mono text-xs uppercase"
            onClick={incrementClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Click ({clickCount})
          </Button>
          <Button
            variant="outline"
            size="default"
            className="px-4 font-mono text-xs uppercase"
            onClick={resetClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="px-4 font-mono text-xs uppercase"
            disabled
          >
            Disabled
          </Button>
        </div>

        <div className="grid grid-cols-12 items-stretch gap-3">
          <div className="flex w-full items-center justify-between border border-(--neutral)/20 px-3 py-2.5 col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] leading-none tracking-widest text-(--neutral) uppercase">
                Engine
              </span>
              <Switch
                checked={engineActive}
                onCheckedChange={setEngineActive}
                size="default"
                className="flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Toggle engine"
              />
            </div>
            <div className="flex items-center">
              <span
                className={`font-mono text-[10px] leading-none tracking-wider uppercase ${
                  engineActive
                    ? "animate-pulse-white-neutral"
                    : "text-(--neutral)"
                }`}
              >
                {engineActive ? "RUNNING" : "STABLE"}
              </span>
            </div>
          </div>

          <div className="grid h-full grid-cols-2 gap-2 col-span-5">
            <Badge
              variant="default"
              className="flex h-5 w-full items-center justify-center px-2 font-mono text-[9.5px]"
            >
              0xLEO
            </Badge>
            <Badge
              variant="outline"
              className="flex h-5 w-full items-center justify-center px-2 font-mono text-[9.5px]"
            >
              MLOPS
            </Badge>
            <Badge
              variant="secondary"
              className="flex h-5 w-full items-center justify-center px-2 font-mono text-[9.5px]"
            >
              STABLE
            </Badge>
            <Badge
              variant="destructive"
              className="flex h-5 w-full items-center justify-center px-2 font-mono text-[9.5px]"
            >
              ERR_0
            </Badge>
          </div>
        </div>
      </div>

      <Card
        variant="square"
        className="group/card relative w-full border border-(--foreground)/10 p-4"
      >
        <div className="space-y-3">
          <div className="flex items-end justify-between font-mono text-xs tracking-[0.2em] text-(--neutral) uppercase">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-[1px] bg-(--foreground)" />
              <span className="text-(--foreground)">System Initialization</span>
            </div>
            <div className="font-mono font-normal text-(--foreground)">
              {Math.round(progress).toString().padStart(3, "0")}%
            </div>
          </div>

          <div className="relative h-px w-full overflow-hidden bg-(--foreground)/10">
            <div
              className="absolute inset-y-0 left-0 bg-(--foreground) transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid w-full grid-cols-4 gap-3 pt-0.5 font-mono text-[9px] tracking-widest uppercase">
            <div className="space-y-1">
              <div className="text-[7px] text-(--neutral)">
                SYSTEM_STATUS
              </div>
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
              <div className="text-[7px] text-(--neutral)">
                NETWORK_BRIDGE
              </div>
              <div>
                <span className="text-(--neutral)">UDP_LAT:</span>{" "}
                <span className="text-(--foreground)">
                  {PRELOADER_CONSTANTS.UDP_LATENCY}
                </span>
              </div>
              <div>
                <span className="text-(--neutral)">TCP_SYNC:</span>{" "}
                <span className="text-(--foreground)">ACTIVE</span>
              </div>
            </div>
            <div className="block space-y-1">
              <div className="text-[7px] text-(--neutral)">GEO_LOC</div>
              <div>
                <span className="text-(--neutral)">LAT:</span>{" "}
                <span className="text-(--foreground)">
                  {PRELOADER_CONSTANTS.GEO_LATITUDE}
                </span>
              </div>
              <div>
                <span className="text-(--neutral)">LON:</span>{" "}
                <span className="text-(--foreground)">
                  {PRELOADER_CONSTANTS.GEO_LONGITUDE}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-[7px] text-(--neutral)">LICENSE</div>
              <div>
                <span className="text-(--neutral)">OS:</span>{" "}
                <span className="text-(--foreground)">
                  {PRELOADER_CONSTANTS.OS_NAME}
                </span>
              </div>
              <div>
                <span className="text-(--neutral)">BUILD:</span>{" "}
                <span className="text-(--foreground)">
                  {PRELOADER_CONSTANTS.BUILD_YEAR}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="w-full">
        <div className="grid grid-cols-2 gap-3">
          <Card
            variant="square"
            className="group/card relative w-full border border-(--foreground)/10 p-4"
          >
            <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-(--neutral)">
              CLIENT_ENV
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-[1px] bg-(--neutral-dark)" />
                <span className="font-mono text-[11px] tracking-wider text-(--neutral) uppercase">
                  Hardware Specs
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono text-[10px]">
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">OS</span>
                  <span className="text-(--foreground)">
                    {sysInfo?.os || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">CORES</span>
                  <span className="text-(--foreground)">
                    {sysInfo?.cores || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">GPU_UNIT</span>
                  <span className="text-(--foreground)">
                    {sysInfo?.gpu || "---"}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-(--neutral)">VIEWPORT</span>
                  <span className="text-(--foreground)">
                    {sysInfo?.res || "---"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            variant="square"
            className="group/card relative w-full border border-(--foreground)/10 p-4"
          >
            <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-(--neutral)">
              LOCAL_METRICS
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 animate-pulse rounded-[1px] bg-(--foreground)" />
                <span className="font-mono text-[11px] tracking-wider text-(--neutral) uppercase">
                  Session Data
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono text-[10px]">
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">IPV4_ADDR</span>
                  <span className="text-(--foreground)">
                    {sysInfo?.ip || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">LANGUAGE</span>
                  <span className="text-(--foreground)">
                    {typeof navigator !== "undefined"
                      ? navigator.language
                      : "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-(--foreground)/10 pb-1">
                  <span className="text-(--neutral)">UPTIME</span>
                  <span className="text-(--foreground)">
                    {formatUptime(uptime)}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-(--neutral)">CONNECTION</span>
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
