"use client";

import { memo } from "react";
import { useCurrentTime } from "@/hooks/useCurrentTime";

const TimeDisplay = memo(() => {
  const time = useCurrentTime();
  return <span>{time}</span>;
});

TimeDisplay.displayName = "TimeDisplay";

export default TimeDisplay;
