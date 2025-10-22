// src/components/UI/Countdown.jsx
import { useEffect, useRef, useState } from "react";

const Countdown = ({ endTime }) => {
  // normalize target; null means "no countdown"
  const target =
    typeof endTime === "number"
      ? endTime
      : endTime
      ? new Date(endTime).getTime()
      : null;

  // always create hooks (no conditional early-return before them)
  const [remaining, setRemaining] = useState(() =>
    target ? Math.max(0, target - Date.now()) : 0
  );
  const timerRef = useRef(null);

  useEffect(() => {
    if (!target) return; // do nothing if no endTime

    timerRef.current = setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [target]);

  // if no target, render nothing
  if (!target) return null;
 // if expired, show "EXPIRED"
  if (remaining <= 0) {
    return <div className="de_countdown">"EXPIRED"</div>;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="de_countdown">
      {days > 0 && <span>{pad(days)}d : </span>}
      <span>{pad(hours)}h : </span>
      <span>{pad(minutes)}m : </span>
      <span>{pad(seconds)}s</span>
    </div>
  );
};

export default Countdown;
