import { useEffect, useState } from "react";

function readMountainTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type)?.value || 0);
  return { hours: get("hour"), minutes: get("minute"), seconds: get("second") };
}

/** Current time in America/Denver (Mountain Time, DST-aware), refreshed every second. */
export function useMountainTime() {
  const [time, setTime] = useState(readMountainTime);
  useEffect(() => {
    const id = setInterval(() => setTime(readMountainTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Degrees clockwise from 12 o'clock for each hand, from a { hours, minutes, seconds } reading. */
export function clockHandAngles({ hours, minutes, seconds }) {
  const hour12 = hours % 12;
  return {
    hourAngle: (hour12 + minutes / 60) * 30,
    minuteAngle: (minutes + seconds / 60) * 6,
    secondAngle: seconds * 6,
  };
}
