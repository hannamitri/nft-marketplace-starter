import React, { useState, useEffect } from "react";

const getCountdown = (expiryDate, now) => {
  if (!expiryDate) return null;
  const diff = new Date(expiryDate) - new Date(now);
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ];
};

const CountdownTimer = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = getCountdown(expiryDate, now);

  if (!countdown) return null;

  return (
    <>
      {countdown[0]}h {countdown[1]}m {countdown[2]}s
    </>
  );
};

export default CountdownTimer;
