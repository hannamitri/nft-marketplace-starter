import React, { useState, useEffect, memo } from "react";

const CountdownTimer = memo(({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = (expiryDate, currentDate) => {
    const diff = new Date(expiryDate) - new Date(currentDate);
    if (!expiryDate) return null;
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ];
  };

  const countdown = getCountdown(expiryDate, now);
  if (!countdown) return null;

  return countdown === "Expired" ? (
    <div className="de_countdown">Expired</div>
  ) : (
    <div className="de_countdown">
      {countdown[0]}h {countdown[1]}m {countdown[2]}s
    </div>
  );
});

export default CountdownTimer;
