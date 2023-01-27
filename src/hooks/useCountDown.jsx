import { useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function useTimer(deadline, interval = SECOND) {
  const [timespan, setTimespan] = useState(deadline - Date.now());
  const [expired, setExpired] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!deadline) return;
    if (timespan <= 0) {
      setExpired(true);
      clearInterval(intervalId);
    }
  }, [timespan, intervalId, deadline]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimespan(new Date(deadline) - Date.now());
    }, interval);
    setIntervalId(id);
    return () => {
      clearInterval(id);
    };
  }, [deadline, interval]);

  return {
    expired: expired,
    hours: Math.floor((timespan / HOUR) % 24),
    minutes: Math.floor((timespan / MINUTE) % 60),
    seconds: Math.floor((timespan / SECOND) % 60),
  };
}
