import { useState, useEffect } from "react";

/**
 * Countdown component
 *
 * Props:
 *  - expiryDate {number} – Unix ms timestamp marking when the countdown ends
 *
 * Renders a "HHh MMm SSs" countdown inside `.de_countdown`.
 * Returns null (renders nothing) once the timer expires.
 */
const Countdown = ({ expiryDate }) => {
  const calcTimeLeft = () => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;