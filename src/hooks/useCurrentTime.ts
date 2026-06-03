"use client";

import { useState, useEffect } from "react";
import { formatTime } from "@/utils/date";

export const useCurrentTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => setTime(formatTime(new Date()));

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return time;
};
