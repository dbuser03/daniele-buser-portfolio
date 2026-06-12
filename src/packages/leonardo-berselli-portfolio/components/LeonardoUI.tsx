"use client";

import { m } from "motion/react";
import { cn } from "@/utils/cn";
import { useBasicElementsShowcase } from "../hooks/useBasicElementsShowcase";
import { usePreloaderCard } from "../hooks/usePreloaderCard";
import { useSystemDiagnostics } from "../hooks/useSystemDiagnostics";
import { PRELOADER_CONSTANTS } from "../constants/preloader";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Switch } from "./Switch";
import { Card } from "./Card";
import { enginePulseVariants } from "../utils/motion";
import "../styles.css";

export default function LeonardoUI() {
  const {
    isEngineActive,
    setEngineActive,
    clickCount,
    incrementClick,
    resetClick,
  } = useBasicElementsShowcase();

  const { progress, coreLoad } = usePreloaderCard();
  const { sysInfo, uptime, formatUptime } = useSystemDiagnostics();

  return (
    <div className="project-theme-leonardo-berselli-portfolio flex w-full flex-col gap-3 text-left">
      <div className="w-full space-y-3 text-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="default"
            size="md"
            className="px-4 font-mono text-xs uppercase"
            onClick={incrementClick}
          >
            Click ({clickCount})
          </Button>
          <Button
            variant="outline"
            size="md"
            className="px-4 font-mono text-xs uppercase"
            onClick={resetClick}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="px-4 font-mono text-xs uppercase"
            disabled
          >
            Disabled
          </Button>
        </div>

        <div className="grid grid-cols-12 items-stretch gap-3">
          <div className="col-span-7 flex w-full items-center justify-between border border-neutral/20 px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="font-mono caption text-neutral uppercase">
                Engine
              </span>
              <Switch
                checked={isEngineActive}
                onCheckedChange={setEngineActive}
                size="md"
                aria-label="Toggle engine"
              />
            </div>
            <div className="flex items-center">
              <m.span
                className={cn(
                  "font-mono caption uppercase",
                  isEngineActive ? "text-foreground" : "text-neutral",
                )}
                variants={enginePulseVariants}
                animate={isEngineActive ? "pulse" : "idle"}
              >
                {isEngineActive ? "RUNNING" : "STABLE"}
              </m.span>
            </div>
          </div>

          <div className="col-span-5 grid h-full grid-cols-2 gap-2">
            <Badge
              variant="default"
              className="flex h-5 w-full items-center justify-center px-2 font-mono caption"
            >
              0xLEO
            </Badge>
            <Badge
              variant="outline"
              className="flex h-5 w-full items-center justify-center px-2 font-mono caption"
            >
              MLOPS
            </Badge>
            <Badge
              variant="secondary"
              className="flex h-5 w-full items-center justify-center px-2 font-mono caption"
            >
              STABLE
            </Badge>
            <Badge
              variant="destructive"
              className="flex h-5 w-full items-center justify-center px-2 font-mono caption"
            >
              ERR_0
            </Badge>
          </div>
        </div>
      </div>

      <Card
        variant="square"
        className="group/card relative w-full border border-foreground/10 p-4"
      >
        <div className="space-y-3">
          <div className="flex items-end justify-between font-mono text-xs text-neutral uppercase">
            <div>
              <span className="mr-2 inline-block size-2 -translate-y-px animate-pulse bg-foreground align-middle" />
              <span className="text-foreground">System Initialization</span>
            </div>
            <div className="font-mono font-normal text-foreground">
              {Math.round(progress).toString().padStart(3, "0")}%
            </div>
          </div>

          <div className="relative h-px w-full overflow-hidden bg-foreground/10">
            <div
              className="absolute inset-y-0 left-0 bg-foreground transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid w-full grid-cols-4 gap-3 pt-0.5 font-mono caption uppercase">
            <div className="space-y-1">
              <div className="caption text-neutral">SYSTEM_STATUS</div>
              <div>
                <span className="text-neutral">CORE_LOAD:</span>{" "}
                <span className="text-foreground">{coreLoad}%</span>
              </div>
              <div>
                <span className="text-neutral">MEM_ALLOC:</span>{" "}
                <span className="text-foreground">OK</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="caption text-neutral">NETWORK_BRIDGE</div>
              <div>
                <span className="text-neutral">UDP_LAT:</span>{" "}
                <span className="text-foreground">
                  {PRELOADER_CONSTANTS.UDP_LATENCY}
                </span>
              </div>
              <div>
                <span className="text-neutral">TCP_SYNC:</span>{" "}
                <span className="text-foreground">ACTIVE</span>
              </div>
            </div>
            <div className="block space-y-1">
              <div className="caption text-neutral">GEO_LOC</div>
              <div>
                <span className="text-neutral">LAT:</span>{" "}
                <span className="text-foreground">
                  {PRELOADER_CONSTANTS.GEO_LATITUDE}
                </span>
              </div>
              <div>
                <span className="text-neutral">LON:</span>{" "}
                <span className="text-foreground">
                  {PRELOADER_CONSTANTS.GEO_LONGITUDE}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="caption text-neutral">LICENSE</div>
              <div>
                <span className="text-neutral">OS:</span>{" "}
                <span className="text-foreground">
                  {PRELOADER_CONSTANTS.OS_NAME}
                </span>
              </div>
              <div>
                <span className="text-neutral">BUILD:</span>{" "}
                <span className="text-foreground">
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
            className="group/card relative w-full border border-foreground/10 p-4"
          >
            <div className="absolute top-0 right-0 p-3 font-mono caption text-neutral">
              CLIENT_ENV
            </div>
            <div className="space-y-3">
              <div>
                <span className="mr-3 inline-block size-2.5 translate-y-px bg-neutral-dark align-middle" />
                <span className="font-mono caption text-neutral uppercase">
                  Hardware Specs
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono caption">
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">OS</span>
                  <span className="text-foreground">
                    {sysInfo?.os || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">CORES</span>
                  <span className="text-foreground">
                    {sysInfo?.cores || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">GPU_UNIT</span>
                  <span className="text-foreground">
                    {sysInfo?.gpu || "---"}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-neutral">VIEWPORT</span>
                  <span className="text-foreground">
                    {sysInfo?.res || "---"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            variant="square"
            className="group/card relative w-full border border-foreground/10 p-4"
          >
            <div className="absolute top-0 right-0 p-3 font-mono caption text-neutral">
              LOCAL_METRICS
            </div>
            <div className="space-y-3">
              <div>
                <span className="mr-3 inline-block size-2.5 translate-y-px animate-pulse bg-foreground align-middle" />
                <span className="font-mono caption text-foreground uppercase">
                  Session Data
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1 font-mono caption">
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">IPV4_ADDR</span>
                  <span className="text-foreground">
                    {sysInfo?.ip || "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">LANGUAGE</span>
                  <span className="text-foreground">
                    {typeof navigator !== "undefined"
                      ? navigator.language
                      : "---"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1">
                  <span className="text-neutral">UPTIME</span>
                  <span className="text-foreground">
                    {formatUptime(uptime)}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-neutral">CONNECTION</span>
                  <span className="text-foreground">SECURE</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
