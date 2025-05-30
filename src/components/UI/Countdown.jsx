import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  // const timeLeft = elem.expiryDate
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      const remainingTime = new Date(expiryDate).getTime() - Date.now();
      if (remainingTime <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    });

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
