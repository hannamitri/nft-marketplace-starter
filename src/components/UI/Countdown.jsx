import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      
      // If the auction has already passed, return null to hide it
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Run instantly on mount, then interval ticks every 1 second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // If there's no active remaining time, don't render the wrapper block at all
  if (!timeLeft) return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;