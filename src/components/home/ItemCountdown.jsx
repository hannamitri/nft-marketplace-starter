import React, { useEffect, useState } from "react";

const validExpiry = (value) => typeof value === "number" &&
  Number.isFinite(value) && !Number.isNaN(new Date(value).getTime());

export const formatTimeRemaining = (expiryDate, now) => {
  const seconds = Math.max(0, Math.ceil((expiryDate - now) / 1000));
  if (seconds === 0) return "Expired";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds % 60}s`;
};

const ItemCountdown = ({ expiryDate, className = "de_countdown" }) => {
  const [now, setNow] = useState(Date.now);
  const valid = validExpiry(expiryDate);

  useEffect(() => {
    if (!valid) return;
    setNow(Date.now());
    if (expiryDate <= Date.now()) return;
    // Recalculate against the absolute deadline after background-tab throttling.
    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= expiryDate) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [expiryDate, valid]);

  if (!valid) return null;
  return (
    <span className={className} role="timer" aria-live="off"
      aria-label={`Time remaining: ${formatTimeRemaining(expiryDate, now)}`}>
      {formatTimeRemaining(expiryDate, now)}
    </span>
  );
};

export default ItemCountdown;
