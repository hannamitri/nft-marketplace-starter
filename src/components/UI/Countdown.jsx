import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const secondsLeft = Math.max(
    0,
    Math.floor(((expiryDate === null ? 0 : expiryDate) - Date.now()) / 1000)
  );
  const [left, setLeft] = useState(secondsLeft);

  const hours = Math.floor(left / 3600);
  const mins = Math.floor((left % 3600) / 60);
  const secs = left % 60;

  useEffect(() => {
    if (expiryDate === null) return;
    setLeft(Math.max(0, Math.floor((expiryDate - Date.now()) / 1000)));
    const timer = setInterval(() => {
      const next = Math.max(0, Math.floor((expiryDate - Date.now()) / 1000));
      setLeft(next);
      if (next === 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return expiryDate === null ? null : left === 0 ? (
    <span>EXPIRED</span>
  ) : (
    <span>
      {hours}h {mins}m {secs}s
    </span>
  );
};

export default Countdown;
