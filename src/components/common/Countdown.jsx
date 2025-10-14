import React, { useEffect, useState } from "react";

function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600); // total hours (can be >= 24)
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export default function Countdown({ end }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!end) {
      setRemaining(0);
      return;
    }

    const update = () => setRemaining(end - Date.now());
    update();

    const id = setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) {
        setRemaining(0);
        clearInterval(id);
      } else {
        setRemaining(left);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [end]);

  if (!end) return null; 
  if (remaining <= 0) return <div className="de_countdown">Ended</div>;

  return <div className="de_countdown">{formatRemaining(remaining)}</div>;
}