import React, { useEffect, useState } from "react";

export const formatCountdown = (expiryDate, now) => {
  if (expiryDate == null) return null;

  const expiry = Number(expiryDate);
  if (!Number.isFinite(expiry)) return null;

  const secondsLeft = Math.max(0, Math.ceil((expiry - now) / 1000));
  if (secondsLeft === 0) return "Expired";

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return `${days ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (expiryDate == null) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [expiryDate]);

  const value = formatCountdown(expiryDate, now);
  if (!value) return null;

  return <div className="de_countdown" title="Time remaining">{value}</div>;
};

export default Countdown;
