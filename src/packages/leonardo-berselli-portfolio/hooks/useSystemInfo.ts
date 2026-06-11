import { useState, useEffect } from "react";

export interface SysInfo {
  cores: number | string;
  gpu: string;
  os: string;
  network: string;
  res: string;
  ip: string;
}

export function useSystemInfo() {
  const [sysInfo, setSysInfo] = useState<SysInfo | null>(null);

  useEffect(() => {
    const nav = navigator as unknown as {
      connection?: { effectiveType?: string };
    };

    const ua = navigator.userAgent;
    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    if (ua.includes("Mac")) os = "MacOS";
    if (ua.includes("X11")) os = "UNIX";
    if (ua.includes("Linux")) os = "Linux";

    let gpu = "N/A";
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension(
          "WEBGL_debug_renderer_info",
        );
        if (debugInfo) {
          gpu = (gl as WebGLRenderingContext).getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL,
          );
          gpu = gpu
            .replace(/ANGLE \((.*)\)/, "$1")
            .split(",")[0]
            .trim();
          if (gpu.length > 25) gpu = gpu.substring(0, 22) + "...";
        }
      }
    } catch {
      gpu = "N/A";
    }

    setTimeout(() => {
      setSysInfo({
        cores: navigator.hardwareConcurrency || "N/A",
        gpu,
        os,
        network: nav.connection
          ? `${nav.connection.effectiveType || "active"}`
          : "N/A",
        res: `${window.innerWidth}x${window.innerHeight}`,
        ip: "---",
      });
    }, 0);

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setSysInfo((prev) => (prev ? { ...prev, ip: data.ip } : null));
      })
      .catch(() => {
        setSysInfo((prev) => (prev ? { ...prev, ip: "ERR_FETCH" } : null));
      });
  }, []);

  return sysInfo;
}
