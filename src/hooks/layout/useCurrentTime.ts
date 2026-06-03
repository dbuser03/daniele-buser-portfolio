"use client";

import { useState, useEffect } from "react";

export const useCurrentTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? "PM" : "AM";

      const formattedHour = hour12.toString();
      const formattedMinutes = minutes.toString().padStart(2, "0");

      setTime(`${formattedHour}:${formattedMinutes} ${ampm}`);
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return time;
};
