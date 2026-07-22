import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    expiryDate ? Math.max(0, expiryDate - Date.now()) : 0,
  );

  useEffect(() => {
    if (!expiryDate) {
      setTimeRemaining(0);
      return;
    }

    const updateCountdown = () => {
      setTimeRemaining(Math.max(0, expiryDate - Date.now()));
    };

    updateCountdown();

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  const totalSeconds = Math.floor(timeRemaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (!expiryDate || timeRemaining <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const formattedTime = [
    days > 0 ? `${days}d` : null,
    `${hours}h`,
    `${minutes}m`,
    `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className="de_countdown">{formattedTime}</div>;
};

export default Countdown;
